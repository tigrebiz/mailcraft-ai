import { useState, useEffect } from "react";
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
  const [savedRecipients, setSavedRecipients] = useState<
    Array<{ id: string; name: string; content: string }>
  >([]);
  const [recipientName, setRecipientName] = useState("");
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [showSavedList, setShowSavedList] = useState(false);

  // ローカルストレージから保存済み宛先を読み込む
  useEffect(() => {
    const savedData = localStorage.getItem("savedRecipients");
    if (savedData) {
      setSavedRecipients(JSON.parse(savedData));
    }
  }, []);

  // サンプル宛先データ
  const sampleRecipients = [
    {
      id: "sample-1",
      name: "株式会社テックソリューション",
      content: "株式会社テックソリューション\nIT事業部\n鈴木",
    },
    {
      id: "sample-2",
      name: "グローバル商事",
      content: "グローバル商事株式会社\n営業企画部\n佐藤部長",
    },
    {
      id: "sample-3",
      name: "山田建設",
      content: "山田建設株式会社\n工事管理課\n田中様",
    },
  ];

  // サンプル宛先を追加
  const addSampleRecipients = () => {
    // まだ追加されていないサンプルだけを追加
    const existingIds = savedRecipients.map((item) => item.id);
    const newSamples = sampleRecipients.filter(
      (sample) => !existingIds.includes(sample.id)
    );

    if (newSamples.length === 0) {
      alert("すべてのサンプルデータはすでに追加されています");
      return;
    }

    const updatedRecipients = [...savedRecipients, ...newSamples];
    setSavedRecipients(updatedRecipients);
    localStorage.setItem("savedRecipients", JSON.stringify(updatedRecipients));

    // リストを表示
    setShowSavedList(true);
  };

  // サンプル宛先を一括削除
  const removeSampleRecipients = () => {
    const sampleIds = sampleRecipients.map((sample) => sample.id);
    const nonSampleRecipients = savedRecipients.filter(
      (item) => !sampleIds.includes(item.id)
    );

    setSavedRecipients(nonSampleRecipients);
    localStorage.setItem(
      "savedRecipients",
      JSON.stringify(nonSampleRecipients)
    );
  };

  // 宛先情報を保存
  const saveRecipient = () => {
    if (!recipient.trim() || !recipientName.trim()) return;

    const newRecipient = {
      id: Date.now().toString(),
      name: recipientName,
      content: recipient,
    };

    const updatedRecipients = [...savedRecipients, newRecipient];
    setSavedRecipients(updatedRecipients);

    // ローカルストレージに保存
    localStorage.setItem("savedRecipients", JSON.stringify(updatedRecipients));

    // フォームをリセット
    setRecipientName("");
    setShowSaveForm(false);
  };

  // 保存済み宛先を選択
  const selectRecipient = (content: string) => {
    setRecipient(content);
    setShowSavedList(false);
  };

  // 保存済み宛先を削除
  const deleteRecipient = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // 親要素のクリックイベントを停止
    const updatedRecipients = savedRecipients.filter((item) => item.id !== id);
    setSavedRecipients(updatedRecipients);
    localStorage.setItem("savedRecipients", JSON.stringify(updatedRecipients));
  };

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
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowSavedList(!showSavedList)}
                      className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                      保存済み宛先
                    </button>
                    {!showSaveForm ? (
                      <button
                        type="button"
                        onClick={() => setShowSaveForm(true)}
                        className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded hover:bg-green-100 flex items-center"
                        disabled={!recipient.trim()}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        保存
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowSaveForm(false)}
                        className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        キャンセル
                      </button>
                    )}
                  </div>
                </div>

                {/* 保存フォーム */}
                {showSaveForm && (
                  <div className="mb-3 p-3 border border-green-200 rounded-md bg-green-50">
                    <label
                      htmlFor="recipientName"
                      className="block text-sm text-gray-700 mb-1"
                    >
                      宛先名（例: 〇〇株式会社）
                    </label>
                    <div className="flex space-x-2">
                      <input
                        id="recipientName"
                        type="text"
                        className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        placeholder="保存する宛先の名前"
                      />
                      <button
                        type="button"
                        onClick={saveRecipient}
                        disabled={!recipientName.trim() || !recipient.trim()}
                        className={`px-3 py-1 text-sm rounded-md ${
                          !recipientName.trim() || !recipient.trim()
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                      >
                        保存する
                      </button>
                    </div>
                  </div>
                )}

                {/* 保存済み宛先リスト */}
                {showSavedList && (
                  <div className="mb-3">
                    {/* サンプルデータ管理ボタン */}
                    <div className="flex justify-between items-center mb-2">
                      <button
                        type="button"
                        onClick={addSampleRecipients}
                        className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100 flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        サンプルデータを追加
                      </button>
                      {savedRecipients.some((item) =>
                        sampleRecipients.map((s) => s.id).includes(item.id)
                      ) && (
                        <button
                          type="button"
                          onClick={removeSampleRecipients}
                          className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded hover:bg-gray-100 flex items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          サンプルを削除
                        </button>
                      )}
                    </div>

                    {savedRecipients.length > 0 ? (
                      <div className="max-h-48 overflow-y-auto border border-blue-200 rounded-md divide-y divide-blue-100">
                        {savedRecipients.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => selectRecipient(item.content)}
                            className={`p-2 hover:bg-blue-50 cursor-pointer flex justify-between items-center ${
                              item.id.startsWith("sample-")
                                ? "bg-indigo-50"
                                : ""
                            }`}
                          >
                            <span className="text-sm font-medium">
                              {item.name}
                              {item.id.startsWith("sample-") && (
                                <span className="ml-2 text-xs px-1.5 py-0.5 bg-indigo-100 text-indigo-600 rounded-full">
                                  サンプル
                                </span>
                              )}
                            </span>
                            <button
                              onClick={(e) => deleteRecipient(item.id, e)}
                              className="text-xs px-1.5 py-0.5 text-red-500 hover:bg-red-50 rounded"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-2 border border-gray-200 rounded-md bg-gray-50 text-center">
                        <p className="text-sm text-gray-500">
                          保存された宛先がありません
                        </p>
                      </div>
                    )}
                  </div>
                )}

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
