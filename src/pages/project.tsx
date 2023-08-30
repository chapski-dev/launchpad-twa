import { FC, useEffect, useCallback, useMemo } from 'react'
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
import { useCustomBackButton } from 'hooks/useCustomBackButton/useCustomBackButton'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { Line } from 'ui/Line/Line'
import { Loader } from 'ui/Loader/Loader'

const Project: FC = () => {
  const router = useRouter()

  const { id } = router.query

  const tgOptions = useTelegram()

  useCustomBackButton()

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

  useEffect(() => {
    if (tgOptions?.tg) {
      if (project) {
        tgOptions.tg.MainButton.setText('Buy ' + project.metadata.symbol)
        tgOptions.tg.MainButton.show()
        tgOptions.tg.MainButton.onClick(() =>
          router.push(`${AppRoutes.Participate}/${id}`)
        )
      }

      tgOptions.tg.onEvent('backButtonClicked', () => {
        router.push(AppRoutes.Home)
      })

      return () => {
        tgOptions.tg.offEvent('backButtonClicked', () => {
          router.push(AppRoutes.Home)
        })

        tgOptions.tg.MainButton.hide()
      }
    }
  }, [id, project, router, tgOptions])

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

  if (isProjectLoading) {
    return <Loader />
  }

  if (isProjectLoaded) {
    return (
      <>
        <Head>
          <title>Project</title>
        </Head>
        <S.Wrapper>
          <ProjectaInfoHeader
            description={project.metadata.description}
            image={project.metadata.image}
            title={project.metadata.name}
          />
          <Line />
          <Tokenomics
            distributions={distributions}
            icoParams={icoParams}
            totalSupply={project.totalSupply}
          />
          <InfoBlock />
        </S.Wrapper>
      </>
    )
  }

  return null
}

export default Project
