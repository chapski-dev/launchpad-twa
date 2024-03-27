import { FC, useState } from 'react'
import { SvgToncoinIcon, SvgWalletImg } from 'ui/icons'
import * as S from './style'
import { SwitchBtn } from '../SwitchBtn/SwitchBtn'

const CHAIN: ['TON', 'ETH'] = ['TON', 'ETH']

export const JoinWaitlist: FC = () => {
  const [activeChain, setActiveChain] = useState<string>('TON')

  return (
    <S.Wrapper>
      <S.Chain>
        <S.Title>Source Chain</S.Title>
        <SwitchBtn
          activeChain={activeChain}
          onChange={setActiveChain}
          tabs={CHAIN as any}
        />
      </S.Chain>
      <S.WalletBlock>
        <S.WalletInfo>
          <S.NameBlock>
            <SvgWalletImg />
            Connected Wallet
          </S.NameBlock>
          <S.WalletAddressBlock>
            <SvgToncoinIcon />
            {} FG4Y...FW42
          </S.WalletAddressBlock>
        </S.WalletInfo>
        <S.Description>
          You will be joining waitlist with the specified wallet and you can
          only buy with it, if ti’s wrong, go back and change it.
        </S.Description>
      </S.WalletBlock>
    </S.Wrapper>
  )
}
