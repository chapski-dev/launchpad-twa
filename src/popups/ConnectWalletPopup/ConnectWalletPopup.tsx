import { FC, ReactElement } from 'react'
import { SvgRightArrow, SvgToncoinIcon, SvgWalleticon } from 'ui/icons'
import { Modal } from 'ui/Modal/Modal'
import * as S from './style'

type ConnectWalletPopupProps = {
  onClose: () => void
}

type WalletItemsProps = {
  svg: ReactElement
  title: string
}

const WALLET_ITEMS: WalletItemsProps[] = [
  {
    svg: <SvgToncoinIcon height={32} width={32} />,
    title: 'TON Connect',
  },
  {
    svg: <SvgWalleticon />,
    title: 'WalletConnect',
  },
]

export const ConnectWalletPopup: FC<ConnectWalletPopupProps> = ({
  onClose,
}) => {
  return (
    <Modal onClose={onClose} title="Connect wallet">
      <S.Wrapper>
        {WALLET_ITEMS.map(({ svg, title }, idx) => (
          <S.ItemWrapper key={idx}>
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
