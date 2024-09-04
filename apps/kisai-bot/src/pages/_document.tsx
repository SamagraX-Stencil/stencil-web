import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="manifest" id="manifest-file" />
        <meta name="theme-color" content="#fff" />
        <script />
      </Head>
      <body>
        <div id="modal_portal" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
