# react-native-ui-kit

Thư viện component UI cho React Native — nút, form, danh sách, layout, feedback — kèm theme màu, icon Feather và animation qua Reanimated.

## Yêu cầu

- React Native ≥ 0.75 (khuyến nghị 0.85+)
- React 18+
- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/) ≥ 4
- [react-native-safe-area-context](https://github.com/AppAndFlow/react-native-safe-area-context) ≥ 5
- [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/) ≥ 2.24
- [@react-native-vector-icons/feather](https://github.com/oblador/react-native-vector-icons) ≥ 13

## Cài đặt

```sh
yarn add react-native-ui-kit @react-native-vector-icons/feather react-native-gesture-handler react-native-reanimated react-native-safe-area-context
# hoặc
npm install react-native-ui-kit @react-native-vector-icons/feather react-native-gesture-handler react-native-reanimated react-native-safe-area-context
```

Cấu hình Reanimated theo [hướng dẫn chính thức](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/#react-native-community-cli-projects). Với RN 0.85+, thêm plugin Worklets vào `babel.config.js` của app:

```js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ['react-native-worklets/plugin'],
};
```

## Bắt đầu nhanh

Import `react-native-gesture-handler` **đầu tiên** trong entry file (`index.js`), rồi bọc app bằng `GestureHandlerRootView`, `SafeAreaProvider` và `ToastProvider` (nếu dùng toast):

```js
// index.js
import 'react-native-gesture-handler';
```

```tsx
import {
  GestureHandlerRootView,
  SafeAreaProvider,
  ToastProvider,
  Screen,
  Button,
  Typography,
} from 'react-native-ui-kit';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ToastProvider>
        <Screen>
          <Typography variant="h1">Xin chào</Typography>
          <Button label="Nhấn tôi" severity="primary" onPress={() => {}} />
        </Screen>
        </ToastProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
```

## Components

| Nhóm     | Component | Mô tả ngắn |
|----------|-----------|------------|
| Layout   | `Screen` | Màn hình có padding và nền mặc định |
| Layout   | `Panel`, `Divider`, `TabView`, `Accordion` | Khối nội dung, phân cách, tab, thu gọn |
| Actions  | `Button`, `Chip`, `Tag`, `Menu` | Nút, chip, tag, menu dropdown |
| Form     | `InputText`, `Select` | Ô nhập, chọn giá trị |
| Display  | `Typography`, `Card`, `Badge`, `Avatar`, `Icon` | Chữ, thẻ, huy hiệu, avatar, icon Feather |
| Lists    | `FlatList`, `SectionList`, `EmptyState` | Danh sách có refresh/load more, trạng thái trống |
| Feedback | `ProgressBar`, `ProgressCircle`, `ToastProvider` / `useToast` | Tiến trình, toast stack (toast-message-ts + UI kit theme) |

### Button

```tsx
<Button
  label="Lưu"
  icon="save"
  severity="primary"
  size="normal"
  outlined={false}
  loading={false}
  onPress={() => {}}
/>
```

`severity`: `primary` | `secondary` | `success` | `info` | `warning` | `danger`
`size`: `small` | `normal` | `large`

### Toast

Dựa trên [react-native-toast-message-ts](https://github.com/noorjsdivs/react-native-toast-message-ts) (MIT) — stack animation, swipe dismiss, expand stack. Style theo UI kit (Feather icons, theme colors).

```tsx
import { useToast, Toast, ToastContainer, uiKitToastConfig } from 'react-native-ui-kit';

function MyScreen() {
  const toast = useToast();
  return (
    <Button
      label="Hiện toast"
      onPress={() =>
        toast.show({
          title: 'Thành công',
          message: 'Đã lưu dữ liệu',
          severity: 'success',
        })
      }
    />
  );
}

// Hoặc API gốc:
Toast.success('Saved', 'Changes applied.');
Toast.show({ type: 'info', text1: 'Hello' });
```

### Theme

```tsx
import { colors, severityColors, type Severity } from 'react-native-ui-kit';

// colors.primary, colors.surface, colors.text, ...
// severityColors['warning']
```

Icon dùng tên Feather (ví dụ `'check-circle'`, `'menu'`). Type `IconName` được export từ thư viện.

## Example app

Trong monorepo, chạy app demo để xem toàn bộ component:

```sh
yarn install
yarn build          # build thư viện ra thư mục lib/
cd example
yarn ios            # hoặc yarn android
```

Hoặc từ root:

```sh
yarn example start
yarn example ios
```

## Phát triển thư viện

```sh
yarn install
yarn build          # react-native-builder-bob → lib/module + lib/typescript
yarn typecheck
yarn lint
yarn clean          # xóa lib/ và build artifacts
```

Build chạy tự động qua script `prepare` khi `yarn install` / `npm install` trong package này.

Cấu trúc output:

- `lib/module/` — JavaScript (ESM)
- `lib/typescript/` — khai báo TypeScript

Entry point: `src/index.tsx` → publish qua field `exports` trong `package.json`.

## API export

Toàn bộ component, props types, `colors`, `severityColors`, `FeatherIcon`, và re-export `SafeAreaProvider` / `SafeAreaView` / `useSafeAreaInsets` — xem [`src/index.tsx`](./src/index.tsx).

## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
