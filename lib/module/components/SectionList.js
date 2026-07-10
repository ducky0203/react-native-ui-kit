"use strict";

import { ActivityIndicator, RefreshControl, SectionList as RNSectionList, StyleSheet, View } from 'react-native';
import { EmptyState } from "./EmptyState.js";
import { colors } from "../theme/colors.js";
import { jsx as _jsx } from "react/jsx-runtime";
export function SectionList({
  loading = false,
  refreshing = false,
  onRefresh,
  loadingMore = false,
  onLoadMore,
  emptyText = 'No data',
  emptyIcon = 'inbox',
  emptyComponent,
  sections,
  onEndReachedThreshold = 0.4,
  contentContainerStyle,
  ...rest
}) {
  if (loading) {
    return /*#__PURE__*/_jsx(View, {
      style: styles.center,
      children: /*#__PURE__*/_jsx(ActivityIndicator, {
        color: colors.primary
      })
    });
  }
  const hasData = sections.length > 0;
  const handleEndReached = () => {
    if (onLoadMore && !loadingMore && hasData) {
      onLoadMore();
    }
  };
  return /*#__PURE__*/_jsx(RNSectionList, {
    sections: sections,
    contentContainerStyle: [styles.content, contentContainerStyle],
    onEndReached: onLoadMore ? handleEndReached : undefined,
    onEndReachedThreshold: onEndReachedThreshold,
    refreshControl: onRefresh ? /*#__PURE__*/_jsx(RefreshControl, {
      refreshing: refreshing,
      onRefresh: onRefresh,
      colors: [colors.primary],
      tintColor: colors.primary
    }) : undefined,
    ListEmptyComponent: emptyComponent ?? /*#__PURE__*/_jsx(EmptyState, {
      icon: emptyIcon,
      title: emptyText
    }),
    ListFooterComponent: loadingMore ? /*#__PURE__*/_jsx(View, {
      style: styles.footer,
      children: /*#__PURE__*/_jsx(ActivityIndicator, {
        color: colors.primary
      })
    }) : undefined,
    ...rest
  });
}
const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    flexGrow: 1
  },
  footer: {
    paddingVertical: 16
  }
});
//# sourceMappingURL=SectionList.js.map