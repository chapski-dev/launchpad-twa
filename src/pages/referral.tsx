import { FC, useEffect, useMemo } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
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

  const { data: profileInfo } = useQuery(
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

  const handleShareClick = () => {
    const shareLink = `https://t.me/share/url?url=${
      tokenovaBotUrl + referralIdMock
    }&text=${'Join Tokenova testnet !'}`

    router.push(shareLink)
  }

  const shareLink = useMemo(() => {
    if (!profileInfo) {
      return ''
    }

    return `https://t.me/share/url?url=${
      tokenovaBotUrl + profileInfo.referral_code
    }&text=${'Join Tokenova testnet !'}`
  }, [profileInfo])

  return (
    <>
      <Head>
        <title>Referral</title>
      </Head>
      <main>
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
                {/* <a href={shareLink}> share</a>
                <S.Button isAccent onClick={handleShareClick}>
                  Share
                </S.Button> */}
                <S.ShareLink href={shareLink}>Share</S.ShareLink>
              </S.ButtonsWrapper>
            </S.InfoWrapper>
          </S.ContentWrapper>
        </S.Wrapper>
      </main>
    </>
  )
}

export default Referral
