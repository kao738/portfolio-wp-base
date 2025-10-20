## 再現手順
1. `git checkout help/red-line-debug-20251020`
2. `index.html` をブラウザで開く（Live ServerでもOK）
3. About見出し直下に赤い線が表示されるのを確認

## 見どころ
- `index.html` の CSS 読み込み先: `assets/css/style.css`
- `assets/scss/style.scss`（デバッグ線の残骸がある可能性／538行付近）
- `assets/css/style.css`（Sass出力物。二重読込や `!important` 競合も疑い）

## 補足
- 今回は「修正フォルダ_251018」の最小再現を `portfolio-wp-base` に反映しています。

