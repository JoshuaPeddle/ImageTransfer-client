import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head > <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js" strategy='beforeInteractive'></Script>
      </body>
    </Html>
  );
}
