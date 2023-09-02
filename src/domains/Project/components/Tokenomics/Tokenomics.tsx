import { FC, useMemo, useState } from 'react'
import { tonAddressExplorerLink } from 'constants/app'
import { Container } from 'ui/Container/Container'
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
  distributions: any[]
  totalSupply: number
  icoParams?: any
}

const tabs = [
  {
    label: 'Tokenomics',
    value: 'tokenomics',
  },
  {
    label: 'Sale Fund Distribution',
    value: 'fund',
  },
]

export const Tokenomics: FC<IDistributionManagmentProps> = (props) => {
  const { distributions, totalSupply, icoParams } = props

  const [activeContentTab, setActiveContentTab] = useState(tabs[0])

  const chartItems = useMemo(() => {
    const distributionChartItems = distributions.map((distribution, idx) => ({
      color: colors[idx],
      percent: Math.floor((Number(distribution.value) / totalSupply) * 100),
    }))

    if (icoParams) {
      const icoChartParam = {
        color: colors[distributionChartItems.length],
        percent: Math.floor(
          (Number(icoParams.jettonsAmount) / totalSupply) * 100
        ),
      }

      return [...distributionChartItems, icoChartParam]
    }

    return distributionChartItems
  }, [distributions, icoParams, totalSupply])

  const stats = useMemo(() => {
    const distributionsStats = distributions.map((distribution, idx) => {
      return {
        label: distribution.target + ' distribution',
        value: distribution.value,
        percent: Number(
          ((Number(distribution.value) / totalSupply) * 100).toFixed(2)
        ),
        color: colors[idx],
        link: tonAddressExplorerLink + distribution.address,
      }
    })

    if (icoParams) {
      const icoStats = {
        label: 'ICO',
        value: icoParams.jettonsAmount,
        percent: Math.floor(
          (Number(icoParams.jettonsAmount) / totalSupply) * 100
        ),
        color: colors[distributionsStats.length],
        link: tonAddressExplorerLink + icoParams.address,
      }

      return [...distributionsStats, icoStats]
    }

    return distributionsStats
  }, [distributions, icoParams, totalSupply])

  return (
    <Container>
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
    </Container>
  )
}
