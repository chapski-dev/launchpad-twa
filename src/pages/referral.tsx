import { FC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { LinkBlock } from 'domains/Referral/components'
import * as S from 'domains/Referral/style'
import { BackButton } from 'features/BackButton'
import { Button } from 'ui/Button/Button'
import { Container } from 'ui/Container/Container'

const Referral: FC = () => {
  const router = useRouter()

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
              <S.Title>Invite Link</S.Title>
              <S.Label>
                Anyone on Telegram will be able to join to Tokenova by folowing
                this link
              </S.Label>
            </S.InfoWrapper>
            <S.InfoWrapper>
              <LinkBlock />

              <S.ButtonsWrapper>
                <S.Button>Copy</S.Button>
                <S.Button>Share</S.Button>
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
