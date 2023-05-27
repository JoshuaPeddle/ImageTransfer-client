import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head > 
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script src="whammy.js" strategy='afterInteractive'></Script>
      </body>
    </Html>
  );
}
