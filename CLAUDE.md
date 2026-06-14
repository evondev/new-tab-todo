# New Tab Todo — Chrome Extension

> File này là context bàn giao cho session Claude Code sau. Đọc kỹ trước khi làm tiếp.

## Mục tiêu sản phẩm

Người dùng hay quên việc cần làm và có thói quen mở tab mới trên Chrome liên tục.
Extension này **ghi đè trang New Tab** thành một dashboard todo: mỗi lần `Ctrl/Cmd+T`
là thấy ngay "hôm nay làm gì, sắp tới làm gì". Cơ chế: `chrome_url_overrides.newtab`
trong manifest (Manifest V3).

## Tech stack

- **React 18 + Vite 5 + TypeScript + Tailwind CSS v4** (`@tailwindcss/vite`).
- Vite "thuần" — KHÔNG dùng `@crxjs/vite-plugin` (new tab chỉ là 1 trang HTML, không cần
  service worker / content script).
- Lưu data: **`chrome.storage.local`** (local trong máy, không server, không login).
  Có fallback `localStorage` khi chạy `npm run dev` ngoài Chrome.

## Cách build & load vào Chrome

```bash
npm install
npm run build          # tsc --noEmit && vite build → ra dist/
```

Load lần đầu: `chrome://extensions` → bật **Developer mode** → **Load unpacked** → chọn
folder `dist/`. Mở tab mới để thấy UI.

> Mỗi lần sửa code: `npm run build` lại → vào `chrome://extensions` bấm **Reload** ở extension.

Dev nhanh UI (không cần load vào Chrome): `npm run dev` → mở localhost (dùng fallback localStorage).

`public/manifest.json` được Vite copy nguyên xi vào `dist/`. Sửa manifest thì sửa file trong `public/`.

## Cấu trúc thư mục (feature-based)

```
src/
├── main.tsx                          # mount React vào #root
├── app.tsx                           # render <TodoPage />
├── index.css                         # @import "tailwindcss" + background gradient
├── components/button/                # shared Button (variant: primary|ghost|danger)
├── utils/cn.ts                       # clsx + tailwind-merge
└── features/todo/
    ├── pages/todo-page.tsx           # layout chính + hàm groupTasks() chia 3 nhóm
    ├── components/                    # greeting-clock, add-task-form, task-section, task-item
    ├── hooks/use-tasks.ts            # load/add/toggle/delete + persist storage
    ├── utils/task-storage.ts         # loadTasks/saveTasks (wrap chrome.storage.local + fallback)
    ├── utils/task-date.ts            # getTodayIso/isToday/isOverdue/isUpcoming/formatDueDate
    ├── constants/storage-keys.ts     # STORAGE_KEY = "tasks"
    └── types/task.ts                 # interface Task
```

## Data model

```ts
interface Task {
  id: string;              // crypto.randomUUID()
  title: string;
  dueDate: string | null;  // "YYYY-MM-DD", null = không gắn ngày
  isDone: boolean;
  createdAt: string;       // ISO datetime
  completedAt: string | null;
}
```

Phân loại (trong `todo-page.tsx > groupTasks`):
- **Hôm nay:** chưa xong VÀ (dueDate hôm nay / quá hạn / null).
- **Sắp tới:** chưa xong VÀ dueDate ở tương lai (sort tăng theo ngày).
- **Đã xong:** `isDone === true` (sort theo `completedAt` giảm dần); section ẩn khi rỗng.

## Quy ước code (BẮT BUỘC — theo global CLAUDE.md của user)

- File component **kebab-case**, 1 file = 1 component. Rename trên macOS dùng `git mv`.
- Ưu tiên `interface` hơn `type`; props đặt tên `<Component>Props`; không inline type trong signature.
- className luôn dùng `cn()`, mỗi điều kiện 1 dòng. KHÔNG `.join(" ")` / ternary lồng.
- KHÔNG `<button>` thuần → dùng `Button` từ `src/components/button`.
- KHÔNG SVG inline → ưu tiên `lucide-react`; nếu thiếu thì tạo `src/components/icons/icon-xxx.tsx`.
- KHÔNG `React.FormEvent` (deprecated) → `onSubmit` dùng `React.SyntheticEvent<HTMLFormElement>`,
  `onChange` input dùng `React.ChangeEvent<HTMLInputElement>`.
- Barrel `index.ts` khai báo tên tường minh, không `export *`.
- **Không tự ý commit/push** — đợi user xác nhận.

## Trạng thái hiện tại (cập nhật 2026-06-14)

✅ ĐÃ XONG — đã build pass, `tsc --noEmit` sạch, `dist/` có đủ index.html + assets + manifest.json:
- Đồng hồ + lời chào theo giờ.
- Thêm task (title + ngày), tick xong, xoá; quá hạn báo đỏ.
- 3 section Hôm nay / Sắp tới / Đã xong; persist qua `chrome.storage.local`.

## TODO tiếp theo (chưa làm)

- [ ] **Icon extension** — hiện chưa có; thêm `"icons"` vào manifest + file png 16/48/128.
- [ ] Chưa phải git repo — chưa `git init`, chưa commit lần nào.
- [ ] (Tùy chọn) theme sáng/tối, kéo-thả sắp xếp, edit task, nhắc nhở (notifications),
      tag/độ ưu tiên, sync đa máy (`chrome.storage.sync`) hoặc backend, publish Chrome Web Store.
