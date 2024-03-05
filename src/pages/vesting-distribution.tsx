import { FC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
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

type ClaimedItemProps = {
  count: string
  date: string
}

type ClaimableItemProps = {
  count: string
}

const CLAIMED_ITEM_MOCK: ClaimedItemProps[] = [
  {
    count: '13.63',
    date: '2023-01-2 23:00',
  },
  {
    count: '13.63',
    date: '2023-01-2 23:00',
  },
  {
    count: '13.63',
    date: '2023-01-2 23:00',
  },
]

const CLAIMABLE_ITEM_MOCK: ClaimableItemProps[] = [
  {
    count: '13.63',
  },
  {
    count: '13.63',
  },
]

const Profile: FC = () => {
  const router = useRouter()

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
              <S.Balance>{120.45} XTON</S.Balance>
              <S.BalanceLocked>
                <SvgLockmini /> Locked Balance: {24.81} XTON
              </S.BalanceLocked>
            </S.BalanceBlock>
            <S.UnlockScheduleBlock>
              <S.TitleUnlock>
                <SvgWarningCircle />
                Unlock schedule
              </S.TitleUnlock>
              <S.DescrUnlock>
                Vesting schedule lasts for {90} days, starting from
                <br />
                <span>
                  {}2023-01-02 ending on {}2023-04-02.
                </span>
              </S.DescrUnlock>
            </S.UnlockScheduleBlock>
          </Container>

          <S.ClaimedItemsWrapper>
            <S.ClaimedItemsWrapperInner>
              {CLAIMED_ITEM_MOCK.map(({ count, date }, idx) => (
                <S.ClaimedItem key={idx}>
                  <S.InfoBlock>
                    <S.IconUnLock>
                      <SvgUnlock />
                    </S.IconUnLock>
                    <S.InfoClaimed>
                      <S.Count>
                        {count} ETH <span>Claimed</span>
                      </S.Count>
                      <S.Date>{date} GMT</S.Date>
                    </S.InfoClaimed>
                  </S.InfoBlock>
                  <S.ClaimedLink>
                    <SvgLinkClaimedItem />
                  </S.ClaimedLink>
                </S.ClaimedItem>
              ))}
            </S.ClaimedItemsWrapperInner>

            <S.ClaimedItemsWrapperInner>
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
            </S.ClaimedItemsWrapperInner>
          </S.ClaimedItemsWrapper>
        </S.Wrapper>
      </main>
    </>
  )
}

export default Profile
