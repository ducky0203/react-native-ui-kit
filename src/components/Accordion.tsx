import { useState, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { Icon, type IconName } from './Icon';
import { Typography } from './Typography';
import { colors } from '../theme/colors';
import { motionDuration } from '../theme/motion';

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

const ROW_TRANSITION = LinearTransition.duration(motionDuration.layout).easing(
  Easing.out(Easing.cubic)
);

function Chevron({ open }: { open: boolean }) {
  const rotation = useDerivedValue(() =>
    withTiming(open ? 180 : 0, {
      duration: motionDuration.standard,
      easing: Easing.out(Easing.cubic),
    })
  );
  const style = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));
  return (
    <Animated.View style={style}>
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
          <Animated.View
            key={item.title}
            layout={ROW_TRANSITION}
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
            {isOpen ? (
              <Animated.View
                entering={FadeIn.duration(motionDuration.fadeIn)}
                exiting={FadeOut.duration(motionDuration.fadeOut)}
                style={styles.body}
              >
                {item.content}
              </Animated.View>
            ) : null}
          </Animated.View>
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
