import { FC, useEffect, useMemo } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { AppRoutes } from 'constants/app'
import { LinkBlock } from 'domains/Referral/components'
import * as S from 'domains/Referral/style'
import { BackButton } from 'features/BackButton'
import { useClipboard } from 'hooks/useClipboard/useClipboard'
import { useProfileContext } from 'hooks/useProfileContext/useProfileContext'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { InvitedAlertBlock } from 'ui/InitedAlertBlock/InvitedAlertBlock'

const tokenovaBotUrl = 't.me/tokenovabot/launchpad?startapp='

const referralIdMock = 'JDsQ_1s2d18'

const Referral: FC = () => {
  const router = useRouter()

  const clipboard = useClipboard()

  const { webApp } = useTelegram()

  const { profileInfo, invitedBy } = useProfileContext()

  useEffect(() => {
    webApp?.expand()
  }, [webApp])

  const handleCopyBtnClick = () => {
    clipboard(tokenovaBotUrl + referralIdMock, () => {
      alert('You have successfully copied the referral link!')
    })
  }

  const shareLink = useMemo(() => {
    if (!profileInfo) {
      return ''
    }

    return `https://t.me/share/url?url=${
      tokenovaBotUrl + profileInfo.referral_code
    }&text=${'Join Tokenova testnet !'}`
  }, [profileInfo])

  const handleReadMoreClick = () => {
    router.push({
      pathname: AppRoutes.Post,
      query: {
        fileName: 'referral_system_post.md',
      },
    })
  }

  return (
    <>
      <Head>
        <title>Referral</title>
      </Head>
      <main>
        <BackButton onClick={() => router.back()} />

        {invitedBy?.username && <InvitedAlertBlock />}
        {webApp && (
          <S.Wrapper>
            <S.ContentWrapper>
              <S.Circle>
                <S.ReferralLinkIcon />
              </S.Circle>
              <S.InfoWrapper>
                <S.Title>Referral Link</S.Title>
                <S.Label>
                  Anyone on Telegram will be able to join to Tokenova by
                  folowing this link
                </S.Label>
                <S.Link onClick={handleReadMoreClick}>Read more</S.Link>
              </S.InfoWrapper>
              <S.InfoWrapper>
                <LinkBlock
                  onClick={handleCopyBtnClick}
                  referralCode={profileInfo?.referral_code}
                />

                <S.ButtonsWrapper>
                  <S.Button onClick={handleCopyBtnClick}>Copy</S.Button>
                  <S.ShareLink href={shareLink}>Share</S.ShareLink>
                </S.ButtonsWrapper>
              </S.InfoWrapper>
            </S.ContentWrapper>
          </S.Wrapper>
        )}
      </main>
    </>
  )
}

export default Referral
