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
  icoFundDistributions: any[]
}

export const Tokenomics: FC<IDistributionManagmentProps> = (props) => {
  const { distributions, totalSupply, icoParams, icoFundDistributions } = props

  const [activeContentTab, setActiveContentTab] = useState({
    label: 'Tokenomics',
    value: 'tokenomics',
  })

  const currentDistributions = useMemo(() => {
    return activeContentTab.value === 'fund'
      ? icoFundDistributions
      : distributions
  }, [activeContentTab.value, distributions, icoFundDistributions])

  const chartItems = useMemo(() => {
    const distributionChartItems = currentDistributions.map(
      (distribution, idx) => ({
        color: colors[idx],
        percent: Math.floor((Number(distribution.value) / totalSupply) * 100),
      })
    )

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
  }, [currentDistributions, icoParams, totalSupply])

  const stats = useMemo(() => {
    const distributionsStats = currentDistributions.map((distribution, idx) => {
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
  }, [currentDistributions, icoParams, totalSupply])

  const tabs = useMemo(() => {
    const initialTabs = [
      {
        label: 'Tokenomics',
        value: 'tokenomics',
      },
    ]

    if (icoFundDistributions) {
      initialTabs.push({
        label: 'Sale Fund Distribution',
        value: 'fund',
      })
    }

    return initialTabs
  }, [icoFundDistributions])

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
