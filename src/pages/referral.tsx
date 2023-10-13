import { FC, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { QueryCache, useQuery } from 'react-query'
import { getProfile } from 'api'
import { LinkBlock } from 'domains/Referral/components'
import * as S from 'domains/Referral/style'
import { BackButton } from 'features/BackButton'
import { useClipboard } from 'hooks/useClipboard/useClipboard'
import { useTelegram } from 'hooks/useTelegram/useTelegram'

const tokenovaBotUrl = 't.me/tokenovabot/launchpad?startapp='

const referralIdMock = 'JDsQ_1s2d18'

const Referral: FC = () => {
  const router = useRouter()

  const clipboard = useClipboard()

  const { webApp, user } = useTelegram()

  const { data: profileInfo, isLoading: isProfileInfoLoading } = useQuery(
    ['profileInfo'],
    () => getProfile({ telegram: user?.username }),
    {
      enabled: Boolean(user?.username),
    }
  )

  console.log(profileInfo)

  useEffect(() => {
    webApp?.expand()
  }, [webApp])

  const handleCopyBtnClick = () => {
    clipboard(tokenovaBotUrl + referralIdMock, () => {
      alert('You have successfully copied the referral link!')
    })
  }

  return (
    <>
      <Head>
        <title>Referral</title>
      </Head>
      <main>
        {/* <Container> */}
        <BackButton onClick={() => router.back()} />

        <S.Wrapper>
          <S.ContentWrapper>
            <S.Circle>
              <S.ReferralLinkIcon />
            </S.Circle>
            <S.InfoWrapper>
              <S.Title>Referral Link</S.Title>
              <S.Label>
                Anyone on Telegram will be able to join to Tokenova by folowing
                this link
              </S.Label>
            </S.InfoWrapper>
            <S.InfoWrapper>
              <LinkBlock referralCode={profileInfo?.referral_code} />

              <S.ButtonsWrapper>
                <S.Button onClick={handleCopyBtnClick}>Copy</S.Button>
                <S.Button isAccent>Share</S.Button>
              </S.ButtonsWrapper>
            </S.InfoWrapper>
          </S.ContentWrapper>
        </S.Wrapper>
        {/* </Container> */}
      </main>
    </>
  )
}

export default Referral
