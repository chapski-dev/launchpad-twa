import { ReactElement, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FCWithChildren } from 'types/app'
import * as S from './style'

type ModalProps = {
  className?: string
  onClose: (open: boolean) => void
  title: string | ReactElement
  open: boolean;
}

const PORTAL_TARGET = 'portal'

const portalElement =
  typeof document !== 'undefined' &&
  (document.getElementById(PORTAL_TARGET) as HTMLElement)

export const Modal: FCWithChildren<ModalProps> = (props) => {
  const { children, className, onClose, title, open } = props

  const [mounted, setMounted] = useState(false);

  const handleClose = useCallback(() => {
    setMounted(false);
    setTimeout(() => onClose(false), 450);
  }, [onClose]);

  useEffect(() => {
    if (open) {
      setMounted(true);
    }
  }, [open]);


  const handleKeyDown = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === 'Escape') {
        handleClose();
      }
    },
    [handleClose]
  )

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  if (!open) return null

  if (portalElement) {
    return createPortal(
      <>
        <S.Overlay
          className={mounted ? `open` : ''}
          onClick={handleClose}
        />
        <S.Modal className={className}>
          <S.Header>
            <S.Title>{title}</S.Title>
            <S.Close onClick={handleClose} />
          </S.Header>
          {children}
        </S.Modal>
      </>,
      portalElement
    )
  }

}
