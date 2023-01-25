import { Html, Head, Main, NextScript } from 'next/document';
import { Suspense } from 'react';

export default function Document() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    </Suspense>
  );
}
