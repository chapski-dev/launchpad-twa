import { FC, useMemo, useState } from 'react'
import { MainButton } from 'features/MainButton'
import { Modal } from 'ui/Modal/Modal'
import {
  WaitingForApproval,
  Buy,
  Loader,
  SuccessBuy,
  JoinWaitlist,
} from './components'

type BuyStatus = 'buy' | 'loader' | 'waiting' | 'success' | 'join_waitlist'

type BuyPopupProps = {
  onClose: (val: boolean) => void
  open: boolean
  status?: BuyStatus
}

export const BuyPopup: FC<BuyPopupProps> = (props) => {
  const { onClose, open, status } = props

  const [currentStatus, setCurrentStatus] = useState<BuyStatus>(status || 'buy')

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
      case 'join_waitlist':
        return <JoinWaitlist />
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
      case 'join_waitlist':
        alert('You have been successfully added to the waiting list.')
        onClose(false)
        break
    }
  }

  return (
    <Modal
      onClose={() => {
        onClose(false)

        if (status !== 'join_waitlist') {
          setCurrentStatus('buy')
        }
      }}
      open={open}
      title="Buy XTON"
    >
      {currentBuyPopupState}
      {currentStatus !== 'success' && (
        <MainButton
          onClick={handleClick}
          text={
            currentStatus === 'buy'
              ? 'Buy XTON'
              : currentStatus === 'join_waitlist'
              ? 'Join Waitlist'
              : 'Check next state'
          }
        />
      )}
    </Modal>
  )
}
