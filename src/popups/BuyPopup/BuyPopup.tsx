import { FC, useState } from 'react'
import { MainButton } from 'features/MainButton'
import { Modal } from 'ui/Modal/Modal'
import { SwithBtn } from './components/SwithBtn/SwithBtn'
import * as S from './style'

type BuyPopupProps = {
  onClose: () => void
  open: boolean
}

const CHAIN_TABS = ['TON', 'ETH']

export const BuyPopup: FC<BuyPopupProps> = (props) => {
  const { onClose, open } = props

  const [activeChain, setActiveChain] = useState<string>('TON')

  return (
    <Modal onClose={onClose} open={open} title="Buy XTON">
      <S.Wrapper>
        <S.AllocationChainBlock>
          <S.Title>Allocation Chain</S.Title>
          <SwithBtn
            activeChain={activeChain}
            onChange={setActiveChain}
            tabs={CHAIN_TABS}
          />
        </S.AllocationChainBlock>
        <S.AmountBlock>
          <S.Title>Amount</S.Title>
          <S.Balance>
            Balance: <S.Count>{}100 TON </S.Count>
            <S.MaxLink>Max</S.MaxLink>
          </S.Balance>
        </S.AmountBlock>
        <S.RecountBlock>
          <S.TonCountBox>
            <S.TonCount>{}1</S.TonCount>
            <S.Chain>TON</S.Chain>
          </S.TonCountBox>
          <S.XTonCountBox>
            <S.XTonCount>{}4.5</S.XTonCount>
            <S.Chain>XTON</S.Chain>
            <S.Triangle />
          </S.XTonCountBox>
        </S.RecountBlock>
        <S.WellBlock>
          <S.WellItem>1 XTON = {}0.02 TON</S.WellItem>
          <S.WellItem>0.02 TON = {}$0.1</S.WellItem>
        </S.WellBlock>
        <S.MinMaxBlock>
          <S.MinMaxItem>Min {}20 TON,</S.MinMaxItem>
          <S.MinMaxItem> Max {}50 TON</S.MinMaxItem>
        </S.MinMaxBlock>
        <S.TotalCost>
          Estimated Total Cost: {}20.8 USDT + {}0.03 ETH
        </S.TotalCost>
      </S.Wrapper>
      <MainButton onClick={() => alert('BUY XTON')} text="BUY XTON" />
    </Modal>
  )
}
