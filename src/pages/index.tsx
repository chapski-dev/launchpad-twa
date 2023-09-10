import {
  FC,
  useEffect,
  useState,
  ChangeEvent,
  useCallback,
  useMemo,
} from 'react'
import { useTonConnectUI } from '@tonconnect/ui-react'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { Chains } from 'constants/app'
import { PostsList, ProjectList } from 'domains/Home/components'
import { Loader } from 'domains/Home/components/Projectslist/style'
import * as S from 'domains/Home/style'
import { ConnectWalletButton } from 'features/ConnectWalletButton'
import { useDebounce } from 'hooks/useDebounce/useDebounce'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { Container } from 'ui/Container/Container'
import { Line } from 'ui/Line/Line'
import { TabItem, Tabs } from 'ui/Tabs/Tabs'

const mockTabs = [
  {
    label: 'Demo',
    value: 'demo',
  },
  {
    label: 'Blog',
    value: 'blog',
  },
]

const inter = Inter({ subsets: ['latin'] })

const Home: FC = () => {
  const [selectedTab, setSelectedTab] = useState<TabItem>(mockTabs[0])
  const [searchValue, setSearchValue] = useState<string>('')
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false)

  const debaunceSearchValue = useDebounce(searchValue)

  const [tonConnectUI] = useTonConnectUI()

  const tgOptions = useTelegram()

  useEffect(() => {
    tonConnectUI.onStatusChange((wallet) => {
      if (wallet !== null) {
        if (Chains[wallet.account.chain] === 'mainnet') {
          alert('Please, connect testnet wallet')

          tonConnectUI.disconnect()

          return
        }
      }
    })
  }, [tonConnectUI])

  const handleSearchInputChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(evt.target.value)
    },
    []
  )

  const currentHomeContent = useMemo(() => {
    switch (selectedTab.value) {
      case 'demo':
        return <ProjectList search={debaunceSearchValue} />
      case 'blog':
        return <PostsList />
    }
  }, [debaunceSearchValue, selectedTab.value])

  if (!tgOptions) {
    return <Loader type="projectCard" />
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main className={inter.className}>
        <S.Wrapper>
          <Container>
            <S.HeaderWrapper>
              <S.FlexWrapper>
                <S.Input
                  isFocused={isSearchFocused}
                  onBlur={() => setIsSearchFocused(false)}
                  onChange={handleSearchInputChange}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search"
                />
                {!isSearchFocused && <ConnectWalletButton />}
              </S.FlexWrapper>

              <Tabs
                activeTab={selectedTab}
                onChange={setSelectedTab}
                tabs={mockTabs}
              />
            </S.HeaderWrapper>
          </Container>
          <Line />
          <Container>{currentHomeContent}</Container>
        </S.Wrapper>
      </main>
    </>
  )
}

export default Home
