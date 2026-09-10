import { useMemo, useRef, useState } from 'react';

/**
 * `useState` for a row inside a recycling list.
 *
 * A recycled row keeps its React state: the view that showed item #3 expanded
 * would show item #40 expanded too. Pass the values that identify the item
 * (its id, usually) as `deps` and the state resets the moment the view is
 * handed to another item — during render, so the row never paints with the
 * previous item's state.
 *
 * ```tsx
 * const [expanded, setExpanded] = useRecyclingState(false, [item.id]);
 * ```
 */
export function useRecyclingState<T>(
  initialState: T | (() => T),
  deps: React.DependencyList,
  onReset?: () => void
): [T, (value: T | ((previous: T) => T)) => void] {
  const store = useRef<T>(undefined as T);
  const [, forceRender] = useState(0);

  // useMemo, not useEffect: the reset has to happen while rendering, before
  // this row is painted with the state left over from the previous item.
  useMemo(() => {
    store.current =
      typeof initialState === 'function'
        ? (initialState as () => T)()
        : initialState;
    onReset?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const setState = useRef((value: T | ((previous: T) => T)) => {
    const next =
      typeof value === 'function'
        ? (value as (previous: T) => T)(store.current)
        : value;
    if (next !== store.current) {
      store.current = next;
      forceRender((count) => count + 1);
    }
  }).current;

  return [store.current, setState];
}
