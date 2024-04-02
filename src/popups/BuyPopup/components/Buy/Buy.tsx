import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { useQuery } from '@tanstack/react-query'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { fromNano } from 'ton-core'
import { ProjectSaleState } from 'api/types'
import { BuyFormValues } from 'popups/BuyPopup/BuyPopup'
import { getBalance } from 'utils/getBalance'
import * as S from './style'
import { SwitchBtn } from '../SwitchBtn/SwitchBtn'

const CHAIN_TABS: ['TON', 'ETH'] = ['TON', 'ETH']
const MIN_TOKEN = 1

type BuyProps = {
  setActiveChain: Dispatch<SetStateAction<'TON' | 'ETH'>>
  activeChain: 'TON' | 'ETH'
  project: any
  projectSaleState: ProjectSaleState
  buyFormState: BuyFormValues
  updateBuyFormState: (formState: BuyFormValues) => void
  errorMessage: string
  setErrorMessage: Dispatch<SetStateAction<string>>
}
export const Buy: FC<BuyProps> = (props) => {
  const {
    setActiveChain,
    activeChain,
    project,
    projectSaleState,
    buyFormState,
    updateBuyFormState,
    errorMessage,
    setErrorMessage,
  } = props

  const [tonStrValue, setTonStrValue] = useState(buyFormState.ton)
  const [tokenStrValue, setTokenStrValue] = useState(buyFormState.token)

  const handleSetTonStrValue = (e: ChangeEvent<HTMLInputElement>) => {
    // TON
    const value = e.target.value
    const cleanedValue = cleanStringValue(value)

    setTonStrValue(cleanedValue)
    handleSetValue('ton')(cleanedValue)
  }

  const handleSetTokenStrValue = (e: ChangeEvent<HTMLInputElement>) => {
    // XTON
    const value = e.target.value
    const cleanedValue = cleanStringValue(value)

    if (/^$|^\d+(\.\d{0,3})?$/.test(cleanedValue)) {
      setTokenStrValue(cleanedValue)
      handleSetValue('xton')(cleanedValue)
    }
  }

  const handleBlur = () => {
    if (tokenStrValue === '') {
      setTokenStrValue(MIN_TOKEN.toString())
      handleSetValue('xton')(MIN_TOKEN.toString())
    }
  }

  useEffect(() => {
    if (tonStrValue === '') {
      setErrorMessage('TON value is empty.')
    } else if (tokenStrValue === '') {
      setErrorMessage(`${project.symbol} is empty.`)
    } else if (+buyFormState.token > +fromNano(projectSaleState.maxBuy)) {
      setErrorMessage(`Maximum ${project.symbol} reached.`)
    } else if (+buyFormState.token < MIN_TOKEN) {
      setErrorMessage(
        `The minimum amount to buy ${project.symbol} is ${MIN_TOKEN}.`
      )
    } else if (userBalance && userBalance < +buyFormState.token * currentTokenPrice) {
      setErrorMessage('Not enough TON.')
    } else {
      setErrorMessage('')
    }
  }, [tonStrValue, tokenStrValue])

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


  const currentTokenPrice = useMemo(
    () => Number(fromNano(projectSaleState.price)),
    [projectSaleState.price]
  )

  const handleSetValue = (type: 'ton' | 'xton') => (newValue: string) => {
    switch (type) {
      case 'xton':
        const ton = formatNumber(
          Number((Number(newValue) * currentTokenPrice).toFixed(2)) + 0.1
        )

        updateBuyFormState({
          ton,
          token: formatNumber(+newValue, 3),
        })
        setTonStrValue(ton)
        break

      case 'ton':
        const token = formatNumber(
          +(Number(newValue) / currentTokenPrice).toFixed(2),
          3
        )

        updateBuyFormState({
          ton: formatNumber(Number(newValue) + 0.1),
          token,
        })

        setTokenStrValue(token)
        break
    }
  }

  const handleSetMax = () => {
    if (!userBalance) {
      return
    }

    setTokenStrValue(
      Number((Number(userBalance) / currentTokenPrice).toFixed(2)).toString()
    )

    setTonStrValue((Number(userBalance.toFixed(2)) + 0.1).toString())

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

      <div>
        <S.RecountBlock>
          <S.Input
            actionElement={<S.Chain children={project.symbol} />}
            className="ton-input"
            onBlur={handleBlur}
            onChange={handleSetTokenStrValue}
            type="number"
            value={tokenStrValue}
          />
          

          <S.InputWrapper>
            <S.Input
              actionElement={<S.Chain children="TON" />}
              onBlur={handleBlur}
              onChange={handleSetTonStrValue}
              type="text"
              value={tonStrValue}
              defaultValue={buyFormState.ton}
            />
            <S.Triangle />
          </S.InputWrapper>
        </S.RecountBlock>
        {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
      </div>

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
          children={`Min ${MIN_TOKEN} ${project.symbol}, Max ${fromNano(
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

export const convertStrToNumber = (str: string, minValue?: number) => {
  let cleanedStr = str

  cleanedStr = cleanedStr.replace(/^0\.$/, '0.')
  cleanedStr = cleanedStr.replace(/\.$/, '')

  if (cleanedStr.startsWith('.')) {
    cleanedStr = '0' + cleanedStr
  }

  // проверяет, если задано минимальное значение minValue и
  // очищенеё форма cleanedStr меньше минимального значения,
  // то устанавливает cleanedStr в минимальное значение.

  if (minValue !== undefined && +cleanedStr < minValue) {
    cleanedStr = minValue.toString()
  }

  return Number(cleanedStr.replace(/\s/g, ''))
}

export const cleanStringValue = (str: string): string => {
  let cleanedStr = str

  cleanedStr = cleanedStr.replace(/,/g, '.')
  cleanedStr = cleanedStr.replace(/[^\d.]/g, '') // удаляет все символы, кроме цифр и точек.

  // Заменяет только "0." на "0", сохраняя точку, если она присутствует.
  // Например, "0." заменяется на "0", а "0.96" остается без изменений.
  cleanedStr = cleanedStr.replace(/^0(\.)/, '0$1')

  // Удаляет ведущий ноль, если следующий символ не является нулем.
  // Например, "09" заменяется на "9", но "01" остается без изменений.
  cleanedStr = cleanedStr.replace(/^0(\d+)/, '$1')

  // Заменяет только "0." на "0", сохраняя точку, если она присутствует.
  // Например, "0." заменяется на "0", но "0.9" остается без изменений.
  cleanedStr = cleanedStr.replace(/^0\.$/, '0.')

  // Заменяет строку, состоящую только из нуля, на одиночный ноль.
  // Например, "00" заменяется на "0"
  cleanedStr = cleanedStr.replace(/^0$/, '0')

  // Удалить все точки, кроме первой
  const dotIndex = cleanedStr.indexOf('.')
  if (dotIndex !== -1) {
    cleanedStr =
      cleanedStr.slice(0, dotIndex + 1) +
      cleanedStr.slice(dotIndex + 1).replace(/\./g, '')
  }

  // cleanedStr = cleanedStr.replace(/\B(?=(\d{3})+(?!\d))/g, '');

  return cleanedStr // пример возвращаемого числа 1900000.
}

export const formatNumber = (number: number, decimalPlace = 6): string => {
  let formattedNumber = number.toFixed(decimalPlace).replace(/\.?0+$/, '') // Round to 6 decimal places and remove trailing zeros
  return formattedNumber === '0' ? '0' : formattedNumber // Check if the number is zero, return '0' if true
}
