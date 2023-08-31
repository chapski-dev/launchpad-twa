import { FC, useState } from 'react'
import { TonConnectButton } from '@tonconnect/ui-react'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { ProjectList } from 'domains/Home/components'
import * as S from 'domains/Home/style'
import { Container } from 'ui/Container/Container'
import { Input } from 'ui/Input/Input'
import { Line } from 'ui/Line/Line'
import { TabItem, Tabs } from 'ui/Tabs/Tabs'

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

const inter = Inter({ subsets: ['latin'] })

const Home: FC = () => {
  const [selectedTab, setSelectedTab] = useState<TabItem>(mockTabs[0])

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main className={inter.className}>
        <S.Wrapper>
          <Container>
            <S.HeaderWrapper>
              <TonConnectButton />
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
      </main>
    </>
  )
}

export default Home
