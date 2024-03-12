import { FC, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TnC } from '@ton-and-company/sdk';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { AppRoutes } from 'constants/app';
import { toHumanNumber } from 'utils/toHumanNumber';
import * as S from './style';

type ProjectCardProps = {
  image: string;
  title: string;
  description: string;
  id: string;
  icoMasterAddress: string;
};

export const ProjectCard: FC<ProjectCardProps> = (props) => {
  const { image, title, description, id, icoMasterAddress } = props;

  const router = useRouter();

  const { data: icoInfo } = useQuery({
    queryKey: ['icoInfo', icoMasterAddress],
    queryFn: () => TnC.icoInfo(icoMasterAddress),
  });

  const handleProjectCardClick = () => {
    router.push({
      pathname: AppRoutes.Project,
      query: {
        id,
      },
    });
  };

  const currentSaleProgressLabel = useMemo(() => {
    if (!icoInfo) {
      return '';
    }

    const currentSuppliedAmount = Number(toHumanNumber(icoInfo.supplied));

    const currentSoftCapAmount = Number(toHumanNumber(icoInfo?.softCap));

    const currentTotalSupplyAmount = Number(toHumanNumber(icoInfo.totalSupply));

    const isSaleSuccessfull = icoInfo.hasSoftCap
      ? currentSuppliedAmount >= currentSoftCapAmount
      : currentSuppliedAmount === currentTotalSupplyAmount;

    switch (true) {
      case icoInfo.state === 'in-progress':
        const saleProgressPercent = Math.floor(
          (currentSuppliedAmount / currentTotalSupplyAmount) * 100
        );

        return `Sale Progress ${saleProgressPercent}%`;
      case icoInfo.state === 'not-started':
        return `Sale will start in ${dayjs(icoInfo.startTime).format(
          'DD/MM/YYYY'
        )}`;
      case icoInfo.state === 'failed':
        return 'Sale Failed';
      case icoInfo.saleMode === 1 && isSaleSuccessfull:
        return 'Sale Successful';
    }
  }, [icoInfo]);

  return (
    <S.Wrapper onClick={handleProjectCardClick}>
      <S.Image alt="project_image" src={image || '/images/mock.svg'} />
      <S.InfoWrapper>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
        <S.FlexWrapper>
          <S.Label>{currentSaleProgressLabel}</S.Label>
        </S.FlexWrapper>
      </S.InfoWrapper>
    </S.Wrapper>
  );
};
