import type { ListBackend } from './types';

let backend: ListBackend | null = null;

/**
 * Plugs an external list implementation in behind `RecyclerList`.
 *
 * The kit ships its own recycling engine so nothing extra is required, but an
 * app that already depends on `@shopify/flash-list` gets a more battle-tested
 * one (sticky headers, masonry, grids, RTL) for free — register it once at
 * startup and every `RecyclerList` in the app switches over:
 *
 * ```ts
 * import { FlashList } from '@shopify/flash-list';
 * import { configureListBackend } from '@ducky0203/react-native-ui-kit';
 *
 * configureListBackend(FlashList);
 * ```
 *
 * Registration is explicit rather than auto-detected on purpose: Metro
 * resolves imports statically, so a `require('@shopify/flash-list')` inside
 * the kit would break bundling for every app that does *not* have it
 * installed. Pass `null` to go back to the built-in engine.
 */
export function configureListBackend(component: ListBackend | null) {
  backend = component;
}

export function getListBackend(): ListBackend | null {
  return backend;
}
