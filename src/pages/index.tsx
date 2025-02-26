import Head from "next/head";
import { useEffect, useState } from "react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const [mounted, setMounted] = useState(false);

  // クライアントサイドレンダリングを確認するための処理
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>MailCraft AI - ビジネスメール最適化アシスタント</title>
        <meta
          name="description"
          content="AIを活用してプロフェッショナルなビジネスメールを簡単に作成できるツール"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <h1 className="text-3xl font-bold text-primary-700">MailCraft AI</h1>
        </div>
      </header>

      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="card mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              ビジネスメールを簡単に最適化
            </h2>
            <p className="text-gray-600 mb-6">
              伝えたい内容を入力するだけで、AIがプロフェッショナルなビジネスメールに変換します。
              丁寧さのレベルも調整可能です。
            </p>
            <div className="bg-primary-50 p-4 rounded-md border border-primary-100 mb-6">
              <p className="text-primary-800 text-sm">
                開発環境が正常に動作しています！
                {mounted ? (
                  <span className="font-medium">
                    {" "}
                    クライアントサイドレンダリングも確認できました。
                  </span>
                ) : (
                  <span> クライアントサイドレンダリングを確認中...</span>
                )}
              </p>
            </div>
            <div className="flex justify-end">
              <button className="btn btn-primary">はじめる</button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} MailCraft AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
