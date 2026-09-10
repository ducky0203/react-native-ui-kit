/**
 * Rolling average of measured sizes, kept per item type.
 *
 * An item that has never been rendered still needs a size so the list can lay
 * out a scrollbar and decide what to mount; the average of the items of that
 * type already measured is a much better guess than a fixed number, and it
 * sharpens as the user scrolls. Older samples fade out, so a list whose rows
 * grow (images loading in) follows along instead of averaging over its history.
 */
export class SizeEstimator {
  private readonly windowSize: number;
  private readonly fallback: number;
  private averages = new Map<string, number>();
  private counts = new Map<string, number>();

  constructor(fallback: number, windowSize = 5) {
    this.fallback = fallback;
    this.windowSize = windowSize;
  }

  add(type: string, value: number) {
    if (value <= 0) {
      return;
    }
    const count = Math.min(this.counts.get(type) ?? 0, this.windowSize - 1) + 1;
    const average = this.averages.get(type) ?? value;
    this.counts.set(type, count);
    this.averages.set(type, average + (value - average) / count);
  }

  get(type: string): number {
    return this.averages.get(type) ?? this.fallback;
  }
}
