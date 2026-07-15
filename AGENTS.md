# AGENTS.md

このリポジトリで作業するエージェント向けのガイドです。回答や作業ログは、ユーザーが別言語を指定しない限り日本語で簡潔に書いてください。

## プロジェクト概要

- 個人ポートフォリオサイト `fuuji.site` のフロントエンドです。
- React 19 + TypeScript + Vike/Vite + Tailwind CSS v4 で構成されています。
- Vike の `prerender: true` を使う静的サイトです。ビルド成果物は主に `dist/client/` に出力され、GitHub Actions で S3/CloudFront にデプロイされます。
- Node.js は CI で `20` を使用しています。依存関係は `package-lock.json` を尊重し、インストールが必要な場合は `npm ci` を使ってください。

## よく使うコマンド

- `npm run dev` - ローカル開発サーバーを起動します。
- `npm run build` - Vike/Vite のビルドと型チェック相当の検証を行います。
- `npm run preview` - ビルド済みサイトをプレビューします。
- `npm run lint` - Biome の lint を実行します。
- `npm run format -- --write .` - Biome でフォーマットを書き込みます。実行前に対象差分を確認してください。

変更後は、少なくとも `npm run lint` と `npm run build` を実行してください。

## 主要な構成

- `src/pages/` - Vike のページです。`+Page.tsx`、`+title.ts`、`+description.tsx`、`+data.ts` などの規約ファイルを使います。
- `src/layouts/` - 共通レイアウト、ヘッダー、フッター、グローバル CSS です。
- `src/components/` - ページ横断で使う UI/演出コンポーネントです。
- `src/mydata/` - プロフィール、SNS、スキル、資格などの表示データです。
- `src/pages/projects/Projects.tsx` - プロジェクト一覧データを持ちます。
- `src/pages/articles/` - Zenn/Qiita 記事一覧の取得、テーマ、カード UI です。`articles.ts` はビルド時取得に失敗した場合の静的フォールバックを持ちます。
- `src/assets/` と `public/` - 画像、SVG、favicon などの静的アセットです。import する画像は原則 `src/assets/` に置いてください。
- `.github/workflows/` - CI/CD です。CI は `src/**` 変更時に `lint` と `build` を実行します。

## 実装ルール

- 既存の Vike ファイル構成に合わせてください。新しいページは `src/pages/<route>/+Page.tsx` を基本にし、必要に応じて `+title.ts` や `+data.ts` を追加します。
- TypeScript は `strict`、`noUnusedLocals`、`noUnusedParameters` が有効です。未使用の import、変数、引数を残さないでください。
- スタイルは Tailwind のユーティリティを優先し、既存の `src/layouts/style.css`、`src/layouts/tailwind.css`、`src/styles/` の役割を崩さないでください。
- アイコンは既存の利用に合わせ、汎用 UI は `lucide-react`、ブランド/技術系は `react-icons` または `src/assets/icons/` を使ってください。
- SNS、スキル、資格の表示内容は、可能な限り `src/mydata/` のデータを更新して反映してください。コンポーネント内に同じ情報を直書きしないでください。
- 記事一覧は Zenn/Qiita の外部 API に依存します。ビルドを壊さないため、失敗時のフォールバック動作を維持してください。
- `dist/`、`node_modules/`、`.DS_Store` は編集対象にしないでください。
- 既存の未コミット変更はユーザーの作業として扱い、依頼されていない差分を巻き戻さないでください。

## UI/UX の注意

- ポートフォリオなので、第一印象の演出と可読性の両方を保ってください。既存の暗めの背景、グラス感、グラデーション、アニメーションの方向性に寄せます。
- モバイル表示を必ず意識してください。ヘッダー、カード、長い日本語テキスト、外部リンクが狭い幅で崩れないか確認します。
- 外部リンクを追加する場合は、リンク先が正しいことと、表示名が既存のトーンに合っていることを確認してください。
- `BackgroundGlobe`、Vanta、Three.js、GSAP 周辺は SSR/プリレンダーとの相性に注意し、ブラウザ専用 API を使う処理は `useEffect` などクライアント側に閉じ込めてください。

## 検証チェックリスト

変更内容に応じて以下を確認してください。

- `npm run lint`
- `npm run build`
- UI 変更では `npm run dev` で `/`、`/articles`、`/projects`、`/certifications` を確認
- 外部記事取得に関わる変更では、API 失敗時でも記事ページが空にならないことを確認

## GitHub Actions / デプロイ

- CI は `main` への push と pull request のうち、`src/**` が変わった場合に動きます。
- CD は `main` への push かつ `src/**` 変更時に `dist/client/` を S3 に同期し、CloudFront を invalidation します。
- ワークフローを変える場合は、パスフィルタや AWS OIDC の権限、pin された action の扱いを意識してください。
