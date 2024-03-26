import { FC, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useTonAddress } from '@tonconnect/ui-react'
import { XTONUserSDK } from '@xton/user-sdk'
import dayjs from 'dayjs'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTelegramContext } from 'app/providers/TelegramProvider'
import { BackButton } from 'features/BackButton'
import { Layout } from 'features/Layout/Layout'
import { Container } from 'ui/Container/Container'
import {
  SvgLinkClaimedItem,
  SvgLockmini,
  SvgUnlock,
  SvgWarningCircle,
} from 'ui/icons'
import * as S from '../domains/VestingDistribution/style/index'
import { queryUserSaleState } from 'api';

const SaleState: FC = () => {
  const { webApp } = useTelegramContext()

  const router = useRouter()

  const { projectId } = router.query

  const tonUserWalletAddress = useTonAddress()

  console.log(projectId)

  const { data: currentUserSaleState } = useQuery({
    queryKey: ['current-sale-state'],
    queryFn: () =>
      queryUserSaleState(
        projectId as string,
        'ton'
      ),
    enabled: !!projectId,
  })

  console.log(currentUserSaleState)

  const scheduleDifference = useMemo(() => {
    return dayjs(currentUserSaleState?.schedule?.end).diff(
      dayjs(currentUserSaleState?.schedule?.start),
      'day'
    )
  }, [
    currentUserSaleState?.schedule?.end,
    currentUserSaleState?.schedule?.start,
  ])

  return (
    <>
      <Head>
        <title>VestingDistribution</title>
      </Head>
      <BackButton onClick={() => router.back()} />
      <main>
        <Layout onSearch={() => {}} />
        <S.Wrapper>
          <Container>
            <S.BalanceBlock>
              <S.TitleBalance>Balance</S.TitleBalance>
              <S.Balance>
                {currentUserSaleState?.currentBalance?.toFixed(2)} {currentUserSaleState?.availableClaim.symbol}
              </S.Balance>
              {currentUserSaleState?.lockedBalance && (
                <S.BalanceLocked>
                  <SvgLockmini /> Locked Balance:{' '}
                  {currentUserSaleState?.lockedBalance?.toFixed(2)} {currentUserSaleState?.availableClaim.symbol}
                </S.BalanceLocked>
              )}
            </S.BalanceBlock>

            {currentUserSaleState?.schedule && (
              <S.UnlockScheduleBlock>
                <S.TitleUnlock>
                  <SvgWarningCircle />
                  Unlock schedule
                </S.TitleUnlock>
                <S.DescrUnlock>
                  Vesting schedule lasts for {scheduleDifference} days, starting
                  from
                  <br />
                  <span>
                    {dayjs(currentUserSaleState?.schedule?.start).format(
                      'YYYY-MM-DD'
                    )}{' '}
                    ending on{' '}
                    {dayjs(currentUserSaleState.schedule.end).format(
                      'YYYY-MM-DD'
                    )}
                    .
                  </span>
                </S.DescrUnlock>
              </S.UnlockScheduleBlock>
            )}
          </Container>
          
          
          <S.ClaimedItemsWrapper>
          {currentUserSaleState?.previousClaims?.length > 0 ? 
            <S.ClaimedItemsWrapperInner>
              {currentUserSaleState?.previousClaims?.map(
                ({ amount, symbol, time, txLink }, idx) => (
                  <S.ClaimedItem
                    key={idx}
                    onClick={() => webApp.openLink(txLink)}
                  >
                    <S.InfoBlock>
                      <S.IconUnLock>
                        <SvgUnlock />
                      </S.IconUnLock>
                      <S.InfoClaimed>
                        <S.Count>
                          {amount.toFixed(2)} {symbol} <span>Claimed</span>
                        </S.Count>
                        <S.Date>{dayjs(time).toString()}</S.Date>
                      </S.InfoClaimed>
                    </S.InfoBlock>
                    <S.ClaimedLink>
                      <SvgLinkClaimedItem />
                    </S.ClaimedLink>
                  </S.ClaimedItem>
                )
              )}
            </S.ClaimedItemsWrapperInner>
              : null}
            {currentUserSaleState?.availableClaim && (
              <S.ClaimedItemsWrapperInner>
                <S.ClaimedItem>
                  <S.InfoBlock>
                    <S.IconLock>
                      <SvgUnlock />
                    </S.IconLock>
                    <S.InfoClaimed>
                      <S.Count>
                        Claimable:{' '}
                        {currentUserSaleState?.availableClaim.amount.toFixed(2)}{' '}
                        {currentUserSaleState?.availableClaim.symbol}{' '}
                      </S.Count>
                    </S.InfoClaimed>
                  </S.InfoBlock>
                  <S.ClaimedBox>Claim</S.ClaimedBox>
                </S.ClaimedItem>
              </S.ClaimedItemsWrapperInner>
            )}

            {/* <S.ClaimedItemsWrapperInner>
              {CLAIMABLE_ITEM_MOCK.map(({ count }, idx) => (
                <S.ClaimedItem key={idx}>
                  <S.InfoBlock>
                    <S.IconLock>
                      <SvgUnlock />
                    </S.IconLock>
                    <S.InfoClaimed>
                      <S.Count>Claimable: {count} ETH </S.Count>
                    </S.InfoClaimed>
                  </S.InfoBlock>
                  <S.ClaimedBox>Claim</S.ClaimedBox>
                </S.ClaimedItem>
              ))}
            </S.ClaimedItemsWrapperInner> */}
          </S.ClaimedItemsWrapper>
        </S.Wrapper>
      </main>
    </>
  )
}

export default SaleState
