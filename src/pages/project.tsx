import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { TnC } from '@ton-and-company/sdk'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
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
import { Button } from 'ui/Button/Button'
import { Line } from 'ui/Line/Line'
import { Loader } from 'ui/Loader/Loader'

// const MOCK_USER_ADDRESS = 'EQCXTqyq89qdoH5MWXEFMWceA6V4ODis_4SlWlDxOin-LfHb'

// const MOCK_ICO_ADDRESS = 'EQBS_IUY_sOjPuFK9Dzg4mE1n-OzveGgM3LUYIdYrb5YE4EK'

const Project: FC = () => {
  const [currentParticipantMode, setCurrentParticipantMode] =
    useState('in-progress')

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

  const switchParticipantState = () => {
    switch (currentParticipantMode) {
      case 'in-progress':
        setCurrentParticipantMode('on-wallet')
        break
      case 'on-wallet':
        setCurrentParticipantMode('lock-released')
        break
      case 'lock-released':
        setCurrentParticipantMode('vest')
        break
      case 'vest':
        setCurrentParticipantMode('fail')
        break
      case 'fail':
        setCurrentParticipantMode('in-progress')
        break
    }
  }

  const {
    data: participantState,
    isLoading: isParticipantStateLoading,
    // isSuccess: isParticipantStateLoaded,
  } = useQuery(
    ['participantState'],
    () => TnC.getParticipantState(userWalletAddress, project?.icoMasterAddress),
    {
      enabled: Boolean(userWalletAddress) && Boolean(project?.icoMasterAddress),
    }
  )

  console.log(participantState)

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

  const markdown =
    project?.markdownDocument && JSON.parse(project?.markdownDocument)

  return (
    <>
      <Head>
        <title>Project</title>
      </Head>
      <BackButton onClick={() => router.back()} />
      {isProjectLoading || isParticipantStateLoading || !webApp ? (
        <Loader type="projectPage" />
      ) : (
        isProjectLoaded && (
          <Layout>
            <S.Wrapper>
              <ProjectInfoHeader
                description={project.metadata.description}
                image={project.metadata.image}
                network={project.network}
                title={project.metadata.name}
              />

              <Line />

              {userWalletAddress && participantState?.participated && (
                <>
                  <ParticipatedInfo
                    participantState={participantState}
                    symbol={project.metadata.symbol}
                  />
                  <Button onClick={switchParticipantState}>
                    Switch Participant Info State (staging)
                  </Button>
                </>
              )}

              <Tokenomics
                distributions={distributions}
                icoFundDistributions={icoFundDistributions}
                icoParams={icoParams}
                totalSupply={project.totalSupply}
              />

              <InfoBlock mdContent={markdown?.content} />

              {!participantState?.participated && !isParticipateModalOpen && (
                <MainButton
                  onClick={handleMainButtonClick}
                  text={
                    userWalletAddress
                      ? 'Buy ' + project?.metadata.symbol
                      : 'Connect Wallet'
                  }
                />
              )}
            </S.Wrapper>

            {participantState && isParticipateModalOpen && (
              <ParticipateModal
                icoParams={
                  project?.tokenomics.find(
                    (tokenomic: any) => tokenomic.name === 'ico'
                  )?.value
                }
                isAlreadyParticipated={participantState?.participated}
                jettonImage={project?.metadata.image}
                onClose={toggleParticipateModal}
                symbol={project?.metadata.symbol}
              />
            )}
          </Layout>
        )
      )}
    </>
  )
}

export default Project
