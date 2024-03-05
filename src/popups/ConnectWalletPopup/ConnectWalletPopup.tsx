import { FC, ReactElement } from 'react'
import { useTonConnectUI } from '@tonconnect/ui-react'
import { useWeb3Modal } from '@web3modal/wagmi/react'
// import { useAccount } from 'wagmi'
import { SvgRightArrow, SvgToncoinIcon, SvgWalleticon } from 'ui/icons'

import { Modal } from 'ui/Modal/Modal'
import * as S from './style'

type ConnectWalletPopupProps = {
  onClose: (val: boolean) => void
  open: boolean
}

type WalletItemType = 'ton' | 'wallet_connect'

type WalletItemsProps = {
  svg: ReactElement
  title: string
  type: WalletItemType
}

const WALLET_ITEMS: WalletItemsProps[] = [
  {
    svg: <SvgToncoinIcon height={32} width={32} />,
    title: 'TON Connect',
    type: 'ton',
  },
  {
    svg: <SvgWalleticon />,
    title: 'WalletConnect',
    type: 'wallet_connect',
  },
]

export const ConnectWalletPopup: FC<ConnectWalletPopupProps> = (props) => {
  const { onClose, open } = props

  const [tonConnectUI] = useTonConnectUI()

  // const { address: walletConnectAddress } = useAccount()

  const { open: openWeb3Modal } = useWeb3Modal()

  const handleWalletClick = (walletType: WalletItemType) => {
    if (walletType === 'ton') {
      tonConnectUI.openModal()

      return
    }

    openWeb3Modal()
  }

  // useEffect(() => {
  //   if (open && walletConnectAddress) {
  //     onClose(false)
  //   }
  // }, [onClose, open, walletConnectAddress])

  return (
    <Modal onClose={onClose} open={open} title="Connect wallet">
      <S.Wrapper>
        {WALLET_ITEMS.map(({ svg, title, type }, idx) => (
          <S.ItemWrapper key={idx} onClick={() => handleWalletClick(type)}>
            <S.LeftBlock>
              {svg} {title}
            </S.LeftBlock>
            <S.RightBlock>
              <SvgRightArrow />
            </S.RightBlock>
          </S.ItemWrapper>
        ))}
      </S.Wrapper>
    </Modal>
  )
}
