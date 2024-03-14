import Header from '@/components/layout/header'
import type { AppProps } from 'next/app'

import Footer from '@/components/layout/footer'
import ReduxProvider from '@/components/providers/reduxProvider'
import ThemeProvider from '@/components/providers/themeProvider'
import { Toaster as SonnerToaster } from '@/components/ui/sonner'
import { Toaster } from '@/components/ui/toaster'
import '@/styles/global.css'
import store from '../redux/store'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Header>
          <Footer>
            <Component {...pageProps} />
            <Toaster />
            <SonnerToaster />
          </Footer>
        </Header>
      </ThemeProvider>
    </ReduxProvider>
  )
}

export default MyApp
