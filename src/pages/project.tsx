import { FC, useCallback, useMemo } from 'react'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { MainButton, BackButton } from '@twa-dev/sdk/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { getICOProjectById } from 'api'
import { AppRoutes } from 'constants/app'
import {
  InfoBlock,
  ProjectaInfoHeader,
  Tokenomics,
} from 'domains/Project/components'
import * as S from 'domains/Project/style'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { Line } from 'ui/Line/Line'
import { Loader } from 'ui/Loader/Loader'

const Project: FC = () => {
  const router = useRouter()

  const userWalletAddress = useTonAddress()

  const [tonConnectUI] = useTonConnectUI()

  const tgOptions = useTelegram()

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

  const handleMainButtonClick = useCallback(() => {
    if (!userWalletAddress) {
      tonConnectUI.connectWallet()

      return
    }

    router.push({
      pathname: AppRoutes.Participate,
      query: {
        id,
      },
    })
  }, [id, router, tonConnectUI, userWalletAddress])

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

  if (isProjectLoading) {
    return <Loader type="projectPage" />
  }

  if (isProjectLoaded) {
    return (
      <>
        <Head>
          <title>Project</title>
        </Head>
        <S.Wrapper>
          <BackButton onClick={() => router.back()} />
          <ProjectaInfoHeader
            description={project.metadata.description}
            image={project.metadata.image}
            title={project.metadata.name}
          />
          <Line />
          <Tokenomics
            distributions={distributions}
            icoFundDistributions={icoFundDistributions}
            icoParams={icoParams}
            totalSupply={project.totalSupply}
          />
          <InfoBlock />
        </S.Wrapper>
        {tgOptions && (
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
}

export default Project
