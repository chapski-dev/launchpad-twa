import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta content="width=device-width, user-scalable=no" name="viewport" />
      </Head>
      <body className="bg-gray-dark-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
