import { Html, Head, Main, NextScript } from 'next/document';
import { Fragment, Suspense } from 'react';

export default function Document() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Html lang="en">
        <Head>
          <Fragment>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-YGY0QNVGZ2"></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
              
                gtag('config', 'G-YGY0QNVGZ2');
                `,
              }}
            ></script>
          </Fragment>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    </Suspense>
  );
}
