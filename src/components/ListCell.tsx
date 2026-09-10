import { memo, type ReactElement, type ReactNode } from 'react';

/**
 * Phần thông tin mà nội dung một hàng thực sự phụ thuộc vào.
 * `ListRenderItemInfo` (FlatList) và `SectionListRenderItemInfo` (SectionList)
 * đều khớp mẫu này.
 */
type CellInfo = {
  item: unknown;
  index: number;
  section?: unknown;
};

type CellProps<Info extends CellInfo> = {
  info: Info;
  renderItem: (info: Info) => ReactNode;
  extraData: unknown;
};

function ListCellInner<Info extends CellInfo>({
  info,
  renderItem,
}: CellProps<Info>) {
  return renderItem(info);
}

/**
 * Bọc mỗi hàng trong một `memo` so sánh đúng những thứ hàng đó phụ thuộc vào.
 * VirtualizedList render lại toàn bộ cell đang hiển thị mỗi lần chính list
 * render lại (đổi `loading`, `refreshing`, state của màn hình...), kể cả khi
 * item không đổi; đây là cách FlashList chặn việc đó ở `ViewHolder`.
 *
 * `separators` bị bỏ qua khi so sánh vì VirtualizedList tạo object mới mỗi lần
 * render nhưng các hàm bên trong luôn thao tác trên cell hiện tại.
 *
 * Chỉ có tác dụng khi `renderItem` giữ nguyên tham chiếu giữa các lần render,
 * tức là được bọc `useCallback` (hoặc khai báo ngoài component).
 */
export const ListCell = memo(
  ListCellInner,
  (prev, next) =>
    prev.renderItem === next.renderItem &&
    prev.extraData === next.extraData &&
    prev.info.item === next.info.item &&
    prev.info.index === next.info.index &&
    prev.info.section === next.info.section
) as <Info extends CellInfo>(props: CellProps<Info>) => ReactElement | null;
