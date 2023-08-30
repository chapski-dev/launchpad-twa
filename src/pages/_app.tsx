import { useEffect } from 'react'
import { AxiosError } from 'axios'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from 'assets/style/GlobalStyle'
import { theme } from 'assets/style/theme'
import { useTelegram } from 'hooks/useTelegram/useTelegram'

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
  const tgOptions = useTelegram()

  useEffect(() => {
    if (tgOptions?.tg) {
      tgOptions.tg.ready()
    }
  }, [tgOptions])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
      <Script src="https://telegram.org/js/telegram-web-app.js" />
    </QueryClientProvider>
  )
}
