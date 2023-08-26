import type { AppProps } from 'next/app'
import Header from '@/components/layout/header'

import '@/styles/global.css'
import Footer from '@/components/layout/footer'
import { ThemeProvider } from '@/components/theme-provider'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Header>
        <Footer>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Component {...pageProps} />
          </ThemeProvider>
        </Footer>
      </Header>
    </>
  )
}

export default MyApp
