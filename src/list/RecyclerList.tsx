import { createElement } from 'react';
import { getListBackend } from './backend';
import { RecyclerListEngine } from './RecyclerListEngine';
import type { RecyclerListCoreProps } from './types';

/**
 * A recycling list: rows are reused as they scroll instead of being unmounted
 * and remounted, the way FlashList (and Android's RecyclerView) does it.
 *
 * Runs on the kit's own engine by default. Register FlashList through
 * `configureListBackend` and this component becomes a thin adapter over it,
 * with the same props — so app code never changes, whether or not the extra
 * dependency is installed.
 */
export function RecyclerListCore<ItemT>(props: RecyclerListCoreProps<ItemT>) {
  const Backend = getListBackend();
  if (!Backend) {
    return <RecyclerListEngine<ItemT> {...props} />;
  }
  // FlashList v2 measures rows itself, so the estimate is dropped rather than
  // passed on (v2 warns about it); every other prop is named after FlashList's
  // already and goes straight through.
  const backendProps: Record<string, unknown> = { ...props };
  delete backendProps.estimatedItemSize;
  return createElement(Backend, backendProps);
}
