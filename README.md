# react-native-ui-kit

Thư viện component UI cho React Native — nút, form, danh sách, layout, feedback — kèm theme màu, icon Feather và animation bằng API `Animated` thuần của React Native.

## Yêu cầu

- React Native ≥ 0.75 (khuyến nghị 0.85+)
- React 18+
- [react-native-safe-area-context](https://github.com/AppAndFlow/react-native-safe-area-context) ≥ 5
- [@react-native-vector-icons/feather](https://github.com/oblador/react-native-vector-icons) ≥ 13

Animation dùng `Animated` và `LayoutAnimation` có sẵn trong React Native, không cần thư viện bên ngoài nào khác.

## Cài đặt

```sh
yarn add @ducky0203/react-native-ui-kit @react-native-vector-icons/feather react-native-safe-area-context
# hoặc
npm install @ducky0203/react-native-ui-kit @react-native-vector-icons/feather react-native-safe-area-context
```

## Bắt đầu nhanh

Bọc app bằng `SafeAreaProvider` và `ToastProvider` (nếu dùng toast):

```tsx
import {
  SafeAreaProvider,
  ToastProvider,
  Screen,
  Button,
  Typography,
} from '@ducky0203/react-native-ui-kit';

export default function App() {
  return (
    <SafeAreaProvider>
      <ToastProvider>
        <Screen>
          <Typography variant="h1">Xin chào</Typography>
          <Button label="Nhấn tôi" severity="primary" onPress={() => {}} />
        </Screen>
      </ToastProvider>
    </SafeAreaProvider>
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
  severity="primary"   // primary | secondary | success | info | warning | danger
  size="normal"        // small | normal | large
  outlined             // viền, nền trong suốt
  text                 // không viền, không nền
  rounded              // bo tròn hoàn toàn
  loading              // thay label bằng ActivityIndicator
  disabled
  onPress={() => {}}
/>
```

### Typography

```tsx
<Typography variant="h1">Tiêu đề</Typography>
<Typography variant="body" color={colors.textMuted}>Mô tả</Typography>
```

`variant`: `h1` | `h2` | `h3` | `h4` | `body` | `bodySmall` | `caption` | `label`

### InputText

```tsx
<InputText
  label="Email"
  value={email}
  onChangeText={setEmail}
  placeholder="you@example.com"
  invalid={hasError}
  errorText="Email không hợp lệ"
  helperText="Dùng email công ty"
  disabled
  secureTextEntry
  multiline
/>
```

### Select

```tsx
const options = [
  { label: 'Hà Nội', value: 'hn' },
  { label: 'TP.HCM', value: 'hcm' },
];

<Select
  options={options}
  value={city}
  onChange={setCity}
  label="Thành phố"
  placeholder="Chọn thành phố..."
  invalid={hasError}
  errorText="Vui lòng chọn"
/>
```

### Card

```tsx
<Card
  title="Tiêu đề"
  subTitle="Mô tả ngắn"
  header={<Image source={banner} />}
  footer={<Button label="Xem thêm" />}
>
  <Typography>Nội dung card</Typography>
</Card>
```

### Badge, Tag, Chip

```tsx
// Huy hiệu số
<Badge value={5} severity="danger" size="normal" />

// Nhãn màu
<Tag value="Mới" severity="success" icon="star" rounded />

// Chip xóa được
<Chip label="React Native" icon="code" removable onRemove={() => {}} />
```

### Avatar

```tsx
<Avatar label="DN" size="large" severity="primary" shape="circle" />
<Avatar image="https://..." size="normal" />
<Avatar icon="user" size="xlarge" />
```

`size`: `normal` | `large` | `xlarge`

### ProgressBar & ProgressCircle

```tsx
<ProgressBar value={72} severity="success" showValue />

<ProgressCircle value={72} size={96} strokeWidth={8} severity="primary" showValue />
```

### Accordion

```tsx
<Accordion
  multiple
  defaultActiveIndices={[0]}
  items={[
    { title: 'Câu hỏi 1', content: <Typography>Nội dung 1</Typography> },
    { title: 'Câu hỏi 2', content: <Typography>Nội dung 2</Typography>, icon: 'help-circle' },
  ]}
/>
```

### Panel

```tsx
<Panel header="Bộ lọc" toggleable defaultCollapsed>
  <InputText label="Tìm kiếm" />
</Panel>
```

### TabView

```tsx
<TabView
  defaultIndex={0}
  onChange={(index) => console.log(index)}
  tabs={[
    { title: 'Tổng quan', content: <Overview /> },
    { title: 'Chi tiết',  content: <Details />, icon: 'list' },
  ]}
/>
```

### Menu

```tsx
<Menu
  triggerLabel="Tùy chọn"
  triggerIcon="more-vertical"
  align="end"
  items={[
    { label: 'Chỉnh sửa', icon: 'edit-2', onPress: handleEdit },
    { label: 'Xóa', icon: 'trash-2', severity: 'danger', onPress: handleDelete },
    { label: 'Không hoạt động', icon: 'slash', disabled: true },
  ]}
/>
```

### FlatList / SectionList

```tsx
<FlatList
  data={items}
  renderItem={({ item }) => <ItemCard item={item} />}
  keyExtractor={(item) => item.id}
  loading={isLoading}           // skeleton toàn màn hình
  refreshing={isRefreshing}
  onRefresh={handleRefresh}
  loadingMore={isFetchingMore}
  onLoadMore={fetchNextPage}
  emptyText="Không có dữ liệu"
  emptyIcon="inbox"
/>
```

### EmptyState

```tsx
<EmptyState
  title="Chưa có đơn hàng"
  description="Tạo đơn hàng đầu tiên của bạn"
  icon="shopping-bag"
/>
```

### Screen

```tsx
<Screen backgroundColor="#F8FAFC" edges={['top', 'bottom']}>
  {/* nội dung */}
</Screen>
```

### Divider

```tsx
<Divider />                      // ngang
<Divider layout="vertical" />   // dọc
<Divider label="HOẶC" />        // có nhãn

### Toast

Dựa trên [react-native-toast-message-ts](https://github.com/noorjsdivs/react-native-toast-message-ts) (MIT) — stack animation, swipe dismiss, expand stack. Style theo UI kit (Feather icons, theme colors).

```tsx
import { useToast, Toast, ToastContainer, uiKitToastConfig } from '@ducky0203/react-native-ui-kit';

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

Gọi `configureTheme` **một lần** ở entry point (trước khi render bất kỳ component nào):

```tsx
import { configureTheme } from '@ducky0203/react-native-ui-kit';

configureTheme({
  colors: {
    primary: '#6366F1',   // indigo thay vì blue mặc định
    danger:  '#DC2626',
  },
  font: {
    family: 'SFProDisplay-Regular', // tên font đã load vào app
  },
});
```

Chỉ cần truyền các key muốn override — phần còn lại giữ nguyên default.

#### Bảng màu mặc định

| Token | Giá trị | Dùng cho |
|---|---|---|
| `primary` | `#3B82F6` | Nút, focus, accent chính |
| `secondary` | `#64748B` | Nút/tag thứ cấp |
| `success` | `#22C55E` | Xác nhận thành công |
| `info` | `#06B6D4` | Thông tin |
| `warning` | `#F59E0B` | Cảnh báo |
| `danger` | `#EF4444` | Lỗi, hủy, xóa |
| `surface` | `#FFFFFF` | Nền thẻ/card |
| `surfaceMuted` | `#F1F5F9` | Nền mờ, disabled |
| `border` | `#E2E8F0` | Viền input, divider |
| `text` | `#0F172A` | Chữ chính |
| `textMuted` | `#64748B` | Chữ phụ, placeholder |
| `textInverse` | `#FFFFFF` | Chữ trên nền tối |

#### Dùng trực tiếp trong app

```tsx
import { colors, severityColors, type Severity } from '@ducky0203/react-native-ui-kit';

// Sau khi configureTheme chạy, object này đã được cập nhật
const style = { color: colors.primary };
const tone  = severityColors['warning'];
```

#### Tích hợp font (San Francisco Pro / custom font)

1. Load font vào app trước (ví dụ Expo):

```tsx
// app/_layout.tsx (Expo Router)
import { useFonts } from 'expo-font';

const [loaded] = useFonts({
  'SFProDisplay-Regular': require('./assets/fonts/SF-Pro-Display-Regular.otf'),
  'SFProDisplay-Semibold': require('./assets/fonts/SF-Pro-Display-Semibold.otf'),
});
```

2. Sau đó gọi `configureTheme`:

```tsx
configureTheme({
  font: { family: 'SFProDisplay-Regular' },
});
```

Font sẽ áp dụng toàn bộ component: `Typography`, `Button`, `Badge`, `Chip`, `Tag`, `Avatar`, `Divider`, `InputText`, `ProgressBar`, `Menu`.

> **Lưu ý:** Lib chỉ nhận *tên* font — việc load file font (`.otf`, `.ttf`) là trách nhiệm của app thông qua `expo-font`, `react-native-font` hoặc link native.

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

## Publish lên npm

Publish thủ công (không qua CI):

```sh
npm login                # đăng nhập npmjs.org (một lần)
npm version patch        # minor / major tùy thay đổi
npm run release          # clean → build → npm publish
git push --follow-tags   # đẩy commit + tag version lên GitHub
```

Script `release` chạy `clean` → `build` (bob) → `npm publish`. Chỉ các file khai báo trong `files` (`lib`, native folders…) được ship, `src` bị loại. Cấu hình registry & quyền truy cập lấy từ `publishConfig` (npmjs.org, `access: public`).

## API export

| Export | Mô tả |
|---|---|
| Components | `Screen`, `Button`, `Typography`, `InputText`, `Select`, `Card`, `Badge`, `Avatar`, `Chip`, `Tag`, `Icon`, `Divider`, `Menu`, `Accordion`, `Panel`, `TabView`, `FlatList`, `SectionList`, `EmptyState`, `ProgressBar`, `ProgressCircle` |
| Toast | `ToastProvider`, `useToast`, `showToast`, `Toast`, `ToastContainer`, `uiKitToastConfig` |
| Theme | `configureTheme`, `colors`, `severityColors`, `getFontStyle` |
| Types | `Severity`, `Colors`, `IconName`, tất cả `*Props` types |
| Re-exports | `SafeAreaProvider`, `SafeAreaView`, `useSafeAreaInsets`, `FeatherIcon` |

Xem đầy đủ tại [`src/index.tsx`](./src/index.tsx).

## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
