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
import { SvgLockFlat } from 'ui/icons'

import {
  TransactionBlock,
  LockTransactionBlock,
  ProgressBlock,
} from './components'
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
              <S.Description isLock>
                {(Number(participantState.balance) / 1e9).toFixed(2)} {symbol}{' '}
                Locked by the end of Tokensale
              </S.Description>
            </S.DescriptionWrapper>
            <S.SaleProgressBlock>
              <S.SaleProgressTitleWrapper>
                <S.SaleProgressTitle>Token sale progress:</S.SaleProgressTitle>
              </S.SaleProgressTitleWrapper>
              <S.TrxLine />
              <S.SaleProgressBlock>
                <ProgressBlock
                  amount={20000}
                  maxAmount={100000}
                  minAmount={60000}
                />
              </S.SaleProgressBlock>
            </S.SaleProgressBlock>
          </>
        )
      case 'on-wallet':
        return (
          <S.SaleProgressBlock>
            <S.TrxsWrapper>
              <TransactionBlock
                amount="100"
                date="2023-01-2 23:00 GMT"
                rate="0.1"
                symbol={symbol}
              />
              <S.TrxLine />
              <TransactionBlock
                amount="100"
                date="2023-01-2 23:00 GMT"
                rate="0.1"
                symbol={symbol}
              />
            </S.TrxsWrapper>
          </S.SaleProgressBlock>
        )
      case 'locked':
        return (
          <S.DescriptionWrapper>
            <SvgLockFlat />
            <S.Description isLock>
              {(Number(participantState.balance) / 1e9).toFixed(2)} {symbol}{' '}
              Locked by the end of Tokensale
            </S.Description>
          </S.DescriptionWrapper>
        )
      case 'vested':
        // const vestedBalance = Number(participantState.balance) / 1e9

        return (
          <>
            {/* {!participantState.released && (
              <S.DescriptionWrapper>
                <SvgUnlock />
                <S.Description>
                  {vestedBalance.toFixed(2)}
                  ETH Locked by the end of Tokensale
                </S.Description>
              </S.DescriptionWrapper>
            )} */}
            <S.SaleProgressBlock>
              <S.SaleProgressTitleWrapper>
                <S.SaleProgressTitle>Unlock schedule</S.SaleProgressTitle>
                <S.SaleProgressChip>
                  Unlocked {participantState.claimed}/{participantState.count}
                </S.SaleProgressChip>
              </S.SaleProgressTitleWrapper>
              <S.TrxLine />
              {participantState.next_time && (
                <S.DescriptionWrapper>
                  <S.Description>
                    Next Part will unlock on{' '}
                    <span style={{ fontWeight: 700 }}>2023-01-2 23:00 GMT</span>
                  </S.Description>
                </S.DescriptionWrapper>
              )}
            </S.SaleProgressBlock>

            <S.SaleProgressBlock>
              <S.TrxsWrapper>
                {participantState.txList.map((tx) => (
                  <LockTransactionBlock
                    key={tx.hash}
                    amount={(
                      Number(participantState.vest_portion) / 1e9
                    ).toFixed(2)}
                    date={dayjs(tx.date).toString()}
                    isLocked={false}
                    symbol={symbol}
                  />
                ))}
              </S.TrxsWrapper>
            </S.SaleProgressBlock>
            {/* TODO: после обновления sdk переделать */}
            <S.SaleProgressBlock>
              <S.TrxsWrapper>
                {participantState.next_time && (
                  <LockTransactionBlock
                    amount={(
                      Number(participantState.vest_portion) / 1e9
                    ).toFixed(2)}
                    date={'2023-01-2 23:00 GMT'}
                    isLocked={true}
                    symbol={symbol}
                  />
                )}
              </S.TrxsWrapper>
            </S.SaleProgressBlock>
          </>
        )
      case 'failed':
        return (
          <>
            <S.SaleProgressBlock>
              <S.SaleProgressTitleWrapper>
                <S.SaleProgressTitle>Token sale failed</S.SaleProgressTitle>
              </S.SaleProgressTitleWrapper>
              <S.TrxLine />
              <S.SaleProgressBlock>
                <ProgressBlock
                  amount={20000}
                  isFailed
                  maxAmount={100000}
                  minAmount={60000}
                />
              </S.SaleProgressBlock>
              <S.TrxLine />
              <TransactionBlock
                amount={(Number(participantState.refundAmount) / 1e9).toFixed(
                  2
                )}
                date="2023-01-2 23:00 GMT"
                isRefund
                rate="0.1"
                symbol={symbol}
              />
            </S.SaleProgressBlock>
          </>
        )
    }
  }, [participantState, symbol])

  const currentBalance = useMemo(() => {
    switch (participantState?.type) {
      case 'locked':
        return (participantState as any).unlocked_balance
          ? (Number((participantState as any).unlocked_balance) / 1e9).toFixed(
              2
            )
          : '0.00'
      case 'in-progress':
        return '0.00'
      default:
        return (participantState as any).balance
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
