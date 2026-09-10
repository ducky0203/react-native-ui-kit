import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { EmptyState } from './EmptyState';
import type { IconName } from './Icon';
import { Typography } from './Typography';
import { colors } from '../theme/colors';

/**
 * The props every list in the kit shares on top of its native ones: pull to
 * refresh, load-more, and what to show when the list is empty or finished.
 */
export type ListChromeProps = {
  /** Shows a spinner in the list footer (initial load and load-more). */
  loading?: boolean;
  /**
   * Called on pull-to-refresh; omit to disable refresh. Return a promise and
   * the spinner stays up until it settles. If you only flip `loading`, the
   * spinner follows that instead.
   */
  onRefresh?: () => void | Promise<unknown>;
  /** Whether another page can still be loaded; must be `true` for `onLoadMore` to fire. */
  canLoadMore?: boolean;
  /** Called when the list nears its end; omit to disable load-more. */
  onLoadMore?: () => void;
  /** Title shown by the default empty state. */
  emptyText?: string;
  /** Icon shown by the default empty state. */
  emptyIcon?: IconName;
  /** Custom element replacing the default empty state. */
  emptyComponent?: ReactElement;
  /**
   * Element rendered under the last item, above the bottom spacer. The spacer
   * keeps the last items off the screen bottom when scrolled to the end.
   */
  footerComponent?: ReactElement;
  /** Message shown in the footer once there is nothing left to load. */
  endText?: string;
  /**
   * Show `endText` in the footer when the list has data, is not loading, and
   * `canLoadMore` is false. Off by default — pass true to opt in.
   */
  showEndMessage?: boolean;
};

function isThenable(value: unknown): value is PromiseLike<unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as PromiseLike<unknown>).then === 'function'
  );
}

/**
 * Builds the shared refresh control, empty state and footer, memoised so a
 * re-render of the list doesn't hand the virtualizer new elements and make it
 * rebuild cells it already has.
 */
export function useListChrome({
  loading = false,
  onRefresh,
  canLoadMore = false,
  onLoadMore,
  emptyText = 'No data',
  emptyIcon = 'inbox',
  emptyComponent,
  footerComponent,
  endText = 'No more items',
  showEndMessage = false,
  hasData,
}: ListChromeProps & { hasData: boolean }) {
  const [pulling, setPulling] = useState(false);
  const pullSawLoading = useRef(false);
  const releaseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (releaseTimer.current != null) {
        clearTimeout(releaseTimer.current);
      }
    };
  }, []);

  // Parent-driven `loading`: keep the pull spinner up until the request that
  // started after the gesture has actually finished.
  useEffect(() => {
    if (!pulling) {
      pullSawLoading.current = false;
      return;
    }
    if (loading) {
      pullSawLoading.current = true;
      return;
    }
    if (pullSawLoading.current) {
      setPulling(false);
    }
  }, [loading, pulling]);

  const atEnd = hasData && !loading && !canLoadMore && showEndMessage;

  const handleEndReached = useCallback(() => {
    if (onLoadMore && canLoadMore && !loading && !pulling && hasData) {
      onLoadMore();
    }
  }, [onLoadMore, canLoadMore, loading, pulling, hasData]);

  const handleRefresh = useCallback(() => {
    if (releaseTimer.current != null) {
      clearTimeout(releaseTimer.current);
      releaseTimer.current = null;
    }
    pullSawLoading.current = false;
    setPulling(true);
    const result = onRefresh?.();
    if (isThenable(result)) {
      Promise.resolve(result).finally(() => {
        pullSawLoading.current = false;
        setPulling(false);
      });
      return;
    }
    // Fire-and-forget (typical Redux `dispatch`): wait a frame for `loading`
    // to flip true. If it never does, drop the spinner so it cannot stick.
    releaseTimer.current = setTimeout(() => {
      releaseTimer.current = null;
      if (!pullSawLoading.current) {
        setPulling(false);
      }
    }, 64);
  }, [onRefresh]);

  const refreshControl = useMemo(
    () =>
      onRefresh ? (
        <RefreshControl
          refreshing={pulling}
          onRefresh={handleRefresh}
          colors={[colors.primary]}
          tintColor={colors.primary}
        />
      ) : undefined,
    [onRefresh, pulling, handleRefresh]
  );

  // Rendered only while the list is empty, so `loading` here is the very
  // first load: fill the viewport with a centered spinner instead of
  // flashing the empty state.
  const emptyElement = useMemo(
    () =>
      loading ? (
        <View style={styles.loadingFill}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : (
        (emptyComponent ?? <EmptyState icon={emptyIcon} title={emptyText} />)
      ),
    [loading, emptyComponent, emptyIcon, emptyText]
  );

  // Bottom spacer stays as long as the list has items, whatever the footer
  // holds, so the last item never sits against the screen bottom. Pull-to-
  // refresh already shows its own spinner, so skip the footer one then.
  const footerElement = useMemo(
    () =>
      hasData ? (
        <View style={styles.footer}>
          {loading && !pulling ? (
            <ActivityIndicator color={colors.primary} />
          ) : null}
          {atEnd ? (
            <Typography variant="caption" color={colors.textMuted}>
              {endText}
            </Typography>
          ) : null}
          {footerComponent}
        </View>
      ) : undefined,
    [hasData, loading, pulling, atEnd, endText, footerComponent]
  );

  return { refreshControl, emptyElement, footerElement, handleEndReached };
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 50,
    gap: 8,
  },
  loadingFill: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
});
