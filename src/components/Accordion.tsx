import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Animated,
  Easing,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  UIManager,
  View,
} from 'react-native';
import { Icon, type IconName } from './Icon';
import { Typography } from './Typography';
import { colors } from '../theme/colors';
import { motionDuration } from '../theme/motion';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const LAYOUT_ANIMATION = LayoutAnimation.create(
  motionDuration.layout,
  LayoutAnimation.Types.easeInEaseOut,
  LayoutAnimation.Properties.opacity
);

export type AccordionItem = {
  title: string;
  content: ReactNode;
  icon?: IconName;
};

export type AccordionProps = {
  items: AccordionItem[];
  /** Allow multiple sections open at once. */
  multiple?: boolean;
  defaultActiveIndices?: number[];
};

function Chevron({ open }: { open: boolean }) {
  const rotation = useRef(new Animated.Value(open ? 1 : 0)).current;
  useEffect(() => {
    Animated.timing(rotation, {
      toValue: open ? 1 : 0,
      duration: motionDuration.standard,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [open, rotation]);
  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      <Icon name="chevron-down" size={20} color={colors.textMuted} />
    </Animated.View>
  );
}

export function Accordion({
  items,
  multiple = false,
  defaultActiveIndices = [],
}: AccordionProps) {
  const [active, setActive] = useState<number[]>(defaultActiveIndices);

  const toggle = (index: number) => {
    LayoutAnimation.configureNext(LAYOUT_ANIMATION);
    setActive((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      }
      return multiple ? [...prev, index] : [index];
    });
  };

  return (
    <View style={styles.container}>
      {items.map((item, index) => {
        const isOpen = active.includes(index);
        return (
          <View
            key={item.title}
            style={[styles.item, index > 0 ? styles.itemBordered : null]}
          >
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={item.title}
              accessibilityState={{ expanded: isOpen }}
              onPress={() => toggle(index)}
              style={({ pressed }) => [
                styles.header,
                pressed ? styles.pressed : null,
              ]}
            >
              {item.icon ? (
                <Icon name={item.icon} size={18} color={colors.primary} />
              ) : null}
              <Typography variant="label" style={styles.title}>
                {item.title}
              </Typography>
              <Chevron open={isOpen} />
            </Pressable>
            {isOpen ? <View style={styles.body}>{item.content}</View> : null}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 3,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  item: {
    overflow: 'hidden',
  },
  itemBordered: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  pressed: {
    backgroundColor: colors.surfaceMuted,
  },
  title: {
    flex: 1,
  },
  body: {
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
});
