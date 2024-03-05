import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useQuery } from '@tanstack/react-query'
import { TnC } from '@ton-and-company/sdk'
import {
  ICOInfo,
  ParticipantFullInfo,
} from '@ton-and-company/sdk/dist/core/sdk'
import { useTonAddress } from '@tonconnect/ui-react'
import { Address } from 'ton-core'
import { MainButton } from 'features/MainButton'
import { useProfileContext } from 'hooks/useProfileContext/useProfileContext'
import { useSendTransaction } from 'hooks/useSendTransaction/useSendTransaction'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { SvgToncoinIcon } from 'ui/icons'
import { Modal } from 'ui/Modal/Modal'
import { toHumanNumber } from 'utils/toHumanNumber'
import { SuccessBlock } from './components'
import * as S from './style'

type ParticipateModalProps = {
  symbol: string
  onClose: (open: boolean) => void
  jettonImage: string
  icoMasterAddress: string
  icoInfo: ICOInfo
  participantState?: ParticipantFullInfo
  refetchProjectParticipantInfo: () => void
  open: boolean
}

export const ParticipateModal: FC<ParticipateModalProps> = (props) => {
  const {
    symbol,
    onClose,
    jettonImage,
    icoMasterAddress,
    icoInfo,
    participantState,
    refetchProjectParticipantInfo,
    open,
  } = props

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

  const { balance, refetchProfileBalance } = useProfileContext()

  const { webApp } = useTelegram()

  const { sendTransaction } = useSendTransaction()

  const userWalletAddress = useTonAddress()

  const jettonsInputRef = useRef<HTMLInputElement | null>(null)
  const tonInputRef = useRef<HTMLInputElement | null>(null)

  const { data: tonPrice } = useQuery({
    queryKey: ['currentTonPrice'],
    queryFn: () => TnC.tonPrice(),
  })

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
          (
            Number(currentJettonsBuyAmountTON) +
            Number(toHumanNumber(icoInfo.protocolFee))
          ).toString()
        )

    setIsTrxSigning(true)
    const trx = await sendTransaction(trxMessage)

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

        const newParticipantState = await TnC.getParticipantState(
          userWalletAddress,
          icoMasterAddress
        )

        if (newParticipantState.participated) {
          setIsTrxChecking(false)

          setIsSuccessBlockDisplayed(true)

          refetchProjectParticipantInfo()

          refetchProfileBalance!()

          return
        } else {
          currentAttempts++

          setTimeout(checkTransactionStatus, 7000)
        }
      }

      checkTransactionStatus()
    }

    setIsTrxSigning(false)
  }, [
    icoMasterAddress,
    balance,
    participantState,
    userWalletAddress,
    currentJettonsBuyAmountTON,
    icoInfo.protocolFee,
    sendTransaction,
    refetchProjectParticipantInfo,
    refetchProfileBalance,
  ])

  const handleBuyJettonsClick = useCallback(async () => {
    if (isSuccessBlockDisplayed) {
      onClose(false)

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

      await TnC.claimBonus(userWalletAddress, webApp?.initData)

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

      const { tonPerJetton } = icoInfo

      if (amountInputName === 'jetton') {
        setCurrentJettonsBuyAmount(
          amountInputValue.length > 6
            ? Number(amountInputValue).toFixed(2)
            : amountInputValue
        )
        setCurrentJettonsBuyAmountTON(
          `${Number(amountInputValue) * tonPerJetton}`.length > 6
            ? (Number(amountInputValue) * tonPerJetton).toFixed(2)
            : `${Number(amountInputValue) * tonPerJetton}`
        )

        return
      }

      setCurrentJettonsBuyAmountTON(
        amountInputValue.length > 6
          ? Number(amountInputValue).toFixed(2)
          : amountInputValue
      )
      setCurrentJettonsBuyAmount(
        `${Number(amountInputValue) / tonPerJetton}`.length > 6
          ? (Number(amountInputValue) / tonPerJetton).toFixed(2)
          : `${Number(amountInputValue) / tonPerJetton}`
      )
    },
    [icoInfo]
  )

  const currentBalance = useMemo(() => {
    if (typeof balance === 'undefined') {
      return '--'
    }

    return Math.floor(+balance) === 0 ? '10.00' : Number(balance).toFixed(2)
  }, [balance])

  return (
    <Modal onClose={onClose} open={open} title={`Buy ${symbol} jettons`}>
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
              <S.Label>{`Max TX cost = ${toHumanNumber(
                icoInfo.protocolFee
              )} TON`}</S.Label>
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
