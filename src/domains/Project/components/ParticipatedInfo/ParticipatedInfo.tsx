import { FC, useMemo } from 'react'
import {
  StateFailed,
  StateInProgress,
  StateLocked,
  StateOnWallet,
  StateVested,
} from '@ton-and-company/sdk/dist/core/sdk'
import dayjs from 'dayjs'
import { Container } from 'ui/Container/Container'
import { SvgUnlock } from 'ui/icons'

import * as S from './style'

type ParticipiantProps = {
  participantState?:
    | StateInProgress
    | StateOnWallet
    | StateFailed
    | StateLocked
    | StateVested
  symbol: string
}

export const ParticipatedInfo: FC<ParticipiantProps> = (props) => {
  const { participantState, symbol } = props

  const currentInfoContent = useMemo(() => {
    if (!participantState) {
      return
    }

    switch (participantState.type) {
      case 'in-progress':
        return (
          <>
            <S.DescriptionWrapper>
              <SvgUnlock />
              <S.Description>
                {(Number(participantState.balance) / 1e9).toFixed(2)} ETH Locked
                by the end of Tokensale
              </S.Description>
            </S.DescriptionWrapper>
            <S.SaleProgressBlock>
              <S.SaleProgressTitle>Token sale progress:</S.SaleProgressTitle>
              <S.ProgressBarWrapper>
                <S.Label className="text-sm text-gray-light">
                  {2000000} ({30}%)
                </S.Label>
                <S.ProgressBar>
                  <S.ProgressLine width={30} />
                </S.ProgressBar>
              </S.ProgressBarWrapper>
            </S.SaleProgressBlock>
          </>
        )
      case 'on-wallet':
        return (
          <S.SaleProgressBlock>
            <S.TrxsWrapper>
              <S.TrxBlock>
                <S.TrxInfoWrapper>
                  <S.Label>&gt; 100 {symbol} (Price 0.1TON)</S.Label>
                  <S.DateLabel>2023-01-2 23:00 GMT</S.DateLabel>
                </S.TrxInfoWrapper>
                <S.TrxArrowIcon />
              </S.TrxBlock>
              <S.TrxBlock>
                <S.TrxInfoWrapper>
                  <S.Label>&gt; 100 ETH (Price 0.1TON)</S.Label>
                  <S.DateLabel>2023-01-2 23:00 GMT</S.DateLabel>
                </S.TrxInfoWrapper>
                <S.TrxArrowIcon />
              </S.TrxBlock>
            </S.TrxsWrapper>
          </S.SaleProgressBlock>
        )
      case 'locked':
        const lockedBalance =
          Number(participantState.balance - participantState.unlocked_balance) /
          1e9

        return (
          <S.DescriptionWrapper>
            <SvgUnlock />
            <S.Description>
              {lockedBalance.toFixed(2)} {symbol} Locked by the end of Tokensale
            </S.Description>
          </S.DescriptionWrapper>
        )
      case 'vested':
        const vestedBalance = Number(participantState.balance) / 1e9

        return (
          <>
            {!participantState.released && (
              <S.DescriptionWrapper>
                <SvgUnlock />
                <S.Description>
                  {vestedBalance.toFixed(2)}
                  ETH Locked by the end of Tokensale
                </S.Description>
              </S.DescriptionWrapper>
            )}
            <S.SaleProgressBlock>
              <S.SaleProgressTitle>
                Unlock schedule (Unlocked {participantState.claimed}/
                {participantState.count})
              </S.SaleProgressTitle>

              <S.TrxsWrapper>
                {participantState.txList.map((tx) => (
                  <S.TrxBlock>
                    <S.TrxLabelWrapper>
                      <S.PointCircle />

                      <S.TrxInfoWrapper>
                        <S.Label>
                          {Number(participantState.vest_portion) / 1e9} {symbol}{' '}
                          Unlocked
                        </S.Label>

                        <S.DateLabel>2023-01-2 23:00 GMT</S.DateLabel>
                      </S.TrxInfoWrapper>
                    </S.TrxLabelWrapper>

                    <S.TrxArrowIcon />
                  </S.TrxBlock>
                ))}
                {participantState.next_time && (
                  <S.TrxBlock disabled={true}>
                    <S.TrxLabelWrapper>
                      <S.PointCircle />

                      <S.TrxInfoWrapper>
                        <S.Label>
                          {Number(participantState.vest_portion) / 1e9} {symbol}{' '}
                          Unlocked
                        </S.Label>
                        <S.DateLabel>
                          {dayjs(participantState.next_time).toString()}
                        </S.DateLabel>
                      </S.TrxInfoWrapper>
                    </S.TrxLabelWrapper>
                  </S.TrxBlock>
                )}
              </S.TrxsWrapper>
            </S.SaleProgressBlock>
          </>
        )
      case 'failed':
        return (
          <S.SaleProgressBlock>
            <S.SaleProgressTitle>
              ICO Failed and Money is refunded (blockchain fees are deducted)
            </S.SaleProgressTitle>
            <S.Link href="#">Refund transaction link</S.Link>
          </S.SaleProgressBlock>
        )
    }
  }, [participantState, symbol])

  const currentBalance = useMemo(() => {
    switch (participantState?.type) {
      case 'locked':
      case 'in-progress':
        return '0.00'
      default:
        return (participantState as any).balance / 1e9
          ? (Number((participantState as any).balance) / 1e9).toFixed(2)
          : '0.00'
    }
  }, [participantState])

  return (
    <Container>
      <S.Wrapper>
        <S.Title>Participated info:</S.Title>
        <S.ParticipatedBlockWrapper>
          <S.BalanceWrapper>
            <S.Label>Balance</S.Label>
            <S.BalanceLabel>
              {currentBalance} {symbol}
            </S.BalanceLabel>
          </S.BalanceWrapper>
          <S.Line />
          <S.ContentWrapper>{currentInfoContent}</S.ContentWrapper>
        </S.ParticipatedBlockWrapper>
      </S.Wrapper>
    </Container>
  )
}
