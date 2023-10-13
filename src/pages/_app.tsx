import { AxiosError } from 'axios'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from 'styled-components'
import { TelegramProvider } from 'app/providers/TelegramProvider'
import { TonConnectProvider } from 'app/providers/TonConnectProvider'
import { GlobalStyle } from 'assets/style/GlobalStyle'
import { theme } from 'assets/style/theme'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
      onError: (err) => {
        if (err instanceof AxiosError) {
          console.log(`Ooops! ${err.name}: ${err.message}`)
        }
      },
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
      <QueryClientProvider client={queryClient}>
        <TonConnectProvider>
          <TelegramProvider>
            <ThemeProvider theme={theme}>
              <GlobalStyle />
              <Component {...pageProps} />
            </ThemeProvider>
          </TelegramProvider>
        </TonConnectProvider>
        <Script src="https://telegram.org/js/telegram-web-app.js" />
      </QueryClientProvider>
    </>
  )
}
