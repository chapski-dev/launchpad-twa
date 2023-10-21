import { ChangeEvent, FC, useCallback, useRef, useState } from 'react'
import { TnC } from '@ton-and-company/sdk'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { useQuery } from 'react-query'
import { Address } from 'ton-core'
import { MainButton } from 'features/MainButton'
import { useProfileContext } from 'hooks/useProfileContext/useProfileContext'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { SvgToncoinIcon } from 'ui/icons'
import { Modal } from 'ui/Modal/Modal'
import { SuccessBlock } from './components'
import * as S from './style'

type ParticipateModalProps = {
  symbol: string
  onClose: () => void
  jettonImage: string
  icoParams: any
}

export const ParticipateModal: FC<ParticipateModalProps> = (props) => {
  const { symbol, onClose, jettonImage, icoParams } = props

  const [currentJettonsBuyAmount, setCurrentJettonsBuyAmount] =
    useState<number>(0)
  const [currentJettonsBuyAmountTON, setCurrentJettonsBuyAmountTON] =
    useState<number>(0)
  const [isTrxChecking, setIsTrxChecking] = useState<boolean>(false)
  const [isSuccessBlockDisplayed, setIsSuccessBlockDisplayed] =
    useState<boolean>(false)

  const { balance } = useProfileContext()

  const { webApp } = useTelegram()

  const [tonConnectUI] = useTonConnectUI()

  const userWalletAddress = useTonAddress()

  const jettonsInputRef = useRef<HTMLInputElement | null>(null)

  const {
    data: projectSideInfo,
    // isLoading: isProjectSideLoading,
    // isSuccess: isProjectSideLoaded,
  } = useQuery(['projectSideInfo'], () => TnC.projectInfo(1), {
    onSuccess: (data) => {
      setCurrentJettonsBuyAmount(data.maximumBuyToken)
      setCurrentJettonsBuyAmountTON(data.maximumBuyTON)

      if (jettonsInputRef.current) {
        jettonsInputRef.current.focus()
      }
    },
  })

  const buyJettons = useCallback(async () => {
    if (!icoParams || typeof balance === 'undefined' || !projectSideInfo) {
      return
    }

    console.log('tset')

    const trxMessage = await TnC.buyJettons(
      Address.parse(icoParams.address),
      Address.parse(userWalletAddress),
      BigInt(currentJettonsBuyAmount)
    )

    const deployParams = {
      validUntil: Date.now() + 100000,
      messages: [trxMessage],
    }

    const trx = await tonConnectUI.sendTransaction(deployParams)

    if (trx.boc) {
      setIsTrxChecking(true)

      let currentAttempts = 0

      const checkTransactionStatus = async () => {
        if (currentAttempts >= 5) {
          setIsTrxChecking(false)
          alert(
            'Exceeded maximum number of attempts to check your transaction.'
          )
          return
        }

        const result = await TnC.waitForBuyTx(trx.boc, currentAttempts)

        if (result.ready) {
          setIsTrxChecking(false)

          setIsSuccessBlockDisplayed(true)

          return

          //   router.push({
          //     pathname: AppRoutes.Complete,
          //     query: {
          //       symbol,
          //       amount: currentJettonsBuyAmount,
          //     },
          //   })
        } else {
          currentAttempts++

          setTimeout(checkTransactionStatus, 1000)
        }
      }

      checkTransactionStatus()
    }
  }, [
    balance,
    currentJettonsBuyAmount,
    icoParams,
    projectSideInfo,
    tonConnectUI,
    userWalletAddress,
  ])

  const handleBuyJettonsClick = useCallback(async () => {
    if (isSuccessBlockDisplayed) {
      onClose()

      return
    }

    if (typeof balance === 'undefined' || !projectSideInfo) {
      return
    }

    console.log('click')

    if (
      Math.floor(+balance) !== 0 &&
      +balance - 0.2 < currentJettonsBuyAmountTON
    ) {
      alert(`You don't have enough TON in your account to purchase ${symbol}`)
      return
    }

    if (Math.floor(+balance) !== 0) {
      buyJettons()

      return
    }

    if (+balance === 0) {
      setIsTrxChecking(true)

      const claimHash = await TnC.claimBonus(
        userWalletAddress,
        webApp?.initData
      )

      let currentClaimAttempts = 0

      const checkClaimTransactionStatus = async () => {
        if (currentClaimAttempts >= 5) {
          setIsTrxChecking(false)
          alert(
            'Exceeded maximum number of attempts to check your transaction.'
          )
          return
        }

        const result = await TnC.waitForTx(claimHash, currentClaimAttempts)

        if (result.ready) {
          buyJettons()
        } else {
          currentClaimAttempts++

          setTimeout(checkClaimTransactionStatus, 1000)
        }

        console.log(result)
      }

      checkClaimTransactionStatus()
    }
  }, [
    isSuccessBlockDisplayed,
    balance,
    projectSideInfo,
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

      if (!projectSideInfo) {
        return
      }

      if (isNaN(Number(amountInputValue))) {
        return
      }

      if (amountInputName === 'jetton') {
        setCurrentJettonsBuyAmount(Number(amountInputValue))
        setCurrentJettonsBuyAmountTON(
          Number(amountInputValue) * projectSideInfo.price
        )

        return
      }

      setCurrentJettonsBuyAmountTON(Number(amountInputValue))
      setCurrentJettonsBuyAmount(
        Number(amountInputValue) / projectSideInfo.price
      )
    },
    [projectSideInfo]
  )

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
                Balance: <S.Label isBold>{balance} TON</S.Label>
              </S.Label>
            </S.ContentHeaderWrapper>

            <S.InputsWrapper>
              <S.JettonInputContainer>
                <S.JettonInput
                  ref={jettonsInputRef}
                  disabled={isTrxChecking}
                  name="jetton"
                  onChange={handleAmountInputChange}
                  placeholder="50"
                  value={currentJettonsBuyAmount}
                />
                <S.JettonInputContentWrapper>
                  <S.JettonImageWrapper>
                    <S.JettonImage alt={'jetton_image'} src={jettonImage} />
                  </S.JettonImageWrapper>
                  <S.JettonSymbolLabel>{symbol}</S.JettonSymbolLabel>
                </S.JettonInputContentWrapper>
              </S.JettonInputContainer>

              <S.JettonInputContainer>
                <S.JettonInput
                  disabled={isTrxChecking}
                  name="ton"
                  onChange={handleAmountInputChange}
                  placeholder="4.5"
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
                1 {symbol} = {projectSideInfo?.price} TON
              </S.Label>
              <S.Label>
                {currentJettonsBuyAmountTON.toFixed(2)} TON = $
                {(currentJettonsBuyAmountTON * 2.13).toFixed(2)}
              </S.Label>
            </S.RateWrapper>
            <S.Label>
              Min {projectSideInfo?.minimumBuyTON} TON, Max{' '}
              {projectSideInfo?.maximumBuyTON} TON
            </S.Label>
          </S.AmountWrapper>
        </S.Wrapper>
      )}

      <MainButton
        onClick={handleBuyJettonsClick}
        progress={isTrxChecking}
        text={isSuccessBlockDisplayed ? 'Back to project' : 'Buy ' + symbol}
      />
    </Modal>
  )
}
