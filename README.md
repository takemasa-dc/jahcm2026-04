# 退院支援プラン共有ボード

「第8回 日本在宅医療連合学会大会」の企画プログラム「チームで創る退院支援 カンファレンス・シミュレーション」で使う，グループ成果物の提出・閲覧・コメント用 Next.js アプリです。

## 機能

- `/` トップページ
- `/submit` グループ代表者用の成果物提出ページ
- `/board` 参加者向けの閲覧・コメントページ
- `/admin` 運営用の簡易管理ページ
- 画像は Vercel Blob に保存
- 提出データとコメントは Postgres に保存
- 閲覧ページでは氏名を表示せず，管理画面でのみ確認
- 閲覧期限後は `/board` に成果物やコメントを表示しない
- 管理画面からテスト投稿，不要な成果物，不適切コメントを非表示または削除
- 1回の提出で写真を最大2枚までアップロード

## セットアップ

```bash
npm install
cp .env.example .env.local
npm run dev
```

ローカルでは `http://localhost:3000` を開きます。

## 環境変数

`.env.example` をもとに設定します。

```env
ADMIN_PASSWORD=
VIEW_UNTIL=2026-07-31T23:59:59+09:00
BLOB_READ_WRITE_TOKEN=
POSTGRES_URL=
```

- `ADMIN_PASSWORD`: `/admin` に入るための管理用パスワード。コードや README には実パスワードを書かないでください。
- `VIEW_UNTIL`: `/board` の閲覧期限。未設定時は `2026-07-31T23:59:59+09:00` を使います。
- `BLOB_READ_WRITE_TOKEN`: Vercel Blob の読み書きトークン。
- `POSTGRES_URL`: Neon Postgres などの接続 URL。

## Vercel Blob の設定

1. Vercel のプロジェクトを開きます。
2. Storage から Blob を作成または接続します。
3. Vercel が追加する `BLOB_READ_WRITE_TOKEN` を Production / Preview / Development に設定します。

## Postgres の設定

1. Vercel Marketplace から Neon Postgres などを作成または接続します。
2. 接続情報として `POSTGRES_URL` を Environment Variables に設定します。
3. アプリ初回アクセス時に `submissions` と `comments` テーブルを自動作成します。

## Vercel へのデプロイ

GitHub リポジトリに push したあと，Vercel で Import Project します。

```bash
git init
git add .
git commit -m "Initial discharge plan board"
git branch -M main
git remote add origin <GitHub repository URL>
git push -u origin main
```

Vercel 側で環境変数を設定してからデプロイしてください。

## 管理者ページ

`/admin` で `ADMIN_PASSWORD` を入力します。ログイン後，約12時間は再入力不要です。

管理画面では以下を行えます。

- 提出された成果物の確認
- コメントと投稿者氏名の確認
- 成果物の非表示，再表示，削除
- コメントの非表示，再表示，削除
- 学会前のテスト投稿の削除

## 当日運用

1. グループワーク後，代表者が `/submit` からグループ番号を選択して写真を提出します。写真は2枚まで選択できます。1枚ずつ追加する場合は，同じグループ番号で再度送信します。
2. 参加者は `/board` から全グループの成果物を閲覧します。
3. 参加者は「参考になった点」を一言コメントします。
4. 運営は必要に応じて `/admin` からテスト投稿や不適切コメントを整理します。

## QR コード作成

Vercel の公開 URL が `https://example.vercel.app` の場合，以下の2つを QR コード化します。

- `https://example.vercel.app/submit`
- `https://example.vercel.app/board`

ブラウザや任意の QR コード作成サービスで作成できます。印刷前にスマートフォンで読み取り確認してください。

## 2026年7月31日以降の削除・停止

閲覧期限後は `/board` に「この共有ボードの閲覧期間は終了しました。」と表示されます。

確認が済んだら，Vercel で以下のいずれかを行います。

- Project を削除する
- Deployment を停止する
- Blob と Postgres のデータを削除する
- GitHub リポジトリをアーカイブまたは削除する

個人情報が含まれる可能性のあるコメント投稿者氏名は，運用終了後に不要であれば削除してください。
