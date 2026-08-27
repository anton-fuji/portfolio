# AGENTS.md

`fuuji.site` のフロントエンド。React 19、TypeScript、Vike/Vite、Tailwind CSS v4 による静的ポートフォリオサイトです。回答と作業ログは、指定がなければ日本語で簡潔に記述してください。

## 開発

- CI は Node.js 20。依存関係は `package-lock.json` を正とし、インストールには `npm ci` を使う。
- 開発サーバー: `npm run dev`
- 標準検証: `npm run check`（format check、lint、typecheck、build）
- 整形を更新する場合は、差分を確認してから `npm run format` を実行する。

## 構成

- `src/pages/`: Vike のルート。既存の `+Page.tsx`、`+data.ts` などの規約に従う。
- `src/components/`、`src/layouts/`、`src/styles/`: 再利用 UI、レイアウト、スタイル。
- `src/mydata/`: プロフィール、スキル、資格などの表示データ。表示内容はここを更新し、コンポーネントへ重複して書かない。
- `src/pages/articles/`: 外部記事取得。通信失敗時の静的フォールバックを維持する。
- `.github/workflows/`: CI/CD。ワークフロー変更時はパスフィルタと AWS OIDC 権限を確認する。

## 守ること

- TypeScript の strict 設定を守り、未使用コードを残さない。
- Tailwind のユーティリティと既存の暗色・グラス・グラデーションの表現を優先し、モバイル表示も確認する。
- `window`、Three.js、GSAP などブラウザ専用 API は、SSR/プリレンダーを壊さないよう `useEffect` 内に閉じ込める。
- `dist/`、`node_modules/`、`.DS_Store` は編集しない。既存の未コミット変更は依頼範囲外なら保持する。

## 検証

- 変更後は `npm run check` を実行する。
- UI 変更では `/`、`/articles`、`/projects`、`/certifications` を確認する。
- 外部記事取得を変更した場合は、取得失敗時にも記事一覧が空にならないことを確認する。
