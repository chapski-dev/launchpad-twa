import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getICOJettons } from 'api';
import { ProjectCard } from './components';
import * as S from './style';

type ProjectListProps = {
  search: string;
};

export const ProjectList: FC<ProjectListProps> = (props) => {
  const { search } = props;

  const {
    data: projects,
    isLoading: isProjectsLoading,
    isSuccess: isProjectsLoaded,
  } = useQuery({
    queryKey: ['icoProjects', search],
    queryFn: () => getICOJettons({ q: search }),
  });
  
  if (isProjectsLoading) {
    return <S.Loader type="projectCard" />;
  }

  if (isProjectsLoaded) {
    return (
      <S.Wrapper>
        {projects?.length > 0 ? (
          projects.map((project: any, idx: number) => (
            <ProjectCard
              key={idx}
              description={project.description}
              icoMasterAddress={project.icoMasterAddress}
              id={project.id}
              image={project.image}
              title={project.name}
            />
          ))
        ) : (
          <S.NotFoundBlock>
            <S.Label>Oops! Project not found :c</S.Label>
          </S.NotFoundBlock>
        )}
      </S.Wrapper>
    );
  }

  return null;
};
