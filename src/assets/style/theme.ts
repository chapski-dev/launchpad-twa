import { DefaultTheme } from 'styled-components'

export const theme: DefaultTheme = {
  color: {
    bg: `var(--tg-theme-bg-color)`,
    text: `var(--tg-theme-text-color)`,
    hint: `var(--tg-theme-hint-color)`,
    link: `var(--tg-theme-link-color)`,
    btn: `var(--tg-theme-button-color)`,
    btnText: `var(--tg-theme-button-text-color)`,
    bgSecondary: `var(--tg-theme-secondary-bg-color)`,
    success: '#62c56d',
    warning: '#FBBC05',
  },
  gradient: {
    g1: 'linear-gradient(312deg, #82d3ff 0.46%, #ffa1ec 100%)',
    g2: 'linear-gradient(45deg, #fb73e0 0%, #0092e0 100%)',
  },
}
