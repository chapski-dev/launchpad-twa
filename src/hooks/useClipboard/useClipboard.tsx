import { useCallback } from 'react'

export const useClipboard = () => {
  return useCallback(async (text: string, cb: () => void) => {
    await navigator.clipboard.writeText(text)
    cb()
  }, [])
}
