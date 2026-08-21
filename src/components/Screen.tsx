import type { ReactNode } from 'react';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

export type ScreenProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  edges?: ReadonlyArray<Edge>;
  backgroundColor?: string;
};

export function Screen({
  children,
  style,
  edges = [],
  backgroundColor = colors.background,
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
