import { FC, useCallback, useMemo } from 'react'
import { TnC } from '@ton-and-company/sdk'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { getICOProjectById } from 'api'
import { AppRoutes } from 'constants/app'
import {
  InfoBlock,
  ProjectInfoHeader,
  Tokenomics,
} from 'domains/Project/components'
import * as S from 'domains/Project/style'
import { BackButton } from 'features/BackButton'
import { BalanceBlock } from 'features/BalanceBlock/BalanceBlock'
import { ConnectWalletButton } from 'features/ConnectWalletButton'
import { MainButton } from 'features/MainButton'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { Container } from 'ui/Container/Container'
import { FadeInWrapper } from 'ui/FadeInWrapper/FadeInWrapper'
import { Line } from 'ui/Line/Line'
import { Loader } from 'ui/Loader/Loader'
import { getBalance } from 'utils/getBalance'

const Project: FC = () => {
  const router = useRouter()

  const userWalletAddress = useTonAddress()

  const [tonConnectUI] = useTonConnectUI()

  const { webApp } = useTelegram()

  const { id } = router.query

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

  const { data: participantState, isLoading: isParticipantStateLoading } =
    useQuery(
      ['participantState', project?.icoMasterAddress],
      () =>
        TnC.participantState(userWalletAddress, project?.icoMasterAddress || 0),
      // () => TnC.participantState(userWalletAddress, '0'),
      {
        // enabled: Boolean(userWalletAddress) && Boolean(project?.icoMasterAddress),
        enabled: Boolean(userWalletAddress),
      }
    )

  const { data: balance } = useQuery(
    ['userBalance'],
    () => getBalance(userWalletAddress, 'testnet'),
    {
      enabled: !!userWalletAddress,
    }
  )

  const handleMainButtonClick = useCallback(() => {
    if (!userWalletAddress) {
      if (!webApp) {
        return
      }

      webApp?.expand()

      tonConnectUI.connectWallet()

      return
    }

    // alert('Coming soon ..)')

    router.push({
      pathname: AppRoutes.Participate,
      query: {
        id,
      },
    })
  }, [id, router, tonConnectUI, userWalletAddress, webApp])

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

  if (isProjectLoading || isParticipantStateLoading) {
    return <Loader type="projectPage" />
  }

  if (isProjectLoaded) {
    const markdown =
      project?.markdownDocument && JSON.parse(project?.markdownDocument)

    return (
      <>
        <Head>
          <title>Project</title>
        </Head>
        <FadeInWrapper>
          <S.Wrapper>
            <BackButton onClick={() => router.back()} />
            <Container>
              {userWalletAddress && (
                <S.ButtonsWrapper>
                  <BalanceBlock balance={balance || 0} />

                  <ConnectWalletButton />
                </S.ButtonsWrapper>
              )}
            </Container>
            <ProjectInfoHeader
              description={project.metadata.description}
              image={project.metadata.image}
              network={project.network}
              title={project.metadata.name}
            />
            <Line />
            <Tokenomics
              distributions={distributions}
              icoFundDistributions={icoFundDistributions}
              icoParams={icoParams}
              totalSupply={project.totalSupply}
            />
            <InfoBlock mdContent={markdown?.content} />
          </S.Wrapper>
        </FadeInWrapper>
        {!participantState?.participated && (
          <MainButton
            onClick={handleMainButtonClick}
            text={
              userWalletAddress
                ? 'Buy ' + project.metadata.symbol
                : 'Connect Wallet'
            }
          />
        )}
      </>
    )
  }

  return null
}

export default Project
