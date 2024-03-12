import { FC } from 'react';
import { useRouter } from 'next/router';
import { AppRoutes } from 'constants/app';
import { SvgLoop } from 'ui/icons';
import { ProfileBlock } from './components/ProfileBlock/ProfileBlock';
import * as S from './style';

type HeaderProps = {
  onSearch: ((searchValue: string) => void) | undefined;
  searchValue?: string;
};
export const Header: FC<HeaderProps> = (props) => {
  const { onSearch, searchValue } = props;

  const router = useRouter();

  return (
    <S.FlexWrapper>
      <S.UserInfoWrapper onClick={() => router.push(AppRoutes.Profile)}>
        <ProfileBlock />
      </S.UserInfoWrapper>
      {router.pathname === AppRoutes.Home && (
        <S.Input
          icon={<SvgLoop />}
          onChange={(e) => onSearch!(e.target.value)}
          placeholder="Search"
          value={searchValue}
        />
      )}
    </S.FlexWrapper>
  );
};
