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
import { useRouter } from 'next/router'
import { useMutation, useQuery } from 'react-query'
import { getProfile, saveProfile } from 'api'
import { ProfileInfoType } from 'api/types'
import { AppRoutes } from 'constants/app'
import { Chains } from 'constants/blockchain'
import { PostsList, ProjectList } from 'domains/Home/components'
import { Loader } from 'domains/Home/components/Projectslist/style'
import * as S from 'domains/Home/style'
import { BalanceBlock } from 'features/BalanceBlock/BalanceBlock'
import { ConnectWalletButton } from 'features/ConnectWalletButton'
import { useDebounce } from 'hooks/useDebounce/useDebounce'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { Container } from 'ui/Container/Container'
import { SvgTokenovaIcon, SvgTonstarterIcon, SvgTonupIcon } from 'ui/icons'
import { Input } from 'ui/Input/Input'
import { Line } from 'ui/Line/Line'
import { TabItem, Tabs } from 'ui/Tabs/Tabs'
import { getBalance } from 'utils/getBalance'

const mockTabs = [
  {
    label: 'Tokenova',
    value: 'tokenova',
    icon: <SvgTokenovaIcon />,
  },
  {
    label: 'Tonstarter',
    value: 'tonstarter',
    icon: <SvgTonstarterIcon />,
    disabled: true,
  },
  {
    label: 'TonUp',
    value: 'tonup',
    icon: <SvgTonupIcon />,
    disabled: true,
  },
  // {
  //   label: 'Blog',
  //   value: 'blog',
  // },
]

const inter = Inter({ subsets: ['latin'] })

const Home: FC = () => {
  const [selectedTab, setSelectedTab] = useState<TabItem>(mockTabs[0])
  const [searchValue, setSearchValue] = useState<string>('')
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false)

  const router = useRouter()

  const debaunceSearchValue = useDebounce(searchValue)

  const { webApp, user } = useTelegram()

  const [tonConnectUI] = useTonConnectUI()

  const userWalletAddress = useTonAddress()

  const { data: profileInfo, isLoading: isProfileInfoLoading } = useQuery(
    ['profileInfo'],
    () => getProfile({ telegram: user?.username }),
    {
      enabled: Boolean(user?.username),
    }
  )

  const { data: balance } = useQuery(
    ['userBalance'],
    () => getBalance(userWalletAddress, 'testnet'),
    {
      enabled: !!userWalletAddress,
    }
  )

  const { mutate: saveProfileInfo } = useMutation(
    ['saveProfile'],
    (profileData: ProfileInfoType) => saveProfile(profileData)
  )

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
  }, [profileInfo, tonConnectUI])

  useEffect(() => {
    if (webApp && user) {
      const initData = new URLSearchParams(webApp.initData)

      const referrer_id = initData.get('start_param')

      if (!isProfileInfoLoading && !profileInfo) {
        saveProfileInfo({
          email: '',
          name: user.first_name + user.last_name,
          referrer_id: referrer_id || '',
          telegram: user.username,
          walletAddress: '',
          image: '',
          telegramInitData: webApp.initData,
        })

        return
      }
    }
  }, [isProfileInfoLoading, profileInfo, saveProfileInfo, user, webApp])

  const handleSearchInputChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(evt.target.value)
    },
    []
  )

  const currentHomeContent = useMemo(() => {
    switch (selectedTab.value) {
      case 'tokenova':
        return <ProjectList search={debaunceSearchValue} />
      case 'blog':
        return <PostsList />
    }
  }, [debaunceSearchValue, selectedTab.value])

  const handePromoClick = useCallback(() => {
    router.push({
      pathname: AppRoutes.Post,
      query: {
        fileName: 'testnetcoins_post.md',
      },
    })
  }, [router])

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
              {userWalletAddress ? (
                <S.Header>
                  <Input
                    onBlur={() => setIsSearchFocused(false)}
                    onChange={handleSearchInputChange}
                    onFocus={() => setIsSearchFocused(true)}
                    placeholder="Search"
                  />
                  <S.ButtonsWrapper>
                    <BalanceBlock balance={balance} />

                    <ConnectWalletButton />
                  </S.ButtonsWrapper>
                </S.Header>
              ) : (
                <S.FlexWrapper>
                  <S.Input
                    $isFocused={isSearchFocused}
                    onBlur={() => setIsSearchFocused(false)}
                    onChange={handleSearchInputChange}
                    onFocus={() => setIsSearchFocused(true)}
                    placeholder="Search"
                  />
                  <S.ConnectWalletButton />
                </S.FlexWrapper>
              )}

              <S.PromoImage
                alt="testnet_promo_image"
                height={100}
                onClick={handePromoClick}
                src={'/images/testnetLaunch.svg'}
                width={385}
              />

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
