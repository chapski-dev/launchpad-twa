import { FC, useMemo, useState } from 'react'
import { Tokenomic } from 'api/types'
// import { Container } from 'ui/Container/Container'
import { Tabs } from 'ui/Tabs/Tabs'
import { ChartBlock, StatBlock } from './components'
import * as S from './style'

const colors = [
  '#0290E6',
  '#AE0EF9',
  '#40E063',
  '#DD5757',
  '#E0AA40',
  '#027BE2',
]

type IDistributionManagmentProps = {
  tokenomics: Tokenomic[]
}

export const Tokenomics: FC<IDistributionManagmentProps> = (props) => {
  const { tokenomics } = props

  const [activeContentTab, setActiveContentTab] = useState({
    label: 'Tokenomics',
    value: 'tokenomics',
  })

  const totalSupply = useMemo(
    () => tokenomics.reduce((acc, curr) => acc + Number(curr.amount), 0),
    [tokenomics]
  )

  const chartItems = useMemo(() => {
    const tokenomicsChartItems = tokenomics.map((tokenomicItem, idx) => ({
      color: colors[idx],
      percent: Math.floor((Number(tokenomicItem.amount) / totalSupply) * 100),
    }))

    return tokenomicsChartItems
  }, [tokenomics, totalSupply])

  const stats = useMemo(() => {
    const tokenomicsStats = tokenomics.map((distribution, idx) => {
      return {
        label: distribution.name,
        value: distribution.name,
        percent: Number(
          ((Number(distribution.amount) / totalSupply) * 100).toFixed(2)
        ),
        color: colors[idx],
        link: null,
      }
    })

    return tokenomicsStats
  }, [tokenomics, totalSupply])

  const tabs = useMemo(() => {
    const initialTabs = [
      {
        label: 'Tokenomics',
        value: 'tokenomics',
      },
    ]

    return initialTabs
  }, [])

  return (
    // <Container>
    <S.Wrapper>
      <S.Title>Tokenomics:</S.Title>
      <S.ContentWrapper>
        <Tabs
          activeTab={activeContentTab}
          onChange={setActiveContentTab}
          tabs={tabs}
        />
        <ChartBlock chartItems={chartItems} />
        <StatBlock stats={stats} />
      </S.ContentWrapper>
    </S.Wrapper>
    // </Container>
  )
}
