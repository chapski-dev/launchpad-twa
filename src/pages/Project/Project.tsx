import { FC, useEffect, useCallback, useMemo } from 'react'
import { useQuery } from 'react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { getICOProjectById } from 'api'
import { AppRoutes } from 'constants/app'
import { useCustomBackButton } from 'hooks/useCustomBackButton/useCustomBackButton'
import { Line } from 'ui/Line/Line'
import { Loader } from 'ui/Loader/Loader'
import { InfoBlock, ProjectaInfoHeader, Tokenomics } from './components'
import * as S from './style'

const tg = (window as any).Telegram.WebApp

export const Project: FC = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  useCustomBackButton()

  useEffect(() => {
    tg.onEvent('backButtonClicked', () => {
      navigate(AppRoutes.Home)
    })

    return () => {
      tg.offEvent('backButtonClicked', () => {
        navigate(AppRoutes.Home)
      })
    }
  }, [navigate])

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
    )
  }

  return null
}
