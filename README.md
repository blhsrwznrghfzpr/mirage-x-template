# MirageX（ミラージュ・クロス）α

MirageX は Neos でスピード感のある開発をするためのフレームワークです。

現在は α 版であり破壊的な変更を頻繁にしています。

サーバーサイドでメインロジックを動かし、Neos では結果のみを表示するという仕組みになっています。
特殊な構成になるため、導入は慎重に検討してください。

主なメリット

- 以下の理由により、開発速度が早くなる。
  - React の作り方が使える。
  - 外部ライブラリが使える。
  - コードベースの開発ができる。
    - git が使える。
    - 再利用がしやすくなる。
- メインロジックを隠蔽できるため、ユーザーのチートを防ぎやすくなる。
- ブラウザと Neos のクロスプラットフォーム開発ができる。

主なデメリット

- 完成品にはインフラコストがかかる。
- ネットワークレイテンシーの影響を受ける。
- Neos 上で改造できない。

## ローカル環境のセットアップ

### パッケージをインストール

以下のコマンドで依存モジュールをインストールします。

> npm install

### とりあえず動かす

> npm run dev

- Neos オブジェクトが`./dist/neos/src/output.7zbson`に生成されます。
- サーバーが起動します。
- これらはソースコードを変更すると自動で再生成・再起動します。

`./dist/neos/src/output.7zbson`を Neos のウィンドウにドラッグアンドドロップすると、サーバーと通信してサンプルが表示されます。

## メインロジック

メインロジックは`./src/core/main/`下に配置します。
React で動いています。

サンプルを参考にしてください。
`./src/core/main/index.tsx`の`import { App } from "./samples/xxxxx"`を変更すれば別のサンプルに切り替えられます。

## Unit パッケージ

MirageX では Neos と同期する際に、Unit という独自概念を最小単位としています。
Unit はユースケースに合わせてパッケージでまとめられています。
また、自分で作ることもできます。

### Unit を作る

`./src/core/unit/package/`下にパッケージのディレクトリを作ります。既存のパッケージを使ってもいいです。

`./src/core/unit/package/000_template/unitTemplateNeosFeedback`というテンプレートをコピーして、先程作ったパッケージのディレクトリ下に配置します。
またディレクトリ名は任意の Unit 名をつけます。

コピーしたテンプレート下にある`detail.ts`を編集します。
`detail.code`に他の Unit と衝突しない名前、`detail.propsConfig`に必要なプロパティを定義します。

以下のコマンドで各パッケージに Unit のインポート文を追加します。（Unit を新規追加・削除した後は実行してください。）

> npm run unitPackage:sync

以下のコマンドで`./dist/neos/src/output.7zbson`を更新して、Neos にドラッグアンドドロップしなおします。
（`npm run dev`を実行中であれば、以下を行わずとも変更を検知して自動で再生成されています。）

> npm run build:neos

### Unit を Neos で編集する

Neos 上の編集をリポジトリにフィードバックさせることができます。
（正確には Neos 側を優先する Slot とそうでない Slot があります。）

読み込んだ`./dist/neos/src/output.7zbson`を編集して保存します。

#### config の設定

`./src/dev/config.private.json`を作成します。
{RECORD_URL}に Neos で保存したフォルダのリンクを入れます。
（パブリックフォルダにする必要があります。）

```
{
  "feedbackLink": "{RECORD_URL}"
}
```

#### 使い方

以下のコマンドで登録したフォルダから最新のオブジェクトを取得します。

> npm run feedback:fetch

以下のコマンドで取得したオブジェクトの内容を MirageX のベースと Unit に適用させます。

> npm run feedback:attach
