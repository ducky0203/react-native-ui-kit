import { SizeEstimator } from './SizeEstimator';

export type ItemLayout = {
  x: number;
  y: number;
  width: number;
  height: number;
  /** False while the size is still an estimate rather than a measurement. */
  measured: boolean;
};

export type Measurement = {
  index: number;
  width: number;
  height: number;
};

export type LayoutManagerParams = {
  horizontal: boolean;
  /** Size of the viewport the list scrolls inside. */
  windowWidth: number;
  windowHeight: number;
  /** First guess for a type nothing has been measured for yet. */
  estimatedItemSize: number;
  getItemType: (index: number) => string;
};

/** Sizes below a pixel apart are the same size; measurements carry rounding noise. */
const EPSILON = 0.5;

/**
 * Places items one after another along the scroll axis and answers two
 * questions the list asks constantly: how big is the content, and which items
 * fall inside a given window. Sizes start as per-type estimates and are
 * replaced by real measurements as items render.
 */
export class LinearLayoutManager {
  private layouts: ItemLayout[] = [];
  private horizontal: boolean;
  private windowWidth: number;
  private windowHeight: number;
  private getItemType: (index: number) => string;
  private estimator: SizeEstimator;

  constructor(params: LayoutManagerParams) {
    this.horizontal = params.horizontal;
    this.windowWidth = params.windowWidth;
    this.windowHeight = params.windowHeight;
    this.getItemType = params.getItemType;
    this.estimator = new SizeEstimator(params.estimatedItemSize);
  }

  /** Keeps the item-type lookup pointing at the current data/props. */
  setItemTypeResolver(getItemType: (index: number) => string) {
    this.getItemType = getItemType;
  }

  /**
   * Reports a new viewport. Returns true when everything has to be laid out
   * again, i.e. the cross axis changed and items may wrap differently.
   */
  setWindowSize(width: number, height: number, horizontal: boolean): boolean {
    const crossAxisChanged = horizontal
      ? Math.abs(this.windowHeight - height) > EPSILON
      : Math.abs(this.windowWidth - width) > EPSILON;
    const orientationChanged = this.horizontal !== horizontal;

    this.windowWidth = width;
    this.windowHeight = height;
    this.horizontal = horizontal;

    if (crossAxisChanged || orientationChanged) {
      // Rows are as wide as the list, so a width change invalidates every
      // measured height: text rewraps, images resize.
      for (const layout of this.layouts) {
        layout.measured = false;
      }
      this.recomputeFrom(0);
      return true;
    }
    return false;
  }

  /**
   * Grows or shrinks the layout to `count` items. Items appended at the end
   * start from the current estimates.
   */
  setItemCount(count: number) {
    if (count === this.layouts.length) {
      return;
    }
    if (count < this.layouts.length) {
      this.layouts.length = count;
      return;
    }
    const start = this.layouts.length;
    for (let index = start; index < count; index++) {
      this.layouts.push(this.createLayout(index));
    }
    this.recomputeFrom(start);
  }

  /**
   * Drops every measurement, keeping the item count. Used when the data is
   * replaced wholesale and the old sizes no longer describe anything.
   */
  resetMeasurements() {
    for (const layout of this.layouts) {
      layout.measured = false;
    }
    this.recomputeFrom(0);
  }

  /**
   * Feeds real sizes back in. Returns true when any of them moved an item,
   * meaning positions after it have shifted and a re-render is due.
   */
  applyMeasurements(measurements: readonly Measurement[]): boolean {
    let firstChanged = -1;

    for (const { index, width, height } of measurements) {
      const layout = this.layouts[index];
      if (!layout) {
        continue;
      }
      const type = this.getItemType(index);
      const mainSize = this.horizontal ? width : height;
      this.estimator.add(type, mainSize);

      const sizeChanged = this.horizontal
        ? Math.abs(layout.width - width) > EPSILON
        : Math.abs(layout.height - height) > EPSILON;

      if (this.horizontal) {
        layout.width = width;
      } else {
        layout.height = height;
      }
      const becameMeasured = !layout.measured;
      layout.measured = true;

      if (
        (sizeChanged || becameMeasured) &&
        (firstChanged === -1 || index < firstChanged)
      ) {
        firstChanged = index;
      }
    }

    if (firstChanged === -1) {
      return false;
    }
    this.recomputeFrom(firstChanged);
    return true;
  }

  getLayout(index: number): ItemLayout | undefined {
    return this.layouts[index];
  }

  getItemCount(): number {
    return this.layouts.length;
  }

  /** Offset of an item along the scroll axis. */
  getOffsetForIndex(index: number): number {
    const layout =
      this.layouts[Math.max(0, Math.min(index, this.layouts.length - 1))];
    if (!layout) {
      return 0;
    }
    return this.horizontal ? layout.x : layout.y;
  }

  getContentSize(): { width: number; height: number } {
    const last = this.layouts[this.layouts.length - 1];
    if (!last) {
      return { width: 0, height: 0 };
    }
    return this.horizontal
      ? { width: last.x + last.width, height: this.windowHeight }
      : { width: this.windowWidth, height: last.y + last.height };
  }

  /**
   * Indices whose layout overlaps `[start, end]` on the scroll axis, as an
   * inclusive range. Binary search, so a list of 100k items costs the same as
   * one of 100. Returns null when nothing overlaps.
   */
  findRange(
    start: number,
    end: number
  ): { first: number; last: number } | null {
    if (this.layouts.length === 0 || end < start) {
      return null;
    }
    const first = this.findFirstAfter(start);
    if (first === -1) {
      return null;
    }
    const last = this.findLastBefore(end);
    if (last === -1 || last < first) {
      return null;
    }
    return { first, last };
  }

  /** First index whose end is past `offset`. */
  private findFirstAfter(offset: number): number {
    let low = 0;
    let high = this.layouts.length - 1;
    let found = -1;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const layout = this.layouts[mid]!;
      const layoutEnd = this.horizontal
        ? layout.x + layout.width
        : layout.y + layout.height;
      if (layoutEnd > offset) {
        found = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    return found;
  }

  /** Last index whose start is before `offset`. */
  private findLastBefore(offset: number): number {
    let low = 0;
    let high = this.layouts.length - 1;
    let found = -1;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const layout = this.layouts[mid]!;
      const layoutStart = this.horizontal ? layout.x : layout.y;
      if (layoutStart <= offset) {
        found = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    return found;
  }

  /**
   * Re-stacks items from `startIndex` on. Unmeasured items are re-estimated
   * on the way, so a guess made before anything was measured gets replaced by
   * the running average instead of sticking around.
   */
  private recomputeFrom(startIndex: number) {
    for (
      let index = Math.max(0, startIndex);
      index < this.layouts.length;
      index++
    ) {
      const layout = this.layouts[index]!;
      const previous = index > 0 ? this.layouts[index - 1] : undefined;

      if (!layout.measured) {
        const estimate = this.estimator.get(this.getItemType(index));
        if (this.horizontal) {
          layout.width = estimate;
        } else {
          layout.height = estimate;
        }
      }
      if (this.horizontal) {
        layout.x = previous ? previous.x + previous.width : 0;
        layout.y = 0;
        layout.height = this.windowHeight;
      } else {
        layout.x = 0;
        layout.y = previous ? previous.y + previous.height : 0;
        layout.width = this.windowWidth;
      }
    }
  }

  private createLayout(index: number): ItemLayout {
    const estimate = this.estimator.get(this.getItemType(index));
    return {
      x: 0,
      y: 0,
      width: this.horizontal ? estimate : this.windowWidth,
      height: this.horizontal ? this.windowHeight : estimate,
      measured: false,
    };
  }
}
