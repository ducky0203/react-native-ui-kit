import type { ComponentProps } from 'react';
import { Feather as FeatherIcon } from '@react-native-vector-icons/feather/static';

export type IconName = ComponentProps<typeof FeatherIcon>['name'];

export type IconProps = ComponentProps<typeof FeatherIcon>;

export function Icon({ size = 24, color = '#000000', ...rest }: IconProps) {
  return <FeatherIcon size={size} color={color} {...rest} />;
}
