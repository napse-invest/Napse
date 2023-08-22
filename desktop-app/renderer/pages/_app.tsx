import type { AppProps } from 'next/app'
import Header from '@/components/layout/header'

import '@/styles/global.css'
import Footer from '@/components/layout/footer'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Header>
        <Footer>
          <Component {...pageProps} />
        </Footer>
      </Header>
    </>
  )
}

export default MyApp
