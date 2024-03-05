import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import { ThemeProvider } from 'styled-components'
import { ProfileProvider } from 'app/providers/ProfileProvider'
import { TelegramProvider } from 'app/providers/TelegramProvider'
import { WalletsConnectProvider } from 'app/providers/WalletsConnectProvider'
import { GlobalStyle } from 'assets/style/GlobalStyle'
import { theme } from 'assets/style/theme'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
    },
    mutations: {
      onError: (err) => {
        if (err instanceof AxiosError) {
          console.log(`Ooops! ${err.name}: ${err.message}`)
        }
      },
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta content="width=device-width, user-scalable=no" name="viewport" />
      </Head>
      <WalletsConnectProvider>
        <QueryClientProvider client={queryClient}>
          <TelegramProvider>
            <ProfileProvider>
              <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Component {...pageProps} />
              </ThemeProvider>
            </ProfileProvider>
          </TelegramProvider>
        </QueryClientProvider>
      </WalletsConnectProvider>
      <div id="portal"></div>
      <Script src="https://telegram.org/js/telegram-web-app.js" />
    </>
  )
}
