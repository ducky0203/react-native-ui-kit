"use strict";

import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { jsx as _jsx } from "react/jsx-runtime";
export function Screen({
  children,
  style,
  edges = ['top', 'right', 'bottom', 'left'],
  backgroundColor = '#ffffff'
}) {
  return /*#__PURE__*/_jsx(SafeAreaView, {
    style: [styles.container, {
      backgroundColor
    }, style],
    edges: edges,
    children: children
  });
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
//# sourceMappingURL=Screen.js.map