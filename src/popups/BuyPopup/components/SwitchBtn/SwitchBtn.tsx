import { FC } from 'react'
import * as S from './style'

type SwithBtnProps = {
  activeChain: string
  onChange: (tab: 'TON' | 'ETH') => void
  className?: string
  tabs: ['TON', 'ETH']
}

export const SwitchBtn: FC<SwithBtnProps> = (props) => {
  const { activeChain, onChange, className, tabs } = props

  return (
    <S.ToggleWrapper>
      <S.ToggleItem className={className}>
        {tabs.map((tab, idx) => (
          <S.ActiveToggleBtn
            key={idx}
            $isActive={activeChain === tab}
            onClick={() => onChange(tab)}
          >
            {tab}
          </S.ActiveToggleBtn>
        ))}
      </S.ToggleItem>
    </S.ToggleWrapper>
  )
}
