import { FC, useMemo, useState } from 'react'
import { ProjectSaleState } from 'api/types'
import { MarkdownRenderer } from 'features/MarkdownRenderer'
import { Container } from 'ui/Container/Container'
import { Line } from 'ui/Line/Line'
import { Tabs } from 'ui/Tabs/Tabs'
import { DealTerms } from './components'
import * as S from './style'

const tabs = [
  {
    label: 'About',
    value: 'about',
  },
  {
    label: 'Deal terms',
    value: 'deal_tearms',
  },
]

type InfoBlockProps = {
  mdContent?: string
  saleStateData?: ProjectSaleState
}

export const InfoBlock: FC<InfoBlockProps> = (props) => {
  const { mdContent, saleStateData } = props

  const [activeTab, setActiveTab] = useState(tabs[0])

  const infoContent = useMemo(() => {
    switch (activeTab.value) {
      case 'about':
        return <MarkdownRenderer mdContent={mdContent!} />
      case 'deal_tearms':
        return saleStateData && <DealTerms saleStateData={saleStateData} />
    }
  }, [activeTab.value, mdContent, saleStateData])

  return (
    <S.Wrapper>
      <Container>
        <Tabs activeTab={activeTab} onChange={setActiveTab} tabs={tabs} />
      </Container>
      <Line />
      <Container>{infoContent}</Container>
    </S.Wrapper>
  )
}
