import { useEffect, useRef, useState, type ComponentRef } from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  View,
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
import { Icon } from './Icon';
import { colors } from '../theme/colors';
import { fontSize } from '../theme/typography';
import { motionDuration } from '../theme/motion';

export type SelectOption<T> = {
  label: string;
  value: T;
  disabled?: boolean;
};

export type SelectProps<T> = {
  options: SelectOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  invalid?: boolean;
  helperText?: string;
  errorText?: string;
  /** Maximum height of the dropdown list. */
  maxDropdownHeight?: number;
};

type Anchor = { x: number; y: number; width: number; height: number };

export function Select<T>({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  label,
  disabled = false,
  invalid = false,
  helperText,
  errorText,
  maxDropdownHeight = 260,
}: SelectProps<T>) {
  const triggerRef = useRef<ComponentRef<typeof View>>(null);
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<Anchor | null>(null);

  const selected = options.find((option) => option.value === value);
  const message = invalid ? errorText : helperText;

  const caretRotation = useDerivedValue(() =>
    withTiming(open ? 180 : 0, {
      duration: motionDuration.micro,
      easing: Easing.out(Easing.cubic),
    })
  );
  const caretStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${caretRotation.value}deg` }],
  }));

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

  const openDropdown = () => {
    if (disabled) {
      return;
    }
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setAnchor({ x, y, width, height });
      setOpen(true);
    });
  };

  const close = () => setOpen(false);

  const handleSelect = (option: SelectOption<T>) => {
    if (option.disabled) {
      return;
    }
    onChange?.(option.value);
    close();
  };

  const borderColor = invalid
    ? colors.danger
    : open
      ? colors.primary
      : colors.border;

  // Glue dropdown to trigger edge; flip above when space below is tight.
  const screen = Dimensions.get('window');
  const dropdownGap = 0;
  let dropdownPosition: ViewStyle = {};
  let listHeight = maxDropdownHeight;
  if (anchor) {
    const triggerTop = anchor.y;
    const triggerBottom = anchor.y + anchor.height;
    const spaceBelow = screen.height - triggerBottom;
    const spaceAbove = triggerTop;
    const dropUp = spaceBelow < maxDropdownHeight && spaceAbove > spaceBelow;
    listHeight = Math.min(
      maxDropdownHeight,
      (dropUp ? spaceAbove : spaceBelow) - 8
    );
    dropdownPosition = dropUp
      ? {
          bottom: screen.height - triggerTop + dropdownGap,
          left: anchor.x,
          width: anchor.width,
          maxHeight: listHeight,
        }
      : {
          top: triggerBottom + dropdownGap,
          left: anchor.x,
          width: anchor.width,
          maxHeight: listHeight,
        };
  }

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View ref={triggerRef} collapsable={false}>
        <Pressable
          accessibilityRole="combobox"
          accessibilityLabel={label ?? placeholder}
          accessibilityState={{ expanded: open, disabled }}
          disabled={disabled}
          onPress={openDropdown}
          style={[
            styles.trigger,
            { borderColor },
            disabled ? styles.disabled : null,
          ]}
        >
          <Text
            numberOfLines={1}
            style={[styles.value, selected ? null : styles.placeholder]}
          >
            {selected ? selected.label : placeholder}
          </Text>
          <Animated.View style={caretStyle}>
            <Icon name="chevron-down" size={20} color={colors.textMuted} />
          </Animated.View>
        </Pressable>
      </View>

      {message ? (
        <Text
          accessibilityLiveRegion={invalid ? 'polite' : 'none'}
          style={[styles.message, invalid ? styles.error : styles.helper]}
        >
          {message}
        </Text>
      ) : null}

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={close}
      >
        <Pressable
          accessibilityLabel="Close dropdown"
          style={styles.backdrop}
          onPress={close}
        >
          {anchor ? (
            <Animated.View
              onStartShouldSetResponder={() => true}
              style={[styles.dropdown, dropdownPosition, dropdownAnimStyle]}
            >
              <ScrollView bounces={false} keyboardShouldPersistTaps="handled">
                {options.map((option) => {
                  const isSelected = option.value === value;
                  return (
                    <Pressable
                      key={option.label}
                      accessibilityRole="menuitem"
                      accessibilityState={{
                        selected: isSelected,
                        disabled: option.disabled,
                      }}
                      disabled={option.disabled}
                      onPress={() => handleSelect(option)}
                      style={({ pressed }) => [
                        styles.option,
                        pressed ? styles.optionPressed : null,
                        option.disabled ? styles.disabled : null,
                      ]}
                    >
                      <Text
                        numberOfLines={1}
                        style={[
                          styles.optionLabel,
                          isSelected ? styles.optionLabelSelected : null,
                        ]}
                      >
                        {option.label}
                      </Text>
                      {isSelected ? (
                        <Icon name="check" size={18} color={colors.primary} />
                      ) : null}
                    </Pressable>
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
  container: {
    gap: 6,
  },
  label: {
    fontSize: fontSize.default,
    fontWeight: '600',
    color: colors.text,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    borderWidth: 1.5,
    borderRadius: 3,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: colors.surface,
  },
  value: {
    flex: 1,
    fontSize: fontSize.default,
    color: colors.text,
  },
  placeholder: {
    color: colors.textMuted,
  },
  disabled: {
    opacity: 0.6,
  },
  message: {
    fontSize: fontSize.small,
  },
  helper: {
    color: colors.textMuted,
  },
  error: {
    color: colors.danger,
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
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  optionPressed: {
    backgroundColor: colors.surfaceMuted,
  },
  optionLabel: {
    flex: 1,
    fontSize: fontSize.default,
    color: colors.text,
  },
  optionLabelSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
});
