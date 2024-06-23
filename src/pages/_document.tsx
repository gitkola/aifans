import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-800">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
