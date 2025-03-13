# Git ブランチ管理の手順

## 基本的なブランチ戦略

Git での効果的なブランチ管理は、複数人での開発をスムーズに進めるために重要です。一般的に推奨される方法は、各機能やバグ修正ごとに個別のブランチを作成し、作業が完了したらメインブランチにマージすることです。

### ブランチの種類

- `main`（または master）: プロダクションコードのメインブランチ
- 機能ブランチ（例: `feature/add-clear-buttons`）: 新機能の開発用
- バグ修正ブランチ（例: `fix/login-issue`）: バグ修正用
- リリースブランチ（例: `release/v1.2.0`）: リリース準備用

### ブランチの命名規則

効率的な開発とコードの管理のため、以下の命名規則に従ってブランチを作成します：

#### プレフィックスによるカテゴリ分け

- `feature/` - 新機能の追加（例: `feature/user-authentication`）
- `fix/` - 通常のバグ修正（例: `fix/login-validation`）
- `hotfix/` - 緊急のバグ修正、通常は本番環境の問題に対応（例: `hotfix/critical-security-issue`）
- `docs/` - ドキュメント関連の変更のみ（例: `docs/api-documentation`）
- `refactor/` - 機能追加なしのコード改善（例: `refactor/optimize-queries`）
- `test/` - テスト追加や修正（例: `test/user-registration`）
- `chore/` - その他の雑務的な変更（例: `chore/update-dependencies`）

#### 命名の基本ルール

1. **命名形式**: `<プレフィックス>/<簡潔な説明>`
2. **説明部分**:
   - 小文字と数字のみ使用
   - 単語間はハイフン（-）で区切る
   - 短く、具体的で理解しやすい名前にする
3. **チケット番号の追加**（オプション）: `<プレフィックス>/<チケット番号>-<説明>`
   - 例: `feature/ISSUE-123-add-user-settings`

#### 良い例と悪い例

**良い例**:

- `feature/add-email-templates`
- `fix/incorrect-date-format`
- `docs/update-deployment-guide`
- `refactor/simplify-auth-logic`

**悪い例**:

- `new-feature` (プレフィックスなし)
- `feature/AddEmailTemplates` (大文字使用)
- `fix/bug` (具体性に欠ける)
- `feature/this-is-a-very-long-branch-name-that-is-hard-to-read` (長すぎる)

ブランチ名は作業内容を正確に反映し、他のチームメンバーがひと目で内容を理解できるようにすることが重要です。

## 新しい機能の開発手順

### 1. 最新のメインブランチを取得

```bash
git checkout main
git pull origin main # リモートリポジトリのmainブランチから現在のローカルブランチにpullする
```

※origin はリモートリポジトリのこと。

### 2. 新しい機能ブランチを作成

```bash
git checkout -b feature/機能名
```

例：

```bash
git checkout -b feature/add-clear-buttons
```

### 3. 機能開発とコミット

ファイルを編集した後、変更をステージングとコミット：

```bash
git add 変更したファイル
git commit -m "コミットメッセージ"
```

例：

```bash
git add src/pages/index.tsx
git commit -m "宛先と署名と内容のクリアボタンを追加"
```

### 4. リモートリポジトリにプッシュ

```bash
git push -u origin feature/機能名
```

例：

```bash
git push -u origin feature/add-clear-buttons
```

`-u`（または`--set-upstream`）オプションを使うと、次回からは単に`git push`だけでプッシュできます。このオプションは以下の効果があります：

- ローカルブランチとリモートブランチの間に**追跡関係**（トラッキング関係）を設定します
- 一度設定すれば、以後は `git push` や `git pull` のみで対象ブランチを省略できます
- 新しいブランチを初めてリモートにプッシュするときに使うのが一般的です
- この追跡関係は永続的に保存されるため、繰り返し設定する必要はありません

例えば上記の例では、ローカルの `feature/add-clear-buttons` ブランチが、リモートの `origin/feature/add-clear-buttons` ブランチを追跡するよう設定されます。

### 5. プルリクエストの作成

GitHub などのプラットフォームでプルリクエストを作成します：

1. リポジトリページにアクセス
2. 「Pull requests」タブをクリック
3. 「New pull request」ボタンをクリック
4. ベースブランチ（通常は`main`）と作業ブランチを選択
5. 「Create pull request」をクリック
6. タイトルと説明を入力
7. 「Create pull request」で完了

## チーム開発でのベストプラクティス

### プッシュ前に最新のメインブランチを取り込む

競合を減らすために、プッシュ前にメインブランチの最新変更を取り込みます：

```bash
# メインブランチを最新に更新
git checkout main
git pull origin main

# 作業ブランチに戻る
git checkout feature/機能名

# メインの変更を取り込む方法1: マージ
git merge main

# または方法2: リベース（コミット履歴をきれいに保ちたい場合）
git rebase main
```

### コンフリクト（競合）の解決

マージやリベース中に競合が発生した場合：

1. 競合しているファイルを確認（`git status`）
2. ファイルを開いて競合部分を修正
3. 変更を保存
4. 修正したファイルをステージング（`git add 競合ファイル`）
5. マージまたはリベースを続行
   - マージの場合: `git commit`
   - リベースの場合: `git rebase --continue`

## ブランチの管理と確認

### 現在のブランチを確認

```bash
git branch
```

### リモートも含めたすべてのブランチを確認

```bash
git branch -a
```

### 不要になったブランチを削除

```bash
# ローカルブランチの削除
git branch -d ブランチ名

# リモートブランチの削除
git push origin --delete ブランチ名
```

### ブランチの状態とコミット履歴の確認

```bash
# コミット履歴を確認
git log --oneline

# ブランチのグラフ表示
git log --oneline --graph --all --decorate
```

## 注意点

1. コミットメッセージは具体的かつ明確に記述する
2. 大きな機能は小さなタスクに分割してブランチを作成する
3. 定期的に`git pull`でメインブランチの変更を取り込む
4. プルリクエストはレビューしやすい大きさに保つ
5. ブランチ名は機能や修正内容が分かるように命名する

このワークフローに従うことで、チーム開発でのコード管理がスムーズになり、競合の発生を最小限に抑えることができます。
