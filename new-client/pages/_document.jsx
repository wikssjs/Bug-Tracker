import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
import Scripts from '../component/Scripts'

export default function Document() {
  return (
    <Html lang="en">
      <Head >
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
    <Scripts/>
      </Head>
      <body>
        <Main />
    
        <NextScript />

      </body>
    </Html>
  )
}
