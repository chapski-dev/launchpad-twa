import { useMemo } from 'react'
import ContentLoader from 'react-content-loader'
import { useTheme } from 'styled-components'
import { FCWithChildren } from 'types/app'
import * as S from './style'

type LoaderProps = {
  type?:
    | 'homePage'
    | 'projectPage'
    | 'participatePage'
    | 'postCard'
    | 'postPage'
    | 'projectCard'
  className?: string
}

export const Loader: FCWithChildren<LoaderProps> = (props) => {
  const { type, className } = props

  const theme = useTheme()

  const loaderContent = useMemo(() => {
    switch (type) {
      case 'homePage':
        return (
          <ContentLoader
            backgroundColor={theme.color.bgSecondary}
            foregroundColor="#ffffff33"
            height={421}
            speed={2.5}
            viewBox="0 0 409 421"
            width={403}
          >
            {/* <rect height="421" width="409" /> */}
            <rect height="32" rx="16" width="168" x="121" y="12" />
            <rect height="32" rx="16" width="32" x="12" y="12" />
            <rect height="32" rx="16" width="75" x="322" y="12" />
            <rect height="95" rx="12" width="385" x="12" y="61" />
            <rect height="23" rx="8" width="100" x="25" y="177" />
            <rect height="18" rx="8" width="107" x="105" y="237" />
            <rect height="18" rx="8" width="287" x="105" y="260" />
            <rect height="18" rx="8" width="217" x="105" y="283" />
            <rect height="80" rx="19" width="80" x="15" y="237" />
            <rect height="18" rx="8" width="107" x="105" y="341" />
            <rect height="18" rx="8" width="287" x="105" y="364" />
            <rect height="18" rx="8" width="217" x="105" y="387" />
            <rect height="80" rx="19" width="80" x="15" y="341" />
            <rect height="23" rx="8" width="100" x="162" y="177" />
            <rect height="4" rx="2" width="120" x="15" y="205" />
          </ContentLoader>
        )
      case 'projectCard':
        return (
          <S.Wrapper className={className}>
            <ContentLoader
              backgroundColor={theme.color.bgSecondary}
              foregroundColor="#ffffff33"
              height={80}
              speed={2.5}
              viewBox="0 0 377 80"
              width={377}
            >
              <rect height="18" rx="8" width="107" x="90" />
              <rect height="18" rx="8" width="287" x="90" y="23" />
              <rect height="18" rx="8" width="217" x="90" y="46" />
              <rect height="80" rx="19" width="80" />
            </ContentLoader>

            <ContentLoader
              backgroundColor={theme.color.bgSecondary}
              foregroundColor="#ffffff33"
              height={80}
              speed={2.5}
              viewBox="0 0 377 80"
              width={377}
            >
              <rect height="18" rx="8" width="107" x="90" />
              <rect height="18" rx="8" width="287" x="90" y="23" />
              <rect height="18" rx="8" width="217" x="90" y="46" />
              <rect height="80" rx="19" width="80" />
            </ContentLoader>
          </S.Wrapper>
        )
      case 'projectPage':
        return (
          <S.Wrapper className={className}>
            <ContentLoader
              backgroundColor={theme.color.bgSecondary}
              foregroundColor="#ffffff33"
              height={546}
              speed={2.5}
              viewBox="0 0 343 546"
              width={343}
            >
              <rect height="80" rx="16" width="80" />
              <rect height="34" rx="12" width="149" y="90" />
              <rect height="32" rx="12" width="149" y="186" />
              <rect height="43" rx="12" width="343" y="230" />
              <rect height="261" rx="12" width="343" y="285" />
              <rect height="20" rx="10" width="253" y="134" />
            </ContentLoader>
          </S.Wrapper>
        )
      case 'participatePage':
      case 'postCard':
        return (
          <S.Wrapper className={className}>
            <ContentLoader
              backgroundColor={theme.color.bgSecondary}
              foregroundColor="#ffffff33"
              height={250}
              speed={2.5}
              viewBox="0 0 359 250"
              width={359}
            >
              <rect height="250" rx="10" width="359" />
            </ContentLoader>
          </S.Wrapper>
        )
      case 'postPage':
        return (
          <ContentLoader
            backgroundColor={theme.color.bgSecondary}
            foregroundColor="#ffffff33"
            height={499}
            speed={2.5}
            viewBox="0 0 410 499"
            width={410}
          >
            <rect height="214" width="410" />
            <rect height="20" width="352" x="14" y="218" />
            <rect height="20" width="300" x="14" y="245" />
            <rect height="20" width="221" x="14" y="301" />
            <rect height="20" width="331" x="14" y="479" />
            <rect height="134" width="376" x="14" y="333" />
          </ContentLoader>
        )
      default:
        return <div>Loading ..</div>
    }
  }, [theme.color.bgSecondary, type, className])

  return loaderContent
}
