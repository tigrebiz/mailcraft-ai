<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" class="logo" width="120"/>

# 

---

# Cursor拡張機能SpecStory完全ガイド

SpecStoryは、Cursorエディタで行われるAIとの対話を自動的に記録し、効率的に活用するための画期的な拡張機能です。この記事では、SpecStoryの基本機能から応用的な活用法まで、開発者が知っておくべき情報を網羅的にまとめました。

## SpecStoryの概要と主要機能

SpecStoryは、Cursor（Visual Studio Codeの派生エディタ）専用の拡張機能で、AIアシスタントとの対話を効率的に記録・活用するために開発されました。「あの時のいい提案どこいったっけ？」という開発者の悩みを解決し、AIとの会話を貴重な資産として蓄積することができます[^1]。

### AIチャット履歴の自動保存機能

SpecStoryの中核となる機能は、AIとのチャット履歴を自動的に保存する機能です。この機能により、開発者はCursorエディタでAIアシスタントと対話するたびに、その内容が自動的にMarkdown形式で`.specstory`ディレクトリに保存されます[^1]。

保存される情報には、以下のようなものが含まれます：

- 開発者からAIへの質問内容
- AIからの回答全文（コードブロックを含む）
- 日時情報
- セッションID

各会話は個別のMarkdownファイルとして保存されるため、後から特定の会話を見つけやすくなっています。これにより、数週間前や数か月前に行ったAIとの重要な対話も、消失することなく参照できるようになります[^1]。

### Composerセッション追跡機能

単なるチャットの記録だけではなく、Cursor独自の「Composer」機能（コード自動生成や差分提案など）の履歴も追跡できる点も重要な特徴です[^1]。

Composerセッションでは、以下のような情報が記録されます：

- 元のコード状態
- 指示内容
- 生成されたコードや差分
- 適用された変更の詳細

このデータがあれば、「なぜこのコードがこのように実装されたのか」「どのような指示からこの実装が生まれたのか」を後から追跡できるようになります。これはコードレビューや、新しいチームメンバーへの知識移転において非常に有用です[^1]。

### 検索性の向上

Markdownとして履歴が保存されるため、プロジェクト内検索機能（Ctrl+Shift+FやCmd+Shift+F）や外部ツールを用いた全文検索が簡単に行えます[^1]。

これにより、以下のようなシナリオが可能になります：

- 特定のライブラリやフレームワークに関する過去の質問と回答を検索
- エラーメッセージや特定の問題に関する過去の解決策をキーワード検索
- 特定の機能実装に関する過去の議論を見つける

ログが蓄積されるほど、過去のやり取りが重要なナレッジベースとして機能するようになり、同じ質問を何度もAIに尋ねる必要がなくなります[^1]。

### ローカル保存によるセキュリティ確保

AIとのやり取りデータは`.specstory`ディレクトリ配下にローカル保存されます。クラウドに自動アップロードされないため、企業やチームの機密情報に配慮しながら開発を進めることができます[^1]。

これは、以下のようなケースで特に重要です：

- 企業の機密コードやビジネスロジックが含まれる開発
- 個人情報や機密データを取り扱うプロジェクト
- セキュリティ要件が厳しい環境での開発作業


### 共有機能

SpecStoryには、AIとの会話履歴を他のユーザーと共有するための機能が組み込まれています。この機能を利用するには、コマンドパレット（Windows/LinuxではCtrl+Shift+P、MacではCmd+Shift+P）から「SpecStory: Share Conversation」または類似のコマンドを選択します。

share.specstory.comプラットフォームを通じて、以下のような特徴を活かした共有が可能です：

- **Markdownフォーマットの保持**: AIとの会話がMarkdown形式のまま共有され、コードブロックや構文ハイライトなどが正確に表示されます。
- **双方向のやり取りの表示**: 質問と回答が時系列順に表示され、会話の流れが把握しやすくなっています。
- **アクセス制御機能**: 共有内容へのアクセスを制限するオプションがあり、セキュリティを確保しながら必要な人とだけ共有できます。
- **埋め込み機能**: 生成されたリンクをブログやドキュメントに埋め込むことが可能で、技術記事やチュートリアルの作成に役立ちます。

チーム開発においては、以下のような場面で特に有用です：

- 複雑な問題解決の過程をチームメンバーと共有する
- 新規参加者へのオンボーディング資料として活用する
- プロジェクトの技術的な決定の背景と理由を記録・共有する
- コードレビューでの議論の補助資料として使用する


### 実験的機能：チャット履歴からCursorルールを自動生成

SpecStoryのもう一つの注目すべき機能は、AIとのチャット履歴を分析してCursorのプロジェクトルールを自動生成する実験的な機能です。これにより、繰り返し発生するパターンや重要なコンテキスト情報を自動的にルール化することができます。

この機能は以下のようなプロセスで動作します：

1. **チャット履歴の分析**: `.specstory`ディレクトリに保存されたAIとの会話履歴を分析し、頻出するパターンや指示、コンテキスト情報を抽出します。
2. **ルール候補の生成**: 分析結果に基づいて、Project Rulesまたは`.cursorrules`ファイルとして適用可能なルール候補を自動生成します[^3]。
3. **ユーザーによる確認と編集**: 生成されたルール候補はユーザーに提示され、確認・編集した上で実際のルールとして適用するかどうかを決定できます。

この機能で生成される可能性のあるルールには以下のようなものがあります：

- **コーディング規約**: チャット内で繰り返し言及された命名規則やフォーマットルールなど。
- **プロジェクト固有の指示**: 特定のライブラリの使用方法やアーキテクチャに関する制約など。
- **エラー処理パターン**: よく議論されるエラー処理やバリデーションのアプローチなど。
- **ドキュメント化ルール**: コメントの書き方やドキュメント生成に関するガイドラインなど[^5]。

この機能は実験的な段階にあるため、以下の点に注意が必要です：

- **精度の限界**: 自動生成されるルールの精度や関連性にはまだ改善の余地があります。
- **手動での調整**: 生成されたルールは必ず確認し、必要に応じて編集することが推奨されます。
- **頻繁な更新**: この機能は頻繁に更新される可能性があり、使用方法や効果が変わる場合があります。


## .specstoryディレクトリの保存場所

### 基本的な保存場所

.specstoryディレクトリは、Cursorで開いているプロジェクトのルートディレクトリに作成されます。ディレクトリ構造は以下のようになります[^1]：

```
my-project/
├── .specstory/
│   └── history/
│       ├── untitled-1.md
│       └── untitled.md
└── README.md
```


### devcontainer環境での挙動

複数のdevcontainerを使用するモノレポ環境（例：フロントエンドとバックエンドを分離）では、各ディレクトリごとに独立したSpecStoryディレクトリが作成されます。

例えば、以下のような構造の場合：

```
my-project/
├── frontend/
│   └── .devcontainer
├── backend/
│   └── .devcontainer
```

3つの異なるCursorエディタウィンドウで開発を行うと（my-project、frontend、backend）、それぞれのディレクトリに個別の`.specstory`ディレクトリが作成され、別々に管理されます：

```
my-project/
├── frontend/
│   ├── .devcontainer/
│   └── .specstory/
├── backend/
│   ├── .devcontainer/
│   └── .specstory/
└── .specstory/ （my-project全体を開いた場合）
```

この場合、各devcontainerを開く際に、そのコンテナ内のルートディレクトリに`.specstory`ディレクトリが個別に作成され、それぞれのコンテキストに沿った会話履歴が保存されます。これにより、フロントエンド開発とバックエンド開発で異なる会話コンテキストを維持できます[^6]。

## .specstoryディレクトリのGit管理

.specstoryディレクトリはGitHubにアップロードしてGitでバージョン管理することが可能です。

### Git管理の利点

- **検索性の向上**: GitHubの検索機能で過去のAI会話を簡単に検索可能
- **完全な履歴追跡**: 特定時点での会話状態を完全に復元できる
- **チーム共有の容易さ**: チームメンバー間でAIとの会話履歴を簡単に共有できる


### 実装方法

1. 通常のGitリポジトリと同様に初期化とリモート設定を行う
2. .specstoryディレクトリを含むプロジェクトファイルをコミット
3. GitHubなどのリモートリポジトリにプッシュ

### プライバシーとセキュリティの考慮事項

- 秘密鍵やパスワードなどの機密情報がAIとの会話に含まれていないか確認する
- 必要に応じてプライベートリポジトリを使用する
- GitHubにアップロードしたくない特定のファイルは.gitignoreに追加する


## インストール方法

SpecStoryをCursorエディタにインストールする手順は以下の通りです：

1. 最新版のCursorがインストールされていることを確認します（Version 0.43.6以降推奨）。
2. 公式サイトからVSIXファイル（specstory-vscode-latest.vsix）をダウンロードします。
※注意: Visual Studio Codeマーケットプレイスからは直接インストールできません。VSCode向けにインストールされてしまい、Cursorでは動作しません[^1]。
3. Cursorを起動し、コマンドパレット（Windows/LinuxはCtrl+Shift+P、MacはCmd+Shift+P）を開きます。
4. `Extensions: Install from VSIX…`を選択し、ダウンロードしたVSIXファイルを指定します。
5. インストール完了後、Cursorを再起動します。
6. インストールの確認として、Cursorの拡張機能サイドバーを開き、「SpecStory (Cursor Extension)」が表示されていることを確認します。

インストール後は特別な設定をしなくても、CursorでチャットやComposerを使用した際の履歴が自動的に保存されるようになります[^1]。

## 活用シナリオと応用例

### 個人開発での活用

- **知識ベースの構築**: 開発中に遭遇した問題とその解決法をAIと議論し、その会話を後から参照することで、同様の問題に迅速に対処できます。
- **コーディングパターンの記録**: 特定のタスクに対するAIの提案を記録し、類似したタスクに応用することで開発速度を向上させます。
- **学習の加速**: 新しい技術やフレームワークについてAIと対話し、その会話を学習リソースとして活用できます。


### チーム開発での活用

- **知識共有の促進**: AIとの会話履歴をGit管理し、チーム全体で共有することで、個人の知識がチーム全体の資産となります。
- **オンボーディングの効率化**: 新しいチームメンバーに対し、プロジェクトの背景や設計決定の理由が記録されたAI会話を共有することで、スムーズな立ち上がりをサポートします。
- **コードレビューの充実**: コード変更の背景にあるAIとの議論を共有することで、レビュアーがより深く変更の意図を理解できます。


### ドキュメンテーションへの応用

- **実装決定の記録**: 「なぜこの実装方法を選んだのか」をAIとの対話から再構成し、ドキュメントに反映できます。
- **APIドキュメントの作成**: APIの使用方法や設計意図についてAIと対話した内容を、公式ドキュメントの草案として活用できます。
- **トラブルシューティングガイドの作成**: 発生した問題とその解決策についてのAIとの対話を、トラブルシューティングガイドに発展させることができます。


## まとめ

SpecStoryは、Cursor AIエディタの能力を大幅に拡張する革新的な拡張機能です。AIとの会話履歴を自動保存し、検索可能なナレッジベースとして活用できる機能は、個人開発者からチーム開発まで幅広いシナリオで価値を発揮します。

特に注目すべきは、単なる保存機能にとどまらない「共有機能」や「ルール自動生成機能」といった先進的な機能です。これらを活用することで、AIとの対話がより効果的かつ効率的になり、開発プロセス全体の質が向上します。

プロジェクトの構成やdevcontainer環境に応じて適切に.specstoryディレクトリが作成され、必要に応じてGit管理することで、AIとの対話を貴重な資産として活用することが可能になります。「あの時のいい提案どこいったっけ？」という悩みから解放され、AIとの効果的な協働を実現するために、SpecStoryの導入を検討してみてはいかがでしょうか[^1]。

<div style="text-align: center">⁂</div>

[^1]: https://qiita.com/syukan3/items/26e5279d0e9fb710b6b0

[^2]: https://docs.oracle.com/cd/E57425_01/121/TGSQL/tgsql_cursor.htm

[^3]: https://zenn.dev/globis/articles/cursor-project-rules

[^4]: https://cursorpractice.com/ja/cursor-rules/rules-generate

[^5]: https://note.com/nobita2041/n/nbf9390e1878a

[^6]: https://github.com/ShunsukeHayashi/Auto-coder-agent_Cursor_Roo_code

[^7]: http://www.shuwasystem.co.jp/book/9784798062334.html

[^8]: https://www.meti.go.jp/policy/mono_info_service/contents/ai_guidebook_set.pdf

[^9]: https://www.skyseaclientview.net/case/report/case112.html

[^10]: https://note.com/unikoukokun/n/n991fc7716668

[^11]: https://x.com/sakai_1910/status/1892217300604100974

[^12]: https://zenn.dev/ks0318/articles/6023a5b729cb7a

[^13]: https://zenn.dev/pyteyon/scraps/248206a3eeb311

[^14]: https://note.com/aoki_monpro/n/n1aa8369017c3

[^15]: https://twitter.com/tkm_tsukiwakka/status/1894599986379436105

[^16]: https://note.com/hashtag/Cursor

[^17]: https://b.hatena.ne.jp/entry/s/www.chichi-pui.com/posts/334d2a81-079b-475a-a06b-0d9e95c9a3fb/

[^18]: https://timewell.jp/timewell-media/contents/about-cursor

[^19]: https://zenn.dev/shosampo/articles/cursor-advanced-techniques

[^20]: https://www.adcal-inc.com/column/cursor/

[^21]: https://note.ambitiousai.co.jp/n/nf5e6780e2220

[^22]: https://note.com/mask_ai/n/nb8a32a6cb9bd

[^23]: https://x.com/despatlabo

[^24]: https://b.hatena.ne.jp/entry.touch/s/laiso.hatenablog.com/entry/2025/02/15/214756

[^25]: https://note.com/unikoukokun/n/n4ba7f4c96161

[^26]: https://twitter.com/r_nmt000

[^27]: https://www.maruzenjunkudo.co.jp/products/9784798062334

[^28]: https://brandmovie.de/shop/231674296

[^29]: https://autocenter-meier.ch/?u=22823152125200\&channel=6ed85f\&from=form.php%3Fid%3D1521252-13350%26name%3D（+）Stable+Diffusion+ゲームグラフィックス+自動生成ガイド

[^30]: https://twitter.com/shuwasystem_inf/status/1688470959731425280

[^31]: https://www.hanmoto.com/bd/isbn/9784798062334

[^32]: https://b.hatena.ne.jp/q/WebAuthn

[^33]: https://x.com/keiji_dl/status/1893291474441433479

[^34]: https://b.hatena.ne.jp/q/ai?target=tag\&sort=popular\&safe=on\&date_range=m\&users=3\&page=9

[^35]: https://note.com/panda_lab/n/n42248799cc92

[^36]: https://x.com/nokki_y

[^37]: https://x.com/imaedatakumii

