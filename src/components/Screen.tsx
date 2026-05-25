import type { ReactNode } from 'react';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

export type ScreenProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  edges?: ReadonlyArray<Edge>;
  backgroundColor?: string;
};

export function Screen({
  children,
  style,
  edges = ['top', 'right', 'bottom', 'left'],
  backgroundColor = '#ffffff',
}: ScreenProps) {
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor }, style]}
      edges={edges}
    >
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
