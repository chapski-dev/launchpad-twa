import { FC } from 'react'
import { useQuery } from 'react-query'
import { getICOJettons } from 'api'
import { ProjectCard } from './components'
import * as S from './style'

type ProjectListProps = {
  search: string
}

export const ProjectList: FC<ProjectListProps> = (props) => {
  const { search } = props

  const {
    data: projects,
    isLoading: isProjectsLoading,
    isSuccess: isProjectsLoaded,
  } = useQuery(['icoProjects', search], () =>
    getICOJettons({ search, isFake: true })
  )

  if (isProjectsLoading) {
    return <S.Loader type="projectCard" />
  }

  if (isProjectsLoaded) {
    return (
      <S.Wrapper>
        {projects?.length > 0 ? (
          projects.map((project: any, idx: number) => (
            <ProjectCard
              key={idx}
              description={project.metadata.description}
              icoMasterAddress={project.icoMasterAddress}
              id={project.id}
              image={project.metadata.image}
              title={project.metadata.name}
            />
          ))
        ) : (
          <S.NotFoundBlock>
            <S.Label>Oops! Project not found :c</S.Label>
          </S.NotFoundBlock>
        )}
      </S.Wrapper>
    )
  }

  return null
}
