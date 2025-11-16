# Agenters

エージェント可視化 Web アプリ (React + TypeScript)。

## セットアップ

```bash
npm install
```

ローカルの file ベース依存を利用するため、追加のネットワークアクセスは不要です。

## 開発サーバー

```bash
npm run dev
```

- http://localhost:5173 でアプリが起動します。
- コード変更は `tsc --watch` と軽量サーバーで即時反映されます。

## ビルド

```bash
npm run build
```

`build/` 配下に静的アセットが生成されます。`npm run preview` で配信確認が可能です。
