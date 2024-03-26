import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useTonAddress } from '@tonconnect/ui-react'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getICOProjectById, queryUserSaleState } from 'api'
import { InfoBlock, ProjectInfoHeader } from 'domains/Project/components'
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

  const { data: currentUserSaleState } = useQuery({
    queryKey: ['current-sale-state', project],
    queryFn: () => queryUserSaleState(project!.id as string, 'ton'),
    enabled: !!project?.id,
  })

  console.log(project)

  const toggleParticipateModal = () => {
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
                        isParticipated={currentUserSaleState?.bought}
                        projectId={project.saleId}
                        // network={project.network}
                        title={project.name}
                      />
                      <Line />
                      <div>
                        {/* <Button
                          onClick={() => {
                            router.push({
                              pathname: AppRoutes.SaleState,
                              query: {
                                projectId: project.saleId,
                              },
                            })
                          }}
                        >
                          Vesting Distiribution page
                        </Button> */}
                      </div>
                      {/* // TODO: У project появился ключ tokenomics. Полагаю из него надо будет парсить инфу */}
                      {/* <Tokenomics
                        distributions={project.distributions}
                        icoFundDistributions={project.icoFundDistributions}
                        icoParams={project.icoParams}
                        totalSupply={project.totalSupply}
                      /> */}
                      <InfoBlock
                        icoInfo={undefined}
                        mdContent={project.pageData}
                      />
                      <BuyPopup
                        onClose={toggleParticipateModal}
                        open={isParticipateModalOpen}
                        project={project}
                        projectId={project.saleId}
                        //TODO: убрать после демо
                        status={'buy'}
                      />

                      {!isParticipateModalOpen && (
                        <MainButton
                          onClick={toggleParticipateModal}
                          text={
                            `Buy ${project.symbol}`
                            // project.name === 'NebulaNet'
                            // ? 'Join Waitlist'
                            // : 'Buy XTON'
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
