import { FC, useMemo } from 'react'
import { ParticipantFullInfo } from '@ton-and-company/sdk/dist/core/sdk'
import dayjs from 'dayjs'
import { Container } from 'ui/Container/Container'
import { SvgLockFlat } from 'ui/icons'
import { toHumanNumber } from 'utils/toHumanNumber'

import {
  TransactionBlock,
  LockTransactionBlock,
  ProgressBlock,
} from './components'
import * as S from './style'

type ParticipiantProps = {
  participantState: ParticipantFullInfo
  symbol: string
  icoMasterAddress: string
}

const ParticipantStatusDictionary = {
  0: 'on-wallet',
  1: 'locked-end-ico',
  2: 'locked-by-time',
  3: 'vested',
} as const

export const ParticipatedInfo: FC<ParticipiantProps> = (props) => {
  const { participantState, symbol } = props

  const tranformedParticipantStatus = useMemo(() => {
    return ParticipantStatusDictionary[
      participantState.distribution_mode as keyof typeof ParticipantStatusDictionary
    ]
  }, [participantState.distribution_mode])

  const currentInfoContent = useMemo(() => {
    if (!participantState) {
      return
    }

    if (participantState.sale_state.state === 'failed') {
      return (
        <>
          <S.SaleProgressBlock>
            <S.SaleProgressTitleWrapper>
              <S.SaleProgressTitle>Token sale failed</S.SaleProgressTitle>
            </S.SaleProgressTitleWrapper>
            <S.TrxLine />
            <S.SaleProgressBlock>
              <ProgressBlock
                amount={toHumanNumber(
                  BigInt(participantState.sale_state.supplied)
                )}
                isFailed
                maxAmount={toHumanNumber(
                  BigInt(participantState.sale_state.totalSupply)
                )}
                minAmount={toHumanNumber(
                  BigInt(participantState.sale_state.softCap)
                )}
              />
            </S.SaleProgressBlock>
            <S.TrxLine />

            {participantState.refund_tx && (
              <TransactionBlock
                hash={participantState.refund_tx.hash}
                amount={toHumanNumber(
                  BigInt(participantState.refund_tx.ton_value)
                )}
                date={dayjs(participantState.refund_tx.time * 1000).toString()}
                isRefund
                rate="0.1"
                symbol={symbol}
              />
            )}
          </S.SaleProgressBlock>
        </>
      )
    }

    if (participantState.sale_state.state === 'not-started') {
      return (
        <S.DescriptionWrapper>
          <SvgLockFlat />
          <S.Description isLock>
            Sale will be started at{' '}
            {dayjs(participantState.sale_state.startTime * 1000).toString()}
          </S.Description>
        </S.DescriptionWrapper>
      )
    }

    if (
      participantState.sale_state.state === 'in-progress' ||
      participantState.sale_state.state === 'can-end'
    ) {
      switch (tranformedParticipantStatus) {
        case 'locked-end-ico':
          return (
            <>
              <S.DescriptionWrapper>
                <S.Description isLock>
                  {toHumanNumber(BigInt(participantState.locked_balance))}{' '}
                  {symbol} Locked by the end of Tokensale
                </S.Description>
              </S.DescriptionWrapper>
              <S.SaleProgressBlock>
                <S.SaleProgressTitleWrapper>
                  <S.SaleProgressTitle>
                    Token sale progress:
                  </S.SaleProgressTitle>
                </S.SaleProgressTitleWrapper>
                <S.TrxLine />
                <S.SaleProgressBlock>
                  <ProgressBlock
                    amount={toHumanNumber(
                      BigInt(participantState.sale_state.supplied)
                    )}
                    maxAmount={toHumanNumber(
                      BigInt(participantState.sale_state.totalSupply)
                    )}
                    minAmount={toHumanNumber(
                      BigInt(participantState.sale_state.softCap)
                    )}
                  />
                </S.SaleProgressBlock>
              </S.SaleProgressBlock>
            </>
          )
        case 'on-wallet':
          return (
            <S.SaleProgressBlock>
              <S.TrxsWrapper>
                {participantState.buy_transactions.map((trx) => (
                  <TransactionBlock
                    hash={trx.hash}
                    amount={toHumanNumber(BigInt(trx.jetton_value))}
                    date={dayjs(trx.time * 1000).toString()}
                    rate={toHumanNumber(BigInt(trx.ton_value))}
                    symbol={symbol}
                  />
                ))}
              </S.TrxsWrapper>
            </S.SaleProgressBlock>
          )
        case 'locked-by-time':
          return (
            <S.DescriptionWrapper>
              <SvgLockFlat />
              <S.Description isLock>
                {toHumanNumber(BigInt(participantState.locked_balance))}{' '}
                {symbol} Locked by the{' '}
                {participantState.unlock_transactions.length > 0 &&
                  dayjs(
                    participantState.unlock_transactions[0].time * 1000
                  ).toString()}
              </S.Description>
            </S.DescriptionWrapper>
          )
        case 'vested':
          const unlockedTrxs = participantState.unlock_transactions.filter(
            (unlockTrx) => unlockTrx.hash !== 'scheduled'
          )

          const lockedTrxs = participantState.unlock_transactions.filter(
            (unlockTrx) => unlockTrx.hash === 'scheduled'
          )

          return (
            <>
              <S.SaleProgressBlock>
                <S.SaleProgressTitleWrapper>
                  <S.SaleProgressTitle>Unlock schedule</S.SaleProgressTitle>
                  <S.SaleProgressChip>
                    Unlocked {unlockedTrxs.length}/
                    {participantState.unlock_transactions.length}
                  </S.SaleProgressChip>
                </S.SaleProgressTitleWrapper>
                <S.TrxLine />
                {lockedTrxs.length > 0 && (
                  <S.DescriptionWrapper>
                    <S.Description>
                      Next Part will unlock on{' '}
                      <span style={{ fontWeight: 700 }}>
                        {dayjs(lockedTrxs[0].time * 1000).toString()}
                      </span>
                    </S.Description>
                  </S.DescriptionWrapper>
                )}
              </S.SaleProgressBlock>

              <S.SaleProgressBlock>
                <S.TrxsWrapper>
                  {unlockedTrxs.map((unlockedTx) => (
                    <LockTransactionBlock
                      key={unlockedTx.hash}
                      hash={unlockedTx.hash}
                      amount={toHumanNumber(BigInt(unlockedTx.jetton_value))}
                      date={dayjs(unlockedTx.time * 1000).toString()}
                      isLocked={false}
                      symbol={symbol}
                    />
                  ))}
                </S.TrxsWrapper>
              </S.SaleProgressBlock>
              <S.SaleProgressBlock>
                <S.TrxsWrapper>
                  {lockedTrxs.map((lockedTx) => {
                    return (
                      <LockTransactionBlock
                        key={lockedTx.hash}
                        amount={toHumanNumber(BigInt(lockedTx.jetton_value))}
                        date={dayjs(lockedTx.time * 1000).toString()}
                        isLocked={true}
                        symbol={symbol}
                      />
                    )
                  })}
                </S.TrxsWrapper>
              </S.SaleProgressBlock>
            </>
          )
      }
    }
  }, [participantState, symbol, tranformedParticipantStatus])

  return (
    <Container>
      <S.Wrapper>
        <S.ParticipatedBlockWrapper>
          <S.BalanceWrapper>
            <S.Label>Balance</S.Label>
            <S.BalanceLabel>
              {toHumanNumber(BigInt(participantState.jetton_balance))} {symbol}
            </S.BalanceLabel>
          </S.BalanceWrapper>
          <S.Line />
          <S.ContentWrapper>{currentInfoContent}</S.ContentWrapper>
        </S.ParticipatedBlockWrapper>
      </S.Wrapper>
    </Container>
  )
}
