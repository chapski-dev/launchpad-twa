import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useTonAddress } from '@tonconnect/ui-react'
// import dayjs from 'dayjs'

import { Inter } from 'next/font/google'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getICOProjectById } from 'api'
import { AppRoutes } from 'constants/app'
import {
  ProjectInfoHeader,
  // ParticipateModal,
} from 'domains/Project/components'
import * as S from 'domains/Project/style'
import { BackButton } from 'features/BackButton'
import { Layout } from 'features/Layout/Layout'
// import { MainButton } from 'features/MainButton'
// import { useSendTransaction } from 'hooks/useSendTransaction/useSendTransaction'
import { MainButton } from 'features/MainButton'
import { useProfileContext } from 'hooks/useProfileContext/useProfileContext'

import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { BuyPopup } from 'popups/BuyPopup/BuyPopup'
// import { VerificationPopup } from 'popups/VerificationPopup/VerificationPopup'
import { Button } from 'ui/Button/Button'
import { Container } from 'ui/Container/Container'
import { Line } from 'ui/Line/Line'
import { Loader } from 'ui/Loader/Loader'

const inter = Inter({ subsets: ['latin'] })

const Project: FC = () => {
  const [isParticipateModalOpen, setIsParticipateModalOpen] = useState(false)
  // const [verificationPopupOpen, setVerificationPopupOpen] = useState(false)

  const router = useRouter()

  const userWalletAddress = useTonAddress()

  // const [tonConnectUI] = useTonConnectUI()

  // const { sendTransaction } = useSendTransaction()

  const { xapiProfileInfo } = useProfileContext()

  const { webApp } = useTelegram()

  const { id } = router.query

  useEffect(() => {
    webApp?.expand()
  }, [webApp])

  const {
    data: project,
    isLoading: isProjectLoading,
    isSuccess: isProjectLoaded,
  } = useQuery({
    queryKey: ['icoProject', id],
    queryFn: () => getICOProjectById(id as string),
    enabled: Boolean(id),
    select: useCallback((data: any) => {
      const distributions: any[] =
        data.tokenomics.find(({ name }: any) => name === 'distribution')
          ?.value || []

      const icoParams = data.tokenomics.find(
        ({ name }: any) => name === 'ico'
      )?.value

      const icoFundDistributions =
        data.tokenomics.find(({ name }: any) => name === 'icoDistribution')
          ?.value || []

      const getTotalSupply = () => {
        if (distributions) {
          const totalByDistributions = distributions.reduce<number>(
            (acc, curr) => Number(acc) + Number(curr.value),
            0
          )

          if (icoParams) {
            const totalSupply =
              totalByDistributions + Number(icoParams.jettonsAmount)

            return totalSupply
          }

          return totalByDistributions
        }
      }

      return {
        ...data,
        totalSupply: getTotalSupply(),
        icoParams: icoParams || null,
        markdownInfo: data.markdownDocument
          ? JSON.parse(data.markdownDocument)
          : null,
        distributions,
        icoFundDistributions,
      }
    }, []),
  })

  console.log(project)

  // const {
  //   data: participantState,
  //   isLoading: isParticipantStateLoading,
  //   // refetch: refetchProjectParticipantInfo,
  // } = useQuery({
  //   queryKey: ['participantState'],
  //   queryFn: () =>
  //     TnC.getParticipantState(userWalletAddress, project?.icoMasterAddress),
  //   enabled: Boolean(userWalletAddress) && Boolean(project?.icoMasterAddress),
  // })

  // const { data: currentIcoInfo, isLoading: isCurrentIcoInfoLoading } = useQuery(
  //   {
  //     queryKey: ['currentIcoInfo'],
  //     queryFn: () => TnC.icoInfo(project?.icoMasterAddress),
  //     enabled: Boolean(project?.icoMasterAddress),
  //   }
  // )

  const toggleParticipateModal = () => {
    switch (xapiProfileInfo?.state) {
      case 'verified':
        setIsParticipateModalOpen((prev) => !prev)
        break

      case 'unverified':
        //TODO: temporary, delete after all tests
        setIsParticipateModalOpen((prev) => !prev)
        break
    }
  }

  // const handleMainButtonClick = useCallback(() => {
  //   if (!userWalletAddress) {
  //     if (!webApp) {
  //       return
  //     }

  //     webApp?.expand()

  //     tonConnectUI.connectWallet()

  //     return
  //   }

  //   if (participantState?.participated) {
  //     alert('You have already participated in this project')

  //     return
  //   }

  //   if (!isParticipateModalOpen) {
  //     toggleParticipateModal()
  //   }
  // }, [
  //   isParticipateModalOpen,
  //   participantState?.participated,
  //   tonConnectUI,
  //   userWalletAddress,
  //   webApp,
  // ])

  const isLoading = useMemo(() => {
    if (userWalletAddress) {
      return isProjectLoading
    }

    return isProjectLoading
  }, [
    // isCurrentIcoInfoLoading,
    // isParticipantStateLoading,
    isProjectLoading,
    userWalletAddress,
  ])

  // const isEarlyClaimButtonDisplayed = useMemo(() => {
  //   if (!participantState || !participantState?.participated) {
  //     return false
  //   }

  //   return (
  //     participantState.sale_state.state === 'can-end' &&
  //     participantState.distribution_mode !== 2 &&
  //     participantState.unlock_transactions.length === 0 &&
  //     dayjs().isBefore(participantState.sale_state.endTime * 1000)
  //   )
  // }, [participantState])

  // const handleEarlyClaimButtonClick = useCallback(async () => {
  //   if (!project) {
  //     return
  //   }

  //   const trxMessage = TnC.pingRequest(
  //     Address.parse(project.icoMasterAddress),
  //     (participantState as any)?.user_id
  //   )

  //   const trx = await sendTransaction(trxMessage)

  //   if (trx.boc) {
  //     alert('Early claim successfully submitted')
  //   }
  // }, [project, participantState, sendTransaction])

  return (
    <>
      <Head>
        <title>Project</title>
      </Head>
      <main className={inter.className}>
        <BackButton onClick={() => router.back()} />
        {webApp && (
          <Layout>
            {isLoading ? (
              <Loader type="projectPage" />
            ) : (
              isProjectLoaded && (
                <>
                  <S.Wrapper>
                    <Container>
                      <ProjectInfoHeader
                        description={project.description}
                        image={project.image}
                        // network={project.network}
                        title={project.name}
                      />
                      <Line />
                      {/* {userWalletAddress && participantState?.participated && (
                      <ParticipatedInfo
                        icoMasterAddress={project.icoMasterAddress}
                        participantState={participantState}
                        symbol={project.symbol}
                      />
                    )} */}
                      <Button
                        onClick={() => {
                          router.push({
                            pathname: AppRoutes.SaleState,
                            query: {
                              projectId: project.id,
                            },
                          })
                        }}
                      >
                        Vesting Distiribution page
                      </Button>
                      {/* // TODO: У project появился ключ tokenomics. Полагаю из него надо будет парсить инфу */}
                      {/* <Tokenomics
                      distributions={project.distributions}
                      icoFundDistributions={project.icoFundDistributions}
                      icoParams={project.icoParams}
                      totalSupply={project.totalSupply}
                    /> */}
                      {/* <InfoBlock
                      icoInfo={currentIcoInfo!}
                      mdContent={project.markdownInfo?.content}
                    /> */}
                      <BuyPopup
                        onClose={toggleParticipateModal}
                        open={isParticipateModalOpen}
                        projectId={project.id}
                        //TODO: убрать после демо
                        status={
                          project.name === 'NebulaNet'
                            ? 'join_waitlist'
                            : undefined
                        }
                      />

                      {/* <VerificationPopup
                        onClose={toggleParticipateModal}
                        open={verificationPopupOpen}
                      /> */}

                      {!isParticipateModalOpen && (
                        <MainButton
                          onClick={toggleParticipateModal}
                          text={
                            project.name === 'NebulaNet'
                              ? 'Join Waitlist'
                              : 'Buy XTON'
                          }
                        />
                      )}
                      {/* {!participantState?.participated &&
                      !isParticipateModalOpen && (
                        <MainButton
                          onClick={handleMainButtonClick}
                          text={
                            userWalletAddress
                              ? 'Buy ' + project?.metadata.symbol
                              : 'Connect Wallet'
                          }
                        />
                      )}
                    {isEarlyClaimButtonDisplayed && (
                      <MainButton
                        onClick={handleEarlyClaimButtonClick}
                        text="Early Claim"
                      />
                    )} */}
                    </Container>
                  </S.Wrapper>
                  {/* {currentIcoInfo && (
                    <ParticipateModal
                      icoInfo={currentIcoInfo!}
                      icoMasterAddress={project?.icoMasterAddress}
                      jettonImage={project?.metadata.image}
                      onClose={setIsParticipateModakOpen}
                      open={!!(participantState && isParticipateModalOpen)}
                      participantState={participantState}
                      refetchProjectParticipantInfo={
                        refetchProjectParticipantInfo
                      }
                      symbol={project?.metadata.symbol}
                    />
                  )} */}
                </>
              )
            )}
          </Layout>
        )}
      </main>
    </>
  )
}

export default Project
