import type { AppProps } from 'next/app'
import Header from '@/components/layout/header'

import '@/styles/global.css'
import Footer from '@/components/layout/footer'
import ThemeProvider from '@/components/providers/themeProvider'
import ReduxProvider from '@/components/providers/reduxProvider'
import store from '../redux/store'
import { Toaster } from '@/components/ui/toaster'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Header>
          <Footer>
            <Component {...pageProps} />
            <Toaster />
          </Footer>
        </Header>
      </ThemeProvider>
    </ReduxProvider>
  )
}

export default MyApp
