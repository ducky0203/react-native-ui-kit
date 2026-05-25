import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { Typography } from './Typography';
import { colors } from '../theme/colors';

export type CardProps = {
  title?: string;
  subTitle?: string;
  header?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function Card({
  title,
  subTitle,
  header,
  footer,
  children,
  style,
}: CardProps) {
  return (
    <View style={[styles.card, style]}>
      {header ? <View style={styles.header}>{header}</View> : null}
      {title ? <Typography variant="h3">{title}</Typography> : null}
      {subTitle ? (
        <Typography variant="bodySmall" color={colors.textMuted}>
          {subTitle}
        </Typography>
      ) : null}
      {children ? <View style={styles.body}>{children}</View> : null}
      {footer ? <View style={styles.footer}>{footer}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 4,
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  header: {
    marginBottom: 8,
  },
  body: {
    marginTop: 8,
  },
  footer: {
    marginTop: 12,
  },
});
