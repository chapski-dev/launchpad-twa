import { FC, useState, useMemo } from 'react'
import { Container } from 'ui/Container/Container'
import { Line } from 'ui/Line/Line'
import { Tabs } from 'ui/Tabs/Tabs'
import { About } from './components'
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

export const InfoBlock: FC = () => {
  const [activeTab, setActiveTab] = useState(tabs[0])

  const infoContent = useMemo(() => {
    switch (activeTab.value) {
      case 'about':
        return <About />
      //   case 'deal_terms':
      // return <DealTerms />
    }
  }, [activeTab.value])

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
