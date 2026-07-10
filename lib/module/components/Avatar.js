"use strict";

import { Image, StyleSheet, Text, View } from 'react-native';
import { Icon } from "./Icon.js";
import { colors, severityColors } from "../theme/colors.js";
import { getFontStyle } from "../theme/typography.js";
import { jsx as _jsx } from "react/jsx-runtime";
export function Avatar({
  label,
  icon,
  image,
  size = 'normal',
  shape = 'circle',
  severity,
  accessibilityLabel
}) {
  const background = severity ? severityColors[severity] : colors.surfaceMuted;
  const foreground = severity ? colors.textInverse : colors.text;
  const a11yLabel = accessibilityLabel ?? (label ? `Avatar ${label}` : 'Avatar');
  const sizeStyle = sizeStyles[size];
  const shapeStyle = shape === 'circle' ? circleStyles[size] : styles.square;
  if (image) {
    return /*#__PURE__*/_jsx(Image, {
      accessible: true,
      accessibilityRole: "image",
      accessibilityLabel: a11yLabel,
      source: {
        uri: image
      },
      style: [sizeStyle, shapeStyle]
    });
  }
  return /*#__PURE__*/_jsx(View, {
    accessible: true,
    accessibilityRole: "image",
    accessibilityLabel: a11yLabel,
    style: [styles.placeholder, sizeStyle, shapeStyle, {
      backgroundColor: background
    }],
    children: icon ? /*#__PURE__*/_jsx(Icon, {
      name: icon,
      size: iconSizes[size],
      color: foreground
    }) : /*#__PURE__*/_jsx(Text, {
      style: [styles.label, labelStyles[size], {
        color: foreground
      }, getFontStyle()],
      children: label ? label.slice(0, 2).toUpperCase() : ''
    })
  });
}
const styles = StyleSheet.create({
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    fontWeight: '700'
  },
  square: {
    borderRadius: 8
  }
});
const sizeStyles = StyleSheet.create({
  normal: {
    width: 40,
    height: 40
  },
  large: {
    width: 56,
    height: 56
  },
  xlarge: {
    width: 72,
    height: 72
  }
});

// borderRadius = dim / 2 cho circle
const circleStyles = StyleSheet.create({
  normal: {
    borderRadius: 20
  },
  large: {
    borderRadius: 28
  },
  xlarge: {
    borderRadius: 36
  }
});

// fontSize = dim * 0.4
const labelStyles = StyleSheet.create({
  normal: {
    fontSize: 16
  },
  large: {
    fontSize: 22
  },
  xlarge: {
    fontSize: 29
  }
});

// icon size = dim * 0.5
const iconSizes = {
  normal: 20,
  large: 28,
  xlarge: 36
};
//# sourceMappingURL=Avatar.js.map