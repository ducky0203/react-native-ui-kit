import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type ComponentRef,
  type ReactNode,
} from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Pressable, ScrollView } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Icon, type IconName } from './Icon';
import { colors, severityColors, type Severity } from '../theme/colors';
import { motionDuration } from '../theme/motion';
import { fontSize } from '../theme/typography';

export type MenuItem = {
  label: string;
  icon?: IconName;
  disabled?: boolean;
  /** Render the item with a destructive (danger) tone. */
  severity?: Severity;
  onPress?: () => void;
};

export type MenuAlign = 'start' | 'end';

export type MenuTriggerState = {
  open: boolean;
  toggle: () => void;
};

export type MenuProps = {
  items: MenuItem[];
  /** Label shown on the default trigger button. */
  triggerLabel?: string;
  /** Icon shown on the default trigger button. */
  triggerIcon?: IconName;
  /** Render a custom trigger instead of the default button. */
  renderTrigger?: (state: MenuTriggerState) => ReactNode;
  disabled?: boolean;
  /** Horizontal alignment of the dropdown relative to the tap point. */
  align?: MenuAlign;
  /** Dropdown width. Defaults to 200. */
  width?: number;
  /** Maximum dropdown height before scrolling. */
  maxHeight?: number;
  style?: StyleProp<ViewStyle>;
};

type Anchor = { x: number; y: number; width: number; height: number };

export function Menu({
  items,
  triggerLabel = 'Menu',
  triggerIcon = 'more-vertical',
  renderTrigger,
  disabled = false,
  align = 'start',
  width = 200,
  maxHeight = 280,
  style,
}: MenuProps) {
  const triggerRef = useRef<ComponentRef<typeof View>>(null);
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<Anchor | null>(null);

  const caretRotation = useDerivedValue(() =>
    withTiming(open ? 180 : 0, {
      duration: motionDuration.micro,
      easing: Easing.out(Easing.cubic),
    })
  );
  const caretStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${caretRotation.value}deg` }],
  }));

  // Subtle scale + fade for the dropdown surface (modal handles backdrop fade).
  const dropdownProgress = useSharedValue(0);
  useEffect(() => {
    if (open && anchor) {
      dropdownProgress.value = 0;
      dropdownProgress.value = withTiming(1, {
        duration: motionDuration.micro,
        easing: Easing.out(Easing.cubic),
      });
    }
  }, [open, anchor, dropdownProgress]);
  const dropdownAnimStyle = useAnimatedStyle(() => ({
    opacity: dropdownProgress.value,
  }));

  const openMenu = () => {
    if (disabled) {
      return;
    }
    triggerRef.current?.measureInWindow((x, y, w, h) => {
      setAnchor({ x, y, width: w, height: h });
      setOpen(true);
    });
  };

  const close = () => setOpen(false);
  const toggle = () => (open ? close() : openMenu());

  const handlePress = (item: MenuItem) => {
    if (item.disabled) {
      return;
    }
    close();
    item.onPress?.();
  };

  const screen = Dimensions.get('window');
  const dropdownWidth = width;
  const dropdownGap = 0;

  let dropdownPosition: ViewStyle = {};
  let listHeight = maxHeight;
  if (anchor) {
    const triggerTop = anchor.y;
    const triggerBottom = anchor.y + anchor.height;
    const spaceBelow = screen.height - triggerBottom;
    const spaceAbove = triggerTop;
    const dropUp = spaceBelow < maxHeight && spaceAbove > spaceBelow;
    listHeight = Math.min(maxHeight, (dropUp ? spaceAbove : spaceBelow) - 8);
    const rawLeft =
      align === 'end' ? anchor.x + anchor.width - dropdownWidth : anchor.x;
    const left = Math.max(
      8,
      Math.min(rawLeft, screen.width - dropdownWidth - 8)
    );
    dropdownPosition = dropUp
      ? {
          bottom: screen.height - triggerTop + dropdownGap,
          left,
          width: dropdownWidth,
          maxHeight: listHeight,
        }
      : {
          top: triggerBottom + dropdownGap,
          left,
          width: dropdownWidth,
          maxHeight: listHeight,
        };
  }

  return (
    <View ref={triggerRef} collapsable={false} style={style}>
      {renderTrigger ? (
        renderTrigger({ open, toggle })
      ) : (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={triggerLabel}
          accessibilityState={{ expanded: open, disabled }}
          disabled={disabled}
          onPress={toggle}
          style={({ pressed }) => [
            styles.trigger,
            pressed && !disabled ? styles.triggerPressed : null,
            disabled ? styles.disabled : null,
          ]}
        >
          {triggerIcon ? (
            <Icon name={triggerIcon} size={18} color={colors.text} />
          ) : null}
          {triggerLabel ? (
            <Text style={styles.triggerLabel}>{triggerLabel}</Text>
          ) : null}
          <Animated.View style={caretStyle}>
            <Icon name="chevron-down" size={18} color={colors.textMuted} />
          </Animated.View>
        </Pressable>
      )}

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={close}
      >
        <Pressable
          accessibilityLabel="Close menu"
          style={styles.backdrop}
          onPress={close}
        >
          {anchor ? (
            <Animated.View
              accessibilityRole="menu"
              onStartShouldSetResponder={() => true}
              style={[styles.dropdown, dropdownPosition, dropdownAnimStyle]}
            >
              <ScrollView bounces={false} keyboardShouldPersistTaps="handled">
                {items.map((item, index) => {
                  const tone = item.severity
                    ? severityColors[item.severity]
                    : colors.text;
                  return (
                    <Fragment key={item.label}>
                      {index > 0 ? <View style={styles.separator} /> : null}
                      <Pressable
                        accessibilityRole="menuitem"
                        accessibilityLabel={item.label}
                        accessibilityState={{ disabled: item.disabled }}
                        disabled={item.disabled}
                        onPress={() => handlePress(item)}
                        style={({ pressed }) => [
                          styles.item,
                          pressed ? styles.itemPressed : null,
                          item.disabled ? styles.disabled : null,
                        ]}
                      >
                        {item.icon ? (
                          <Icon name={item.icon} size={18} color={tone} />
                        ) : null}
                        <Text style={[styles.itemLabel, { color: tone }]}>
                          {item.label}
                        </Text>
                      </Pressable>
                    </Fragment>
                  );
                })}
              </ScrollView>
            </Animated.View>
          ) : null}
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  triggerPressed: {
    backgroundColor: colors.surfaceMuted,
  },
  triggerLabel: {
    fontSize: fontSize.default,
    fontWeight: '600',
    color: colors.text,
  },
  disabled: {
    opacity: 0.5,
  },
  backdrop: {
    flex: 1,
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: colors.surface,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  itemPressed: {
    backgroundColor: colors.surfaceMuted,
  },
  itemLabel: {
    flex: 1,
    fontSize: fontSize.default,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
});
