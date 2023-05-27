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
        <Script src="/js/gif.js"strategy='lazyOnload'  />
        <Script src="//cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.11.6/dist/ffmpeg.min.js"strategy='lazyOnload'  />
      </body>
    </Html>
  );
}
