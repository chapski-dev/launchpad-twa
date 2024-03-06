import { FC, useMemo, useState } from 'react'
import { MainButton } from 'features/MainButton'
import { Modal } from 'ui/Modal/Modal'
import { WaitingForApproval, Buy, Loader, SuccessBuy } from './components'

type BuyStatus = 'buy' | 'loader' | 'waiting' | 'success'

type BuyPopupProps = {
  onClose: (val: boolean) => void
  open: boolean
}

export const BuyPopup: FC<BuyPopupProps> = (props) => {
  const { onClose, open } = props

  const [currentStatus, setCurrentStatus] = useState<BuyStatus>('buy')

  const currentBuyPopupState = useMemo(() => {
    switch (currentStatus) {
      case 'buy':
        return <Buy />
      case 'loader':
        return <Loader />
      case 'waiting':
        return <WaitingForApproval />
      case 'success':
        return <SuccessBuy count={'42.214'} />
      default:
        return <Buy />
    }
  }, [currentStatus])

  const handleClick = () => {
    switch (currentStatus) {
      case 'buy':
        setCurrentStatus('loader')
        break
      case 'loader':
        setCurrentStatus('waiting')
        break
      case 'waiting':
        setCurrentStatus('success')
        break
    }
  }

  return (
    <Modal
      onClose={() => {
        onClose(false)

        setCurrentStatus('buy')
      }}
      open={open}
      title="Buy XTON"
    >
      {currentBuyPopupState}
      {currentStatus !== 'success' && (
        <MainButton
          onClick={handleClick}
          text={currentStatus === 'buy' ? 'Buy XTON' : 'Check next state'}
        />
      )}
    </Modal>
  )
}
