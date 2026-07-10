import { type IconName } from './Icon';
import { type Severity } from '../theme/colors';
export type AvatarSize = 'normal' | 'large' | 'xlarge';
export type AvatarProps = {
    label?: string;
    icon?: IconName;
    image?: string;
    size?: AvatarSize;
    shape?: 'circle' | 'square';
    severity?: Severity;
    accessibilityLabel?: string;
};
export declare function Avatar({ label, icon, image, size, shape, severity, accessibilityLabel, }: AvatarProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Avatar.d.ts.map