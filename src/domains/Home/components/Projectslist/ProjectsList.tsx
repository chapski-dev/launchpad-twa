import { FC } from 'react'
import { useQuery } from 'react-query'
import { getICOJettons } from 'api'
import { Loader } from 'ui/Loader/Loader'
import { ProjectCard } from './components'
import * as S from './style'

export const ProjectList: FC = () => {
  const {
    data: projects,
    isLoading: isProjectsLoading,
    isSuccess: isProjectsLoaded,
  } = useQuery(['icoProjects'], () => getICOJettons())

  if (isProjectsLoading) {
    return <Loader type="projectCard" />
  }

  if (isProjectsLoaded) {
    return (
      <S.Wrapper>
        {projects.map((project: any, idx: number) => (
          <ProjectCard
            key={idx}
            description={project.metadata.description}
            id={project.id}
            image={project.metadata.image}
            title={project.metadata.name}
          />
        ))}
      </S.Wrapper>
    )
  }

  return null
}
