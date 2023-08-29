import { FC, useState } from 'react'
import { Container } from 'ui/Container/Container'
import { Input } from 'ui/Input/Input'
import { Line } from 'ui/Line/Line'
import { TabItem, Tabs } from 'ui/Tabs/Tabs'
import { ProjectList } from './components'
import * as S from './style'

const mockTabs = [
  {
    label: 'Demo',
    value: 'demo',
  },
  {
    label: 'ICO Launched',
    value: 'ico_launched',
  },
]

export const Home: FC = () => {
  const [selectedTab, setSelectedTab] = useState<TabItem>(mockTabs[0])

  return (
    <S.Wrapper>
      <Container>
        <S.HeaderWrapper>
          <Input
            onChange={(evt) => console.log(evt.target.value)}
            placeholder="Search"
          />
          <Tabs
            activeTab={selectedTab}
            onChange={setSelectedTab}
            tabs={mockTabs}
          />
        </S.HeaderWrapper>
      </Container>
      <Line />
      <Container>
        <ProjectList />
      </Container>
    </S.Wrapper>
  )
}
