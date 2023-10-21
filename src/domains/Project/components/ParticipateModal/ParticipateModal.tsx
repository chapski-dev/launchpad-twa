import { ChangeEvent, FC, useCallback, useState } from 'react'
import { TnC } from '@ton-and-company/sdk'
import { useQuery } from 'react-query'
import { useProfileContext } from 'hooks/useProfileContext/useProfileContext'
import { SvgToncoinIcon } from 'ui/icons'
import { Modal } from 'ui/Modal/Modal'
import * as S from './style'

type ParticipateModalProps = {
  symbol: string
  onClose: () => void
  jettonImage: string
}

export const ParticipateModal: FC<ParticipateModalProps> = (props) => {
  const { symbol, onClose, jettonImage } = props

  const [currentJettonsBuyAmount, setCurrentJettonsBuyAmount] =
    useState<number>(0)
  const [currentJettonsBuyAmountTON, setCurrentJettonsBuyAmountTON] =
    useState<number>(0)

  const { balance } = useProfileContext()

  const {
    data: projectSideInfo,
    // isLoading: isProjectSideLoading,
    // isSuccess: isProjectSideLoaded,
  } = useQuery(['projectSideInfo'], () => TnC.projectInfo(1), {
    onSuccess: (data) => {
      setCurrentJettonsBuyAmount(data.minimumBuyToken)
      setCurrentJettonsBuyAmountTON(data.minimumBuyTON)
    },
  })

  const handleAmountInputChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      const { value: amountInputValue, name: amountInputName } = evt.target

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
            <S.Label>0.02 TON = $0.1</S.Label>
          </S.RateWrapper>
          <S.Label>
            Min {projectSideInfo?.minimumBuyTON} TON, Max{' '}
            {projectSideInfo?.maximumBuyTON} TON
          </S.Label>
        </S.AmountWrapper>
      </S.Wrapper>
    </Modal>
  )
}
