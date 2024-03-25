import { FC, useCallback, useState } from 'react'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'

import { BackButton } from 'features/BackButton'
import { ProfileBlock } from 'features/Layout/components/Header/components/ProfileBlock/ProfileBlock'
import { useProfileContext } from 'hooks/useProfileContext/useProfileContext'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { ConnectWalletPopup } from 'popups/ConnectWalletPopup/ConnectWalletPopup'
import { Button } from 'ui/Button/Button'
import { Container } from 'ui/Container/Container'
import { Task } from 'ui/Task/Task'
import * as S from '../domains/Profile/style/index'

const inter = Inter({ subsets: ['latin'] })

const BLOCKPASS_CLIENT_ID = process.env.NEXT_PUBLIC_BLOCKPASS_CLIENT_ID

const Profile: FC = () => {
  const [isConnectWalletPopupOpen, setIsConnectWalletPopupOpen] =
    useState<boolean>(false)

  const toggleConnectWalletPopup = useCallback(() => {
    setIsConnectWalletPopupOpen((prev) => !prev)
  }, [])

  const router = useRouter()

  const { user } = useTelegram()

  const { xapiProfileInfo, setXapiProfileFlag } = useProfileContext()

  const loadBlockpassWidget = useCallback(() => {
    const blockpass = new window.BlockpassKYCConnect(
      BLOCKPASS_CLIENT_ID as string, // service client_id from the admin console
      {
        refId: user?.id?.toString() || '', // assign the local user_id of the connected user
      }
    )
    blockpass?.startKYCConnect()

    blockpass.on('KYCConnectSuccess', () => {
      //add code that will trigger when data have been sent.
    })
  }, [user?.id])

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      {/** инициализация BlockpassKYCConnect в нексте происходит именно так */}
      <Script
        onLoad={loadBlockpassWidget}
        src="https://cdn.blockpass.org/widget/scripts/release/3.0.2/blockpass-kyc-connect.prod.js"
      />
      <BackButton onClick={() => router.back()} />
      <main className={inter.className}>
        <S.Wrapper>
          <Container>
            <ProfileBlock />
            <Button children="new" onClick={() => setXapiProfileFlag('new')} />
            <Button
              children="pending-kyc"
              onClick={() => setXapiProfileFlag('pending-kyc')}
            />
            <Button
              children="done"
              onClick={() => setXapiProfileFlag('done')}
            />
            <Button
              children="done2"
              onClick={() => setXapiProfileFlag('done2')}
            />
            <S.CompletingInfoBlock>
              <S.InfoTitle>Completing the profile creation</S.InfoTitle>
              <S.DescriptionInfo>
                Enter your wallet and complete the verification to start
                <br /> using the service.
              </S.DescriptionInfo>
            </S.CompletingInfoBlock>
            <S.TaskWrapper>
              <Task
                description={xapiProfileInfo?.wallets?.task?.description}
                done={xapiProfileInfo?.wallets?.task?.done}
                onClick={toggleConnectWalletPopup}
                optional={xapiProfileInfo?.wallets?.task?.optional}
                status={
                  xapiProfileInfo?.wallets?.task?.done ? 'done' : 'not-started'
                }
                title={xapiProfileInfo?.wallets?.task?.title}
                type="wallet"
              />
              <div id="blockpass-kyc-connect">
                {' '}
                {/** этот айди является обязательным тк либа тригерится на onClick по нему, удалять нелья!  */}
                <Task
                  description={xapiProfileInfo?.kyc?.task?.description}
                  status={xapiProfileInfo?.kyc?.task?.state}
                  title={xapiProfileInfo?.kyc?.task?.title}
                  type="kyc"
                />
              </div>
              {xapiProfileInfo?.social?.map((el) => (
                <Task
                  description={el?.optional ? 'Optional' : ''}
                  optional={el?.optional}
                  status="not-started"
                  title={el?.title}
                  type={el?.type}
                />
              ))}
            </S.TaskWrapper>
          </Container>
        </S.Wrapper>
        <ConnectWalletPopup
          onClose={toggleConnectWalletPopup}
          open={isConnectWalletPopupOpen}
        />
      </main>
    </>
  )
}

export default Profile
