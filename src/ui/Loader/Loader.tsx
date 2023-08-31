import { FC, useMemo } from 'react'
import ContentLoader from 'react-content-loader'
import { useTheme } from 'styled-components'
import * as S from './style'

type LoaderProps = {
  type?: 'projectCard' | 'projectPage'
}

export const Loader: FC<LoaderProps> = (props) => {
  const { type } = props

  const theme = useTheme()

  const loaderContent = useMemo(() => {
    switch (type) {
      case 'projectCard':
        return (
          <>
            <ContentLoader
              backgroundColor={theme.color.bgSecondary}
              foregroundColor={'#ffffff33'}
              height={80}
              speed={2}
              viewBox="0 0 320 80"
              width={320}
            >
              <rect height="80" rx="40" width="80" />
              <rect height="18" rx="9" width="111" x="92" />
              <rect height="16" rx="8" width="210" x="92" y="24" />
              <rect height="16" rx="8" width="181" x="92" y="46" />
            </ContentLoader>
            <ContentLoader
              backgroundColor={theme.color.bgSecondary}
              foregroundColor="#ffffff33"
              height={80}
              speed={2}
              viewBox="0 0 320 80"
              width={320}
            >
              <rect height="80" rx="40" width="80" />
              <rect height="18" rx="9" width="111" x="92" />
              <rect height="16" rx="8" width="210" x="92" y="24" />
              <rect height="16" rx="8" width="181" x="92" y="46" />
            </ContentLoader>
            <ContentLoader
              backgroundColor={theme.color.bgSecondary}
              foregroundColor="#ffffff33"
              height={80}
              speed={2}
              viewBox="0 0 320 80"
              width={320}
            >
              <rect height="80" rx="40" width="80" />
              <rect height="18" rx="9" width="111" x="92" />
              <rect height="16" rx="8" width="210" x="92" y="24" />
              <rect height="16" rx="8" width="181" x="92" y="46" />
            </ContentLoader>
          </>
        )
      case 'projectPage':
        return (
          // <S.Wrapper>
          <ContentLoader
            backgroundColor={theme.color.bgSecondary}
            foregroundColor="#ffffff33"
            height={546}
            speed={2}
            viewBox="0 0 343 546"
            width={343}
          >
            <rect height="80" rx="40" width="80" />
            <rect height="34" rx="12" width="149" y="90" />
            <rect height="32" rx="12" width="149" y="186" />
            <rect height="43" rx="12" width="343" y="230" />
            <rect height="261" rx="12" width="343" y="285" />
            <rect height="20" rx="10" width="253" y="134" />
          </ContentLoader>
          // </S.Wrapper>
        )
    }
  }, [theme.color.bgSecondary, type])

  return <S.Wrapper>{loaderContent}</S.Wrapper>
}

{
  /* <svg width="343" height="546" viewBox="0 0 343 546" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="80" height="80" rx="40" fill="#D9D9D9"/>
<rect y="90" width="149" height="34" rx="12" fill="#D9D9D9"/>
<rect y="186" width="149" height="32" rx="12" fill="#D9D9D9"/>
<rect y="230" width="343" height="43" rx="12" fill="#D9D9D9"/>
<rect y="285" width="343" height="261" rx="12" fill="#D9D9D9"/>
<rect y="134" width="253" height="20" rx="10" fill="#D9D9D9"/>
</svg> */
}
