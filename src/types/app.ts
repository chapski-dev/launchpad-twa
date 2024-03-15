import { FC, PropsWithChildren } from 'react'
import { BlockpassKYCConnect, BlockpassKYCConnectOptions } from './BlockpassKYCConnect';
import { Telegram } from './telegram';

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
      success: string
      warning: string
      white: string
      black: string
      redAlert: string
      pink: string
    }
    gradient: {
      g1: string
      g2: string
    }
  }
}

declare global {
  interface Window {
    Telegram: Telegram;
    BlockpassKYCConnect: {
      new (clientId: string, options?: BlockpassKYCConnectOptions): BlockpassKYCConnect;
    };
  }
}


export type FCWithChildren<T = {}> = FC<PropsWithChildren<T>>
