import { FC, useCallback, useState } from 'react';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { BackButton } from 'features/BackButton';
import { ProfileBlock } from 'features/Layout/components/Header/components/ProfileBlock/ProfileBlock';
import { useProfileContext } from 'hooks/useProfileContext/useProfileContext';
import { ConnectWalletPopup } from 'popups/ConnectWalletPopup/ConnectWalletPopup';
import { Button } from 'ui/Button/Button';
import { Container } from 'ui/Container/Container';
import { Task } from 'ui/Task/Task';
import * as S from '../domains/Profile/style/index';

const inter = Inter({ subsets: ['latin'] });

const Profile: FC = () => {
  const [isConnectWalletPopupOpen, setIsConnectWalletPopupOpen] =
    useState<boolean>(false);

  const toggleConnectWalletPopup = useCallback(() => {
    setIsConnectWalletPopupOpen((prev) => !prev);
  }, []);

  const router = useRouter();

  const { xapiProfileInfo, setXapiProfileFlag } = useProfileContext();

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <BackButton onClick={() => router.back()} />
      <main className={inter.className}>
        <S.Wrapper>
          <Container>
            <ProfileBlock />
            <Button
              children="new"
              onClick={() => setXapiProfileFlag('new')}
            />
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
                icon='wallet'
                onClick={toggleConnectWalletPopup}
                optional={xapiProfileInfo?.wallets?.task?.optional}
                status={xapiProfileInfo?.wallets?.task?.done ? "done" : "not-started"}
                title={xapiProfileInfo?.wallets?.task?.title}
              />
              <Task
                description={xapiProfileInfo?.kyc?.task?.description}
                icon='kyc'
                status={xapiProfileInfo?.kyc?.task?.state}
                title={xapiProfileInfo?.kyc?.task?.title}
              />
              {xapiProfileInfo?.social?.map((el) => (
                <Task
                  description={el?.optional ? "Optional" : ''}
                  icon={el?.type as any}
                  optional={el?.optional}
                  status="not-started"
                  title={el?.title}
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
  );
};

export default Profile;
