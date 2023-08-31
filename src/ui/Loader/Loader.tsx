import { FC, useMemo } from 'react'
import ContentLoader from 'react-content-loader'
import { useTheme } from 'styled-components'
import * as S from './style'

type LoaderProps = {
  type?: 'projectCard' | 'projectPage'
  className?: string
}

export const Loader: FC<LoaderProps> = (props) => {
  const { type } = props

  const theme = useTheme()

  const loaderContent = useMemo(() => {
    switch (type) {
      case 'projectCard':
        return (
          <S.Wrapper>
            <ContentLoader
              backgroundColor={theme.color.bgSecondary}
              foregroundColor={'#ffffff33'}
              height={80}
              speed={1}
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
              speed={1}
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
              speed={1}
              viewBox="0 0 320 80"
              width={320}
            >
              <rect height="80" rx="40" width="80" />
              <rect height="18" rx="9" width="111" x="92" />
              <rect height="16" rx="8" width="210" x="92" y="24" />
              <rect height="16" rx="8" width="181" x="92" y="46" />
            </ContentLoader>
          </S.Wrapper>
        )
      case 'projectPage':
        return (
          <S.Wrapper>
            <ContentLoader
              backgroundColor={theme.color.bgSecondary}
              foregroundColor="#ffffff33"
              height={546}
              speed={1}
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
          </S.Wrapper>
        )
      default:
        return <div>Loading ..</div>
    }
  }, [theme.color.bgSecondary, type])

  return loaderContent
}
