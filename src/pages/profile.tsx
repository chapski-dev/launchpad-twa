import { FC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { BackButton } from 'features/BackButton'
import { ProfileBlock } from 'features/Layout/components/Header/components/ProfileBlock/ProfileBlock'
import { Container } from 'ui/Container/Container'
import {
  SvgIdentificationCard,
  SvgTglogo,
  SvgWalletImg,
  SvgXcomlogo,
} from 'ui/icons'
import { Task } from 'ui/Task/Task'
import * as S from '../domains/Profile/style/index'

const Profile: FC = () => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <BackButton onClick={() => router.back()} />
      <main>
        <S.Wrapper>
          <Container>
            <ProfileBlock />
            <S.CompletingInfoBlock>
              <S.InfoTitle>Completing the profile creation</S.InfoTitle>
              <S.DescriptionInfo>
                Enter your wallet and complete the verification to start
                <br /> using the service.
              </S.DescriptionInfo>
            </S.CompletingInfoBlock>
            <S.TaskWrapper>
              <Task
                description="Description for Task 2"
                icon={<SvgWalletImg />}
                status="success"
                title="Connect wallet"
              />
              <Task
                description="Description for Task 4"
                icon={<SvgIdentificationCard />}
                status="pending"
                title="Pass KYC"
              />
              <Task
                description="Optional"
                icon={<SvgTglogo />}
                status="not_started"
                title="Join Telegram channel"
              />
              <Task
                description="Optional"
                icon={<SvgXcomlogo />}
                status="not_started"
                title="Follow on X.com"
              />
              <Task
                description="Optional"
                icon={<SvgXcomlogo />}
                status="not_started"
                title="Follow on X.com"
              />
            </S.TaskWrapper>
          </Container>
        </S.Wrapper>
      </main>
    </>
  )
}

export default Profile
