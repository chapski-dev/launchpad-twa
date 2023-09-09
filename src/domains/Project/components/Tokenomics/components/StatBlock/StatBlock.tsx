import { FC, Fragment } from 'react'
import { Line } from 'ui/Line/Line'
import * as S from './style'

type StatBlockProps = {
  stats: {
    label: string
    value: string
    link: string | null
    color: string
    percent: number
  }[]
}

export const StatBlock: FC<StatBlockProps> = (props) => {
  const { stats } = props

  return (
    <S.Wrapper>
      {stats.map(({ label, value, link, color, percent }, idx) => (
        <Fragment key={idx}>
          <S.StatItem key={value}>
            <S.StatItemInfoWrapper>
              <S.StatItemHeader>
                <S.Title className="font-medium text-white">{label}</S.Title>
                {link && (
                  <S.Link href={link} rel="norefferer" target="_blank">
                    <S.Button>View more</S.Button>
                  </S.Link>
                )}
              </S.StatItemHeader>
              <S.Label className="text-sm text-gray-light">
                {value} ({percent}%)
              </S.Label>
            </S.StatItemInfoWrapper>
            <S.ProgressBar>
              <S.ProgressLine color={color} width={percent} />
            </S.ProgressBar>
          </S.StatItem>
          {idx !== stats.length - 1 && <Line />}
        </Fragment>
      ))}
    </S.Wrapper>
  )
}
