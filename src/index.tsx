import React from 'react'
import { AxiosError } from 'axios'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from 'assets/style/GlobalStyle'
import { theme } from 'assets/style/theme'
import { App } from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

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

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <GlobalStyle />
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
