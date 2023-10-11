import { FC, PropsWithChildren } from 'react'

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      bg: string
      bgSecondary: string
      text: string
      hint: string
      link: string
      btn: string
      btnText: string
    }
  }
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}

export type FCWithChildren<T = {}> = FC<PropsWithChildren<T>>
