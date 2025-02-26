import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  const [inputText, setInputText] = useState("");
  const [outputMail, setOutputMail] = useState("");
  const [editableMail, setEditableMail] = useState("");
  const [politenessLevel, setPolitenessLevel] = useState(3);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [signature, setSignature] = useState(
    "--\n株式会社メールクラフト\n佐藤 太郎\nメール: taro.sato@example.com\n電話: 03-1234-5678"
  );

  // メール生成の処理（実際にはAI APIを呼び出す）
  const generateMail = () => {
    if (!inputText.trim()) return;

    setIsGenerating(true);

    // ここで実際はAPIを呼ぶ
    setTimeout(() => {
      // 宛先に「様」を追加（すでに「様」がついていない場合のみ）
      const recipientLines = recipient.trim().split("\n");
      let formattedRecipient = "";

      if (recipientLines.length > 0) {
        // 最後の行に「様」を追加（すでに「様」がついていない場合のみ）
        const lastLineIndex = recipientLines.length - 1;
        if (recipientLines[lastLineIndex].trim().endsWith("様")) {
          recipientLines[lastLineIndex] = recipientLines[lastLineIndex].trim();
        } else {
          recipientLines[lastLineIndex] =
            `${recipientLines[lastLineIndex].trim()} 様`;
        }
        formattedRecipient = recipientLines.join("\n");
      } else {
        formattedRecipient = "ご担当者 様";
      }

      // モックデータ - 実際の実装では削除
      const mockResponses = [
        `${formattedRecipient}

お世話になっております。株式会社メールクラフトの佐藤です。

${inputText}

ご確認のほど、よろしくお願いいたします。

${signature}`,
        `${formattedRecipient}

いつもお世話になっております。
株式会社メールクラフトの佐藤でございます。

${inputText}

ご多忙のところ恐れ入りますが、ご確認いただけますと幸いです。

どうぞよろしくお願い申し上げます。

${signature}`,
        `${formattedRecipient}

平素より格別のご高配を賜り、厚く御礼申し上げます。
株式会社メールクラフト 佐藤太郎でございます。

${inputText}

ご多用の折、大変恐縮ではございますが、
ご確認いただけますと誠にありがたく存じます。

今後とも何卒よろしくお願い申し上げます。

${signature}`,
      ];

      const generatedMail = mockResponses[politenessLevel - 1];
      setOutputMail(generatedMail);
      setEditableMail(generatedMail);
      setIsGenerating(false);
    }, 1500);
  };

  // クリップボードにコピー
  const copyToClipboard = () => {
    if (!editableMail) return;

    navigator.clipboard.writeText(editableMail).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      <Head>
        <title>MailCraft AI - ビジネスメール最適化アシスタント</title>
        <meta
          name="description"
          content="AIを活用してプロフェッショナルなビジネスメールを簡単に作成できるツール"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-700">MailCraft AI</h1>
          <div className="flex space-x-2">
            <a
              href="/pricing"
              className="text-sm text-gray-600 hover:text-primary-600 px-3 py-2"
            >
              料金プラン
            </a>
            <a
              href="/login"
              className="text-sm text-gray-600 hover:text-primary-600 px-3 py-2"
            >
              ログイン
            </a>
            <a
              href="/signup"
              className="text-sm bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 rounded-md"
            >
              無料登録
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-8 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              AIでビジネスメールを瞬時に最適化
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              伝えたい内容を入力するだけで、プロフェッショナルなメールに自動変換します
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 入力フォーム */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                1. メール内容を入力
              </h3>

              {/* 宛先情報（統合されたテキストボックス） */}
              <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-700">
                    宛先情報（任意）
                  </h4>
                </div>
                <div>
                  <label
                    htmlFor="recipient"
                    className="block text-sm text-gray-700 mb-1"
                  >
                    宛先
                  </label>
                  <textarea
                    id="recipient"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="例: 株式会社サンプル&#13;&#10;営業部&#13;&#10;山田"
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">
                    複数行の宛先もそのまま入力できます。「様」は自動的に追加されます。
                  </p>
                </div>
              </div>

              {/* 差出人情報 */}
              <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-700">
                    差出人情報（任意）
                  </h4>
                </div>
                <div>
                  <label
                    htmlFor="signature"
                    className="block text-sm text-gray-700 mb-1"
                  >
                    署名
                  </label>
                  <textarea
                    id="signature"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    placeholder="例: --&#13;&#10;株式会社メールクラフト&#13;&#10;鈴木 一郎&#13;&#10;メール: ichiro.suzuki@example.com&#13;&#10;電話: 03-1234-5678"
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">
                    メール署名として使用されます。複数行入力可能で、入力された内容がそのままメールの末尾に追加されます。
                  </p>
                </div>
              </div>

              {/* 内容入力エリア */}
              <div className="mb-6">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  伝えたい内容 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="content"
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium"
                  placeholder="例: 明日の会議資料を添付します。ご確認をお願いします。"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">
                  箇条書きでも文章でもOK。メールにしたい内容を自由に入力してください。
                </p>
              </div>

              {/* 丁寧さレベル */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    2. 丁寧さのレベルを選択
                  </label>
                  <span className="text-sm font-medium text-primary-600">
                    レベル {politenessLevel}
                  </span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="5"
                  value={politenessLevel}
                  onChange={(e) => setPolitenessLevel(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>カジュアル</span>
                  <span>標準</span>
                  <span>非常に丁寧</span>
                </div>
              </div>

              {/* 生成ボタン */}
              <button
                onClick={generateMail}
                disabled={!inputText.trim() || isGenerating}
                className={`w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md ${
                  !inputText.trim() || isGenerating
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-primary-600 text-white hover:bg-primary-700"
                }`}
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    生成中...
                  </span>
                ) : (
                  "3. メールを生成"
                )}
              </button>
            </div>

            {/* 出力結果（編集可能なテキストエリアに変更） */}
            <div
              className={`bg-white rounded-xl shadow-lg p-6 ${editableMail ? "border-2 border-green-500" : ""}`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {editableMail
                    ? "最適化されたメール（編集可能）"
                    : "生成されたメールがここに表示されます"}
                </h3>

                {editableMail && (
                  <button
                    onClick={copyToClipboard}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    {isCopied ? (
                      <span className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        コピー完了
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                          />
                        </svg>
                        コピーする
                      </span>
                    )}
                  </button>
                )}
              </div>

              <div
                className={`border rounded-lg p-4 h-[400px] ${editableMail ? "bg-white" : "bg-gray-50"} overflow-y-auto`}
              >
                {editableMail ? (
                  <textarea
                    className="w-full h-full font-sans text-gray-800 focus:outline-none resize-none"
                    value={editableMail}
                    onChange={(e) => setEditableMail(e.target.value)}
                  ></textarea>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-300 mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-gray-500 mb-2">
                      左側のフォームに伝えたい内容を入力し、「メールを生成」ボタンをクリックしてください。
                    </p>
                    <p className="text-sm text-gray-400">
                      AIがプロフェッショナルなビジネスメールを自動で作成します
                    </p>
                  </div>
                )}
              </div>

              {editableMail && (
                <div className="mt-4 bg-green-50 rounded-lg p-3">
                  <p className="text-sm text-green-800">
                    <span className="font-medium">
                      ✓ メールが生成されました！
                    </span>
                    自由に編集して、そのままメールクライアントに貼り付けてご利用ください。
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 使用回数の表示 */}
          <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-4 text-center">
            <p className="text-sm text-blue-800">
              無料枠: 残り 10 回 / 10 回 | より高度な機能を使いたい方は
              <a href="/pricing" className="font-medium underline">
                プレミアムプラン
              </a>
              をご検討ください
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} MailCraft AI. All rights
              reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="/terms"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                利用規約
              </a>
              <a
                href="/privacy"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                プライバシーポリシー
              </a>
              <a
                href="/contact"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                お問い合わせ
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
