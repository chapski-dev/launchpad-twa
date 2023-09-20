import {
  FC,
  useEffect,
  useState,
  ChangeEvent,
  useCallback,
  useMemo,
} from 'react'
import { useTonConnectUI, useTonAddress } from '@tonconnect/ui-react'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { useMutation, useQuery } from 'react-query'
import { getProfile, saveProfile } from 'api'
import { ProfileInfoType } from 'api/types'
import { Chains } from 'constants/app'
import { PostsList, ProjectList } from 'domains/Home/components'
import { Loader } from 'domains/Home/components/Projectslist/style'
import * as S from 'domains/Home/style'
import { ConnectWalletButton } from 'features/ConnectWalletButton'
import { useDebounce } from 'hooks/useDebounce/useDebounce'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { Button } from 'ui/Button/Button'
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

  const { webApp, user } = useTelegram()

  const [tonConnectUI] = useTonConnectUI()

  const userWalletAddress = useTonAddress()

  const { data: profileInfo, refetch: refetchProfileInfo } = useQuery(
    ['profileInfo'],
    () => getProfile({ walletAddress: userWalletAddress }),
    {
      enabled: Boolean(userWalletAddress),
    }
  )

  const { mutate: saveProfileInfo } = useMutation(
    ['saveProfile'],
    (profileData: ProfileInfoType) => saveProfile(profileData)
  )

  // console.log(profileInfo)

  useEffect(() => {
    tonConnectUI.onStatusChange((wallet) => {
      if (wallet !== null) {
        if (Chains[wallet.account.chain] === 'mainnet') {
          alert('Please, connect testnet wallet')

          tonConnectUI.disconnect()

          return
        }

        // const initData = new URLSearchParams(tgOptions.tg.initData)

        // const referrer_id = initData.get('start_param')

        // refetchProfileInfo()

        // console.log(profileInfo)

        // if (!profileInfo || !profileInfo?.referrer_id) {
        //   console.log(referrer_id)
        // }
      }
    })
  }, [profileInfo, refetchProfileInfo, tonConnectUI])

  useEffect(() => {
    if (webApp && user) {
      if (userWalletAddress && !profileInfo) {
        const initData = new URLSearchParams(webApp?.initData)

        const referrer_id = initData.get('start_param')

        if (!profileInfo) {
          // saveProfileInfo({
          //   email: '',
          //   name: user.first_name + user.last_name,
          //   referrer_id: referrer_id || '',
          //   telegram: user.username,
          //   walletAddress: userWalletAddress,
          //   image: '',
          // })
        }
      }
    }
  }, [
    profileInfo,
    refetchProfileInfo,
    saveProfileInfo,
    user,
    userWalletAddress,
    webApp,
    webApp?.initData,
  ])

  // useEffect(() => {
  //   if (tgOptions && tgOptions?.tg) {
  //     const initData = new URLSearchParams(tgOptions.tg.initData)

  //     console.log(initData.get('start_param'))
  //   }
  // }, [tgOptions])

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

  if (!webApp) {
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
          <Button
            onClick={() =>
              saveProfileInfo({
                email: '',
                name: 'Test',
                referrer_id: 'referrer_12314481741' || '',
                telegram: 'maksimmm',
                walletAddress: userWalletAddress,
                image: '',
              })
            }
          >
            Test save profile
          </Button>
          <Container>{currentHomeContent}</Container>
        </S.Wrapper>
      </main>
    </>
  )
}

export default Home
