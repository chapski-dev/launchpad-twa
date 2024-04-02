import { FC, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useTonAddress, useTonConnectModal } from '@tonconnect/ui-react'
import dayjs from 'dayjs'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { getICOProjectById, getProjectSaleState, queryUserSaleState } from 'api'
import {
  InfoBlock,
  ProjectInfoHeader,
  Tokenomics,
} from 'domains/Project/components'
import * as S from 'domains/Project/style'
import { BackButton } from 'features/BackButton'
import { Layout } from 'features/Layout/Layout'
import { MainButton } from 'features/MainButton'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { BuyPopup } from 'popups/BuyPopup/BuyPopup'
import { Container } from 'ui/Container/Container'
import { Line } from 'ui/Line/Line'
import { Loader } from 'ui/Loader/Loader'

const inter = Inter({ subsets: ['latin'] })

const Project: FC = () => {
  const [isParticipateModalOpen, setIsParticipateModalOpen] = useState(false)

  const router = useRouter()

  const userWalletAddress = useTonAddress()

  const { open: openTonConnectModal } = useTonConnectModal()

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
  })

  const { data: currentUserSaleState } = useQuery({
    queryKey: ['current-sale-state', project],
    queryFn: () => queryUserSaleState(project!.saleId as string, 'ton'),
    enabled: !!project?.saleId,
  })

  const { data: projectSaleState, isSuccess: isProjectStateLoaded } = useQuery({
    queryKey: ['project-sale-state', project],
    queryFn: () => getProjectSaleState(project!.saleId as string, 'ton'),
    enabled: !!project?.saleId,
  })

  // console.log(fromNano(projectSaleState?.price || 0))

  const toggleParticipateModal = () => {
    if (!userWalletAddress) {
      openTonConnectModal()

      return
    }
    setIsParticipateModalOpen((prev) => !prev)

    // switch (xapiProfileInfo?.state) {
    //   case 'verified':
    //     setIsParticipateModalOpen((prev) => !prev)
    //     break

    //   case 'unverified':
    //     //TODO: temporary, delete after all tests
    //     setIsParticipateModalOpen((prev) => !prev)
    //     break
    // }
  }

  const isTokenSaleStarted = useMemo(() => {
    if (projectSaleState) {
      return dayjs().isBefore(projectSaleState.startTime * 1000, 'day')
    }

    return false
  }, [projectSaleState])

  const isTokenSaleActive = useMemo(() => {
    if (projectSaleState) {
      return dayjs().isAfter(projectSaleState.startTime * 1000) && dayjs().isBefore(projectSaleState.endTime * 1000)
    }

    return false 
  }, [projectSaleState])

  if (!currentUserSaleState) {
    return <h1>Loading...</h1>
  }
  
  return (
    <>
      <Head>
        <title>Project</title>
      </Head>
      <main className={inter.className}>
        <BackButton onClick={() => router.back()} />
        {webApp && (
          <Layout>
            {isProjectLoading ? (
              <Loader type="projectPage" />
            ) : (
              isProjectLoaded &&
              isProjectStateLoaded && (
                <>
                  <S.Wrapper>
                    <Container>
                      <ProjectInfoHeader
                        description={project.description}
                        image={project.image}
                        isParticipated={
                          currentUserSaleState.state === 'bought' &&
                          currentUserSaleState?.bought > 0 
                        }
                        projectId={project.saleId}
                        title={project.name}
                        isTokenSaleActive={isTokenSaleActive}
                      />
                      <Line />

                      {/* // TODO: У project появился ключ tokenomics. Полагаю из него надо будет парсить инфу */}
                      <Tokenomics tokenomics={project.tokenomics} />
                      <InfoBlock
                        mdContent={project.pageData}
                        saleStateData={projectSaleState}
                      />
                      <BuyPopup
                        onClose={toggleParticipateModal}
                        open={isParticipateModalOpen}
                        project={project}
                        projectId={project.saleId}
                        projectSaleState={projectSaleState}
                        //TODO: убрать после демо
                        status={isTokenSaleStarted ? 'join_waitlist' : 'buy'}
                      />

                      {!isParticipateModalOpen && isTokenSaleActive && (
                        <MainButton
                          onClick={toggleParticipateModal}
                          text={
                            userWalletAddress
                              ? `Buy ${project.symbol}`
                              : 'Connect Wallet'
                          }
                        />
                      )}
                    </Container>
                  </S.Wrapper>
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
