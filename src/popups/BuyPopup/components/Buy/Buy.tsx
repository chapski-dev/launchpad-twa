import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useTonAddress } from '@tonconnect/ui-react'
import { getBalance } from 'utils/getBalance'
import * as S from './style'
import { SwitchBtn } from '../SwitchBtn/SwitchBtn'

const CHAIN_TABS: ['TON', 'ETH'] = ['TON', 'ETH']
const TON_PRICE = 0.02
const MIN_TON = 20
const MAX_TON = 50

type BuyProps = {
  setActiveChain: Dispatch<SetStateAction<'TON' | 'ETH'>>
  activeChain: 'TON' | 'ETH'
  project: any
}
export const Buy: FC<BuyProps> = (props) => {
  const { setActiveChain, activeChain, project } = props

  const [formState, setFormState] = useState({
    ton: 1,
    xton: 4.5,
  })

  const userWalletAddress = useTonAddress()

  const { data: userBalance } = useQuery({
    queryKey: ['user-balance'],
    queryFn: () => getBalance(userWalletAddress, 'testnet'),
  })

  const handleSetValue =
    (type: 'ton' | 'xton') => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      console.log(type, value)
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
    if (!userBalance) {
      return
    }

    setFormState({
      xton: Number((Number(userBalance) * (1 / TON_PRICE)).toFixed(2)),
      ton: Number(userBalance.toFixed(2)),
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
          {!userBalance ? (
            '-.--'
          ) : (
            <S.Count>{userBalance.toFixed(2)} TON</S.Count>
          )}{' '}
          <S.MaxLink children="Max" onClick={handleSetMax} />
        </S.Balance>
      </S.AmountBlock>

      <S.RecountBlock>
        <S.Input
          actionElement={<S.Chain children={project.symbol} />}
          className="ton-input"
          max={Number(userBalance) * (1 / TON_PRICE)}
          onChange={handleSetValue('xton')}
          type="number"
          value={formState.xton}
        />

        <S.Input
          actionElement={<S.Chain children="TON" />}
          max={MAX_TON}
          min={MIN_TON}
          onChange={handleSetValue('ton')}
          type="number"
          value={formState.ton}
        />

        <S.Triangle />
      </S.RecountBlock>

      <S.WellBlock>
        <S.WellItem children={`1 ${project.symbol} = ${TON_PRICE} TON`} />
        <S.WellItem
          children={`${formState.ton} TON = $${(formState.ton * 5.55).toFixed(
            2
          )}`}
        />
      </S.WellBlock>

      <S.MinMaxBlock>
        <S.MinMaxItem children={`Min ${MIN_TON} TON, Max ${MAX_TON} TON`} />
      </S.MinMaxBlock>
      <S.TotalCost
        children={`Estimated Total Cost: ${formState.ton + 0.1} TON = $${(
          (formState.ton + 0.1) *
          5.55
        ).toFixed(2)}`}
      />
    </S.Wrapper>
  )
}
