import { ChangeEvent, FC, useState } from 'react'

import * as S from './style'
import { SwitchBtn } from '../SwitchBtn/SwitchBtn'

const CHAIN_TABS = ['TON', 'ETH']
const BALANCE = 100
const TON_PRICE = 0.02
const MIN_TON = 20
const MAX_TON = 50

export const Buy: FC = () => {
  const [activeChain, setActiveChain] = useState<string>('TON')

  const [formState, setFormState] = useState({
    ton: 1,
    xton: 4.5,
  })

  const handleSetValue =
    (type: 'ton' | 'xton') => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value

      switch (type) {
        case 'xton':
          setFormState({
            ton: Number((Number(value) * TON_PRICE).toFixed(2)),
            xton: Number(value),
          })
          break

        case 'ton':
          setFormState({
            ton: Number(value),
            xton: Number((Number(value) / TON_PRICE).toFixed(2)),
          })
          break
      }
    }

  const handleSetMax = () => {
    setFormState({
      xton: Number((Number(MAX_TON) * TON_PRICE).toFixed(2)),
      ton: MAX_TON,
    })
  }

  return (
    <S.Wrapper>
      <S.AllocationChainBlock>
        <S.Title children="Allocation Chain" />
        <SwitchBtn
          activeChain={activeChain}
          onChange={setActiveChain}
          tabs={CHAIN_TABS}
        />
      </S.AllocationChainBlock>
      <S.AmountBlock>
        <S.Title children="Amount" />
        <S.Balance>
          Balance: <S.Count>{BALANCE} TON</S.Count>{' '}
          <S.MaxLink children="Max" onClick={handleSetMax} />
        </S.Balance>
      </S.AmountBlock>

      <S.RecountBlock>
        <S.Input
          actionElement={<S.Chain children="TON" />}
          className="ton-input"
          max={MAX_TON}
          min={MIN_TON}
          onChange={handleSetValue('ton')}
          type="number"
          value={formState.ton}
        />

        <S.Input
          actionElement={<S.Chain children="XTON" />}
          max={Number(BALANCE) * TON_PRICE}
          onChange={handleSetValue('xton')}
          type="number"
          value={formState.xton}
        />
        <S.Triangle />
      </S.RecountBlock>

      <S.WellBlock>
        <S.WellItem children={`1 XTON = ${TON_PRICE} TON`} />
        <S.WellItem children={`${0.02} TON = $0.1}`} />
      </S.WellBlock>

      <S.MinMaxBlock>
        <S.MinMaxItem children={`Min ${MIN_TON} TON, Max ${MAX_TON} TON`} />
      </S.MinMaxBlock>
      <S.TotalCost children="Estimated Total Cost: 20.8 USDT + 0.03 ETH" />
    </S.Wrapper>
  )
}
