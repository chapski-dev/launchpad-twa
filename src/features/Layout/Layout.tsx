import { FCWithChildren } from 'types/app';

import { Header } from './components';
import * as S from './style';

type LayoutProps = {
  onSearch?: (searchValue: string) => void;
  searchValue?: string;
};

export const Layout: FCWithChildren<LayoutProps> = (props) => {
  const { children, onSearch, searchValue } = props;

  return (
    <S.Wrapper>
      <Header
        onSearch={onSearch}
        searchValue={searchValue}
      />
      {children}
    </S.Wrapper>
  );
};
