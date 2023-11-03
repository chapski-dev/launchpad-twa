import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { TnC } from '@ton-and-company/sdk'
import { ICOInfo } from '@ton-and-company/sdk/dist/core/sdk'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { useQuery } from 'react-query'
import { Address } from 'ton-core'
import { MainButton } from 'features/MainButton'
import { useProfileContext } from 'hooks/useProfileContext/useProfileContext'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { SvgToncoinIcon } from 'ui/icons'
import { Modal } from 'ui/Modal/Modal'
import { toHumanNumber } from 'utils/toHumanNumber'
import { SuccessBlock } from './components'
import * as S from './style'

type ParticipateModalProps = {
  symbol: string
  onClose: () => void
  jettonImage: string
  icoMasterAddress: string
  icoInfo: ICOInfo
}

export const ParticipateModal: FC<ParticipateModalProps> = (props) => {
  const { symbol, onClose, jettonImage, icoMasterAddress, icoInfo } = props

  const [currentJettonsBuyAmount, setCurrentJettonsBuyAmount] =
    useState<string>(() => toHumanNumber(icoInfo.maxParticipation))
  const [currentJettonsBuyAmountTON, setCurrentJettonsBuyAmountTON] =
    useState<string>(() =>
      (
        Number(toHumanNumber(icoInfo.maxParticipation)) * icoInfo.tonPerJetton
      ).toString()
    )

  const [isTrxChecking, setIsTrxChecking] = useState<boolean>(false)

  const [isSuccessBlockDisplayed, setIsSuccessBlockDisplayed] =
    useState<boolean>(false)

  const [isTrxSigning, setIsTrxSigning] = useState<boolean>(false)

  const { balance } = useProfileContext()

  const { webApp } = useTelegram()

  const [tonConnectUI] = useTonConnectUI()

  const userWalletAddress = useTonAddress()

  const jettonsInputRef = useRef<HTMLInputElement | null>(null)
  const tonInputRef = useRef<HTMLInputElement | null>(null)

  const { data: tonPrice } = useQuery(['currentTonPrice'], () => TnC.tonPrice())

  const { data: participantState, refetch: refetchParticipantState } = useQuery(
    ['participantState'],
    () => TnC.getParticipantState(userWalletAddress, icoMasterAddress),
    {
      enabled: Boolean(userWalletAddress) && Boolean(icoMasterAddress),
    }
  )

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const tonConnectTrxModal = document.getElementById('tc-widget-root')
      const tcRootElement = tonConnectTrxModal?.querySelector('tc-root')

      const handleTcRootChange = () => {
        if (isTrxSigning && !tcRootElement?.hasChildNodes()) {
          setIsTrxSigning(false)
        } else if (tcRootElement?.hasChildNodes()) {
          jettonsInputRef.current?.blur()
          tonInputRef.current?.blur()
          setIsTrxSigning(true)
        }
      }

      handleTcRootChange()

      tcRootElement?.addEventListener('DOMSubtreeModified', handleTcRootChange)

      return () => {
        tcRootElement?.removeEventListener(
          'DOMSubtreeModified',
          handleTcRootChange
        )
      }
    }
  }, [isTrxSigning])

  const buyJettons = useCallback(async () => {
    if (
      !icoMasterAddress ||
      typeof balance === 'undefined' ||
      !participantState
    ) {
      return
    }

    const trxMessage = participantState.participated
      ? await TnC.buyJettons(
          Address.parse(icoMasterAddress),
          Address.parse(userWalletAddress),
          BigInt(currentJettonsBuyAmountTON)
        )
      : await TnC.initUser(
          Address.parse(icoMasterAddress),
          (Number(currentJettonsBuyAmountTON) + 1).toString()
        )

    const deployParams = {
      validUntil: Date.now() + 100000,
      messages: [trxMessage],
    }

    setIsTrxSigning(true)
    const trx = await tonConnectUI.sendTransaction(deployParams)

    if (trx.boc) {
      setIsTrxSigning(false)

      setIsTrxChecking(true)

      let currentAttempts = 0

      const checkTransactionStatus = async () => {
        if (currentAttempts >= 4) {
          setIsTrxChecking(false)
          alert(
            'Exceeded maximum number of attempts to check your transaction.'
          )
          return
        }

        refetchParticipantState()

        if (participantState.participated) {
          setIsTrxChecking(false)

          setIsSuccessBlockDisplayed(true)

          return
        } else {
          currentAttempts++

          setTimeout(checkTransactionStatus, 7000)
        }
      }

      if (!isTrxChecking) {
        return
      }

      checkTransactionStatus()
    }

    setIsTrxSigning(false)
  }, [
    balance,
    currentJettonsBuyAmountTON,
    icoMasterAddress,
    participantState,
    refetchParticipantState,
    tonConnectUI,
    userWalletAddress,
    isTrxChecking,
  ])

  const handleBuyJettonsClick = useCallback(async () => {
    if (isSuccessBlockDisplayed) {
      onClose()

      return
    }

    if (typeof balance === 'undefined') {
      return
    }

    if (
      Math.floor(+balance) !== 0 &&
      Number(balance) - 0.2 < Number(currentJettonsBuyAmountTON)
    ) {
      alert(`You don't have enough TON in your account to purchase ${symbol}`)
      return
    }

    if (Math.floor(+balance) !== 0) {
      buyJettons()

      return
    }

    const checkUserBonusData = await TnC.checkBonus(userWalletAddress)

    if (+balance === 0 && !checkUserBonusData.requested) {
      setIsTrxChecking(true)

      const claimBonusData = await TnC.claimBonus(
        userWalletAddress,
        webApp?.initData
      )

      if (claimBonusData.ok) {
        setIsTrxChecking(false)

        buyJettons()
      }

      let currentClaimAttempts = 0

      const checkClaimTransactionStatus = async () => {
        if (currentClaimAttempts >= 4) {
          setIsTrxChecking(false)
          alert(
            'Exceeded maximum number of attempts to check your transaction.'
          )
          return
        }

        const result = await TnC.checkBonus(userWalletAddress)

        if (result.got) {
          buyJettons()
        } else {
          currentClaimAttempts++

          setTimeout(checkClaimTransactionStatus, 12000)
        }
      }

      checkClaimTransactionStatus()
    }
  }, [
    isSuccessBlockDisplayed,
    balance,
    currentJettonsBuyAmountTON,
    onClose,
    symbol,
    buyJettons,
    userWalletAddress,
    webApp?.initData,
  ])

  const handleAmountInputChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      let { value: amountInputValue, name: amountInputName } = evt.target

      if (isNaN(Number(amountInputValue))) {
        return
      }

      if (amountInputName === 'jetton') {
        setCurrentJettonsBuyAmount(
          amountInputValue.length > 6
            ? Number(amountInputValue).toFixed(2)
            : amountInputValue
        )
        setCurrentJettonsBuyAmountTON(
          `${Number(amountInputValue) * icoInfo.tonPerJetton}`.length > 6
            ? (Number(amountInputValue) * icoInfo.tonPerJetton).toFixed(2)
            : `${Number(amountInputValue) * icoInfo.tonPerJetton}`
        )

        return
      }

      setCurrentJettonsBuyAmountTON(
        amountInputValue.length > 6
          ? Number(amountInputValue).toFixed(2)
          : amountInputValue
      )
      setCurrentJettonsBuyAmount(
        `${Number(amountInputValue) / icoInfo.tonPerJetton}`.length > 6
          ? (Number(amountInputValue) / icoInfo.tonPerJetton).toFixed(2)
          : `${Number(amountInputValue) / icoInfo.tonPerJetton}`
      )
    },
    [icoInfo]
  )

  const currentBalance = useMemo(() => {
    if (typeof balance === 'undefined') {
      return '--'
    }

    return Math.floor(+balance) === 0 ? '3.00' : Number(balance).toFixed(2)
  }, [balance])

  return (
    <Modal onClose={onClose} title={`Buy ${symbol} jettons`}>
      {isSuccessBlockDisplayed ? (
        <SuccessBlock amount={currentJettonsBuyAmount} symbol={symbol} />
      ) : (
        <S.Wrapper>
          <S.AmountWrapper>
            <S.ContentHeaderWrapper>
              <S.Label isBold>Amount</S.Label>
              <S.Label>
                Balance:{' '}
                <S.Label isBold>
                  {currentBalance}
                  TON
                </S.Label>
              </S.Label>
            </S.ContentHeaderWrapper>

            <S.InputsWrapper>
              <S.JettonInputContainer>
                <S.JettonInput
                  ref={jettonsInputRef}
                  autoFocus
                  disabled={isTrxChecking}
                  inputMode="numeric"
                  max={Number(toHumanNumber(icoInfo.maxParticipation))}
                  min={Number(toHumanNumber(icoInfo.minParticipation))}
                  name="jetton"
                  onChange={handleAmountInputChange}
                  placeholder="50"
                  type="number"
                  value={currentJettonsBuyAmount}
                />
                <S.JettonInputContentWrapper>
                  <S.JettonImageWrapper>
                    <S.JettonImage alt={'jetton_image'} src={jettonImage} />
                  </S.JettonImageWrapper>
                </S.JettonInputContentWrapper>
              </S.JettonInputContainer>

              <S.JettonInputContainer>
                <S.JettonInput
                  ref={tonInputRef}
                  disabled={isTrxChecking}
                  inputMode="numeric"
                  max={
                    Number(toHumanNumber(icoInfo.maxParticipation)) *
                    icoInfo.tonPerJetton
                  }
                  min={
                    Number(toHumanNumber(icoInfo.minParticipation)) *
                    icoInfo.tonPerJetton
                  }
                  name="ton"
                  onChange={handleAmountInputChange}
                  placeholder="4.5"
                  type="number"
                  value={currentJettonsBuyAmountTON}
                />
                <S.JettonInputContentWrapper>
                  <S.JettonImageWrapper>
                    <SvgToncoinIcon />
                  </S.JettonImageWrapper>
                </S.JettonInputContentWrapper>
              </S.JettonInputContainer>
            </S.InputsWrapper>

            <S.RateWrapper>
              <S.Label>
                1 {symbol} = {icoInfo.tonPerJetton} TON
              </S.Label>
              <S.Label>
                {Number(currentJettonsBuyAmountTON).toFixed(2)} TON = $
                {tonPrice
                  ? (Number(currentJettonsBuyAmountTON) * +tonPrice).toFixed(2)
                  : '0.00'}
              </S.Label>
            </S.RateWrapper>
            <S.RateWrapper>
              <S.Label>
                Min {toHumanNumber(icoInfo.minParticipation)} {symbol}, Max{' '}
                {toHumanNumber(icoInfo.maxParticipation)} {symbol}
              </S.Label>
              <S.Label>Max TX cost = 0.85 TON</S.Label>
            </S.RateWrapper>
          </S.AmountWrapper>
        </S.Wrapper>
      )}

      {!isTrxSigning && (
        <MainButton
          onClick={handleBuyJettonsClick}
          progress={isTrxChecking}
          text={isSuccessBlockDisplayed ? 'Back to project' : 'Buy ' + symbol}
        />
      )}
    </Modal>
  )
}
