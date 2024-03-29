import { ChangeEvent, Dispatch, FC, SetStateAction, useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { fromNano } from 'ton-core'
import { ProjectSaleState } from 'api/types'
import { BuyFormValues } from 'popups/BuyPopup/BuyPopup'
import { getBalance } from 'utils/getBalance'
import * as S from './style'
import { SwitchBtn } from '../SwitchBtn/SwitchBtn'

const CHAIN_TABS: ['TON', 'ETH'] = ['TON', 'ETH']
const MIN_TON = 1

type BuyProps = {
  setActiveChain: Dispatch<SetStateAction<'TON' | 'ETH'>>
  activeChain: 'TON' | 'ETH'
  project: any
  projectSaleState: ProjectSaleState
  buyFormState: BuyFormValues
  updateBuyFormState: (formState: BuyFormValues) => void
}
export const Buy: FC<BuyProps> = (props) => {
  const {
    setActiveChain,
    activeChain,
    project,
    projectSaleState,
    buyFormState,
    updateBuyFormState,
  } = props

  console.log(projectSaleState)

  const userWalletAddress = useTonAddress()

  const [tonConenctUI] = useTonConnectUI()

  const { data: userBalance } = useQuery({
    queryKey: ['user-balance', userWalletAddress, tonConenctUI],
    queryFn: () =>
      getBalance(
        userWalletAddress,
        tonConenctUI.account?.chain === '-239' ? 'mainnet' : 'testnet'
      ),
  })

  console.log(userBalance)

  const currentTokenPrice = useMemo(
    () => Number(fromNano(projectSaleState.price)),
    [projectSaleState.price]
  )

  const handleSetValue =
    (type: 'ton' | 'xton') => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      console.log(type, value)
      switch (type) {
        case 'xton':
          updateBuyFormState({
            ton: (
              Number((Number(value) * currentTokenPrice).toFixed(2)) + 0.1
            ).toString(),
            token: value,
          })
          break

        case 'ton':
          updateBuyFormState({
            ton: (Number(value) + 0.1).toString(),
            token: Number(
              (Number(value) / currentTokenPrice).toFixed(2)
            ).toString(),
          })
          break
      }
    }

  const handleSetMax = () => {
    if (!userBalance) {
      return
    }

    updateBuyFormState({
      token: Number(
        (Number(userBalance) / currentTokenPrice).toFixed(2)
      ).toString(),
      ton: (Number(userBalance.toFixed(2)) + 0.1).toString(),
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
          {typeof userBalance === 'undefined' ? (
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
          max={+fromNano(projectSaleState.maxBuy)}
          onChange={handleSetValue('xton')}
          type="number"
          value={buyFormState.token}
        />
        <S.Input
          actionElement={<S.Chain children="TON" />}
          max={
            +fromNano(projectSaleState.maxBuy) *
            +fromNano(projectSaleState.price)
          }
          // min={MIN_TON}
          onChange={handleSetValue('ton')}
          type="number"
          value={buyFormState.ton}
        />

        <S.Triangle />
      </S.RecountBlock>

      <S.WellBlock>
        <S.WellItem
          children={`1 ${project.symbol} = ${fromNano(
            projectSaleState.price
          )} TON`}
        />
        <S.WellItem
          children={`${buyFormState.ton} TON = $${(
            Number(buyFormState.ton) * 5.55
          ).toFixed(2)}`}
        />
      </S.WellBlock>

      <S.MinMaxBlock>
        <S.MinMaxItem
          children={`Min ${MIN_TON} ${project.symbol}, Max ${fromNano(
            projectSaleState.maxBuy
          )} ${project.symbol}`}
        />
      </S.MinMaxBlock>
      <S.TotalCost
        children={`Estimated Total Cost: ${
          Number(buyFormState.ton) + 0.1
        } TON = $${((Number(buyFormState.ton) + 0.1) * 5.55).toFixed(2)}`}
      />
    </S.Wrapper>
  )
}
