import { FC, useEffect } from 'react'

const WebApp =
  typeof window !== 'undefined' ? (window as any).Telegram?.WebApp : undefined

interface MainButtonProps {
  disabled?: boolean
  progress?: boolean
  color?: string
  textColor?: string
  onClick: VoidFunction
  text: string
}

const mainButton = WebApp ? WebApp.MainButton : undefined
const { button_color, button_text_color } = WebApp?.themeParams || {}

export const MainButton: FC<MainButtonProps> = ({
  disabled,
  color,
  textColor,
  text,
  onClick,
  progress,
}) => {
  useEffect(() => {
    if (mainButton) {
      return () => {
        mainButton.hide()
        mainButton.enable()
        mainButton.hideProgress()
        mainButton.setParams({
          color: button_color,
          text_color: button_text_color,
        })
      }
    }
  }, [])

  useEffect(() => {
    if (mainButton) {
      if (typeof progress === 'boolean') {
        if (progress) {
          mainButton.showProgress()
          mainButton.disable()
        } else {
          mainButton.hideProgress()
        }
      }
      if (typeof disabled === 'boolean') {
        disabled || progress ? mainButton.disable() : mainButton.enable()
      }
    }
  }, [disabled, progress])

  useEffect(() => {
    if (mainButton && (color || textColor)) {
      mainButton.setParams({ color, text_color: textColor })
    }
  }, [color, textColor])

  useEffect(() => {
    if (mainButton) {
      if (text) {
        mainButton.setText(text)
        !mainButton.isVisible && mainButton.show()
      } else if (mainButton.isVisible) {
        mainButton.hide()
      }
    }
  }, [text])

  useEffect(() => {
    if (onClick && mainButton) {
      WebApp.MainButton.onClick(onClick)
      return () => {
        WebApp.MainButton.offClick(onClick)
      }
    }
  }, [onClick])

  return null
}
