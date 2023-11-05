import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { TnC } from '@ton-and-company/sdk'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import dayjs from 'dayjs'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { Address } from 'ton-core'
import { getICOProjectById } from 'api'
import {
  InfoBlock,
  ParticipatedInfo,
  ProjectInfoHeader,
  Tokenomics,
  ParticipateModal,
} from 'domains/Project/components'
import * as S from 'domains/Project/style'
import { BackButton } from 'features/BackButton'
import { Layout } from 'features/Layout/Layout'
import { MainButton } from 'features/MainButton'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { Line } from 'ui/Line/Line'
import { Loader } from 'ui/Loader/Loader'

const Project: FC = () => {
  const [isParticipateModalOpen, setIsParticipateModakOpen] =
    useState<boolean>(false)

  const router = useRouter()

  const userWalletAddress = useTonAddress()

  const [tonConnectUI] = useTonConnectUI()

  const { webApp } = useTelegram()

  const { id } = router.query

  useEffect(() => {
    webApp?.expand()
  }, [webApp])

  const {
    data: project,
    isLoading: isProjectLoading,
    isSuccess: isProjectLoaded,
  } = useQuery(['icoProject'], () => getICOProjectById(id as string), {
    enabled: Boolean(id),
    select: useCallback((data: any) => {
      const getTotalSupply = () => {
        const distributions: any[] = data.tokenomics.find(
          ({ name }: any) => name === 'distribution'
        )?.value

        const ico = data.tokenomics.find(
          ({ name }: any) => name === 'ico'
        )?.value

        if (distributions) {
          const totalByDistributions = distributions.reduce<number>(
            (acc, curr) => Number(acc) + Number(curr.value),
            0
          )

          if (ico) {
            const totalSupply = totalByDistributions + Number(ico.jettonsAmount)

            return totalSupply
          }

          return totalByDistributions
        }
      }

      return {
        ...data,
        totalSupply: getTotalSupply(),
      }
    }, []),
  })

  const {
    data: participantState,
    isLoading: isParticipantStateLoading,
    refetch: refetchProjectParticipantInfo,
  } = useQuery(
    ['participantState'],
    () => TnC.getParticipantState(userWalletAddress, project?.icoMasterAddress),
    {
      enabled: Boolean(userWalletAddress) && Boolean(project?.icoMasterAddress),
    }
  )

  const { data: currentIcoInfo, isLoading: isCurrentIcoInfoLoading } = useQuery(
    ['currentIcoInfo'],
    () => TnC.icoInfo(project?.icoMasterAddress),
    {
      enabled: Boolean(project?.icoMasterAddress),
    }
  )

  const toggleParticipateModal = () => {
    setIsParticipateModakOpen((prev) => !prev)
  }

  const handleMainButtonClick = useCallback(() => {
    if (!userWalletAddress) {
      if (!webApp) {
        return
      }

      webApp?.expand()

      tonConnectUI.connectWallet()

      return
    }

    if (participantState?.participated) {
      alert('You have already participated in this project')

      return
    }

    if (!isParticipateModalOpen) {
      toggleParticipateModal()
    }
  }, [
    isParticipateModalOpen,
    participantState?.participated,
    tonConnectUI,
    userWalletAddress,
    webApp,
  ])

  const icoParams = useMemo(() => {
    if (!project) {
      return
    }

    return project.tokenomics.find(({ name }: any) => name === 'ico')?.value
  }, [project])

  const distributions = useMemo(() => {
    if (!project) {
      return
    }

    return project.tokenomics.find(({ name }: any) => name === 'distribution')
      ?.value
  }, [project])

  const icoFundDistributions = useMemo(() => {
    if (!project) {
      return
    }

    return project.tokenomics.find(
      ({ name }: any) => name === 'icoDistribution'
    )?.value
  }, [project])

  const isLoading = useMemo(() => {
    if (userWalletAddress) {
      return (
        isProjectLoading || isParticipantStateLoading || isCurrentIcoInfoLoading
      )
    }

    return isProjectLoading
  }, [
    isCurrentIcoInfoLoading,
    isParticipantStateLoading,
    isProjectLoading,
    userWalletAddress,
  ])

  console.log(participantState)

  const isEarlyClaimButtonDisplayed = useMemo(() => {
    if (!participantState || !participantState?.participated) {
      return false
    }

    return (
      participantState.sale_state.state === 'can-end' &&
      dayjs().isBefore(participantState.sale_state.endTime * 1000)
    )
  }, [participantState])

  const handleEarlyClaimButtonClick = useCallback(async () => {
    if (!project) {
      return
    }

    const trxMessage = TnC.pingRequest(
      Address.parse(project.icoMasterAddress),
      (participantState as any)?.id
    )

    const deployParams = {
      validUntil: Date.now() + 100000,
      messages: [trxMessage],
    }

    const trx = await tonConnectUI.sendTransaction(deployParams)

    if (trx.boc) {
      alert('Early claim successfully submitted')
    }
  }, [project, tonConnectUI])

  const markdown =
    project?.markdownDocument && JSON.parse(project?.markdownDocument)

  return (
    <>
      <Head>
        <title>Project</title>
      </Head>
      <BackButton onClick={() => router.back()} />
      {webApp && (
        <Layout>
          {isLoading ? (
            <Loader type="projectPage" />
          ) : (
            isProjectLoaded && (
              <>
                <S.Wrapper>
                  <ProjectInfoHeader
                    description={project.metadata.description}
                    image={project.metadata.image}
                    network={project.network}
                    title={project.metadata.name}
                  />

                  <Line />

                  {userWalletAddress && participantState?.participated && (
                    <ParticipatedInfo
                      icoMasterAddress={project.icoMasterAddress}
                      participantState={participantState}
                      symbol={project.metadata.symbol}
                    />
                  )}

                  <Tokenomics
                    distributions={distributions}
                    icoFundDistributions={icoFundDistributions}
                    icoParams={icoParams}
                    totalSupply={project.totalSupply}
                  />

                  <InfoBlock
                    icoInfo={currentIcoInfo!}
                    mdContent={markdown?.content}
                  />

                  {!participantState?.participated &&
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
                  )}
                </S.Wrapper>
                {participantState && isParticipateModalOpen && (
                  <ParticipateModal
                    icoInfo={currentIcoInfo!}
                    icoMasterAddress={project?.icoMasterAddress}
                    jettonImage={project?.metadata.image}
                    onClose={toggleParticipateModal}
                    participantState={participantState}
                    refetchProjectParticipantInfo={
                      refetchProjectParticipantInfo
                    }
                    symbol={project?.metadata.symbol}
                  />
                )}
              </>
            )
          )}
        </Layout>
      )}
    </>
  )
}

export default Project
