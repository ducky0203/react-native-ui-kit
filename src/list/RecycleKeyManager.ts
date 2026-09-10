export type RenderStackEntry = {
  /** React key. Stays with the mounted view and moves from item to item. */
  key: string;
  /** Item type the key was created for; keys never cross types. */
  type: string;
  index: number;
  stableId: string;
};

/**
 * Hands out React keys so that scrolling reuses mounted views instead of
 * unmounting and remounting them — the same idea as Android's RecyclerView,
 * and what makes FlashList cheaper than FlatList.
 *
 * When an item scrolls out of the render window its key goes back to a pool;
 * the next item of the same type that scrolls in gets that key, so React sees
 * the same element in the same position with new props and only updates it.
 * Keys are per type, because reusing a header's view for a row would defeat
 * the point: React would throw the subtree away anyway.
 */
export class RecycleKeyManager {
  private maxPoolSize: number;
  private pools = new Map<string, string[]>();
  private byStableId = new Map<string, RenderStackEntry>();
  private counter = 0;

  constructor(maxPoolSize = 30) {
    this.maxPoolSize = maxPoolSize;
  }

  setMaxPoolSize(size: number) {
    this.maxPoolSize = size;
    this.trimPools();
  }

  /**
   * Assigns a key to every index in `[first, last]` and releases the keys of
   * items that left the window.
   *
   * The result is sorted by key rather than by index: children keep the same
   * order across renders, which is what lets React reuse the mounted view
   * behind each key instead of reordering the tree.
   */
  sync(
    first: number,
    last: number,
    getStableId: (index: number) => string,
    getItemType: (index: number) => string
  ): RenderStackEntry[] {
    const engaged = new Map<string, number>();
    for (let index = first; index <= last; index++) {
      engaged.set(getStableId(index), index);
    }

    // Release anything that is no longer in the window, or whose type changed.
    for (const [stableId, entry] of this.byStableId) {
      const index = engaged.get(stableId);
      if (index === undefined || getItemType(index) !== entry.type) {
        this.release(entry);
        this.byStableId.delete(stableId);
      }
    }

    const stack: RenderStackEntry[] = [];
    for (let index = first; index <= last; index++) {
      const stableId = getStableId(index);
      const type = getItemType(index);
      const existing = this.byStableId.get(stableId);

      if (existing) {
        existing.index = index;
        stack.push(existing);
        continue;
      }
      const entry: RenderStackEntry = {
        key: this.takeKey(type),
        type,
        index,
        stableId,
      };
      this.byStableId.set(stableId, entry);
      stack.push(entry);
    }

    this.trimPools();
    return stack.sort((left, right) => (left.key < right.key ? -1 : 1));
  }

  /** Forgets every key. Used when the data is replaced wholesale. */
  reset() {
    this.pools.clear();
    this.byStableId.clear();
  }

  private takeKey(type: string): string {
    const pool = this.pools.get(type);
    const recycled = pool?.pop();
    if (recycled !== undefined) {
      return recycled;
    }
    this.counter += 1;
    // Zero padded so sorting by key keeps a stable, monotonic child order.
    return `${type}#${String(this.counter).padStart(6, '0')}`;
  }

  private release(entry: RenderStackEntry) {
    const pool = this.pools.get(entry.type);
    if (pool) {
      pool.push(entry.key);
    } else {
      this.pools.set(entry.type, [entry.key]);
    }
  }

  /**
   * Caps how many spare views are kept alive. A list with many item types
   * would otherwise hold on to one pool per type forever.
   */
  private trimPools() {
    let free = 0;
    for (const pool of this.pools.values()) {
      free += pool.length;
    }
    if (free <= this.maxPoolSize) {
      return;
    }
    for (const pool of this.pools.values()) {
      while (free > this.maxPoolSize && pool.length > 0) {
        pool.shift();
        free -= 1;
      }
    }
  }
}
