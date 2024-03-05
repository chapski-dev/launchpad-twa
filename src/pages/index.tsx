import { FC, useState, useCallback, useMemo, useEffect } from 'react'
import { useIsConnectionRestored, useTonAddress } from '@tonconnect/ui-react'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { AppRoutes } from 'constants/app'
import { PostsList, ProjectList } from 'domains/Home/components'
import { Loader } from 'domains/Home/components/Projectslist/style'
import * as S from 'domains/Home/style'
import { Layout } from 'features/Layout/Layout'
import { useDebounce } from 'hooks/useDebounce/useDebounce'
import { useProfileContext } from 'hooks/useProfileContext/useProfileContext'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { Container } from 'ui/Container/Container'
import { SvgTokenovaIcon, SvgTonstarterIcon } from 'ui/icons'
import { TabItem, Tabs } from 'ui/Tabs/Tabs'

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
  // {
  //   label: 'TonUp',
  //   value: 'tonup',
  //   icon: <SvgTonupIcon />,
  //   disabled: true,
  // },
  // {
  //   label: 'Blog',
  //   value: 'blog',
  // },
]

const inter = Inter({ subsets: ['latin'] })

const Home: FC = () => {
  const [selectedTab, setSelectedTab] = useState<TabItem>(mockTabs[0])
  const [searchValue, setSearchValue] = useState<string>('')
  const [isPromoImageLoaded, setIsPromoImageLoaded] = useState<boolean>(false)

  const router = useRouter()

  const debaunceSearchValue = useDebounce(searchValue)

  const { invitedBy, balance } = useProfileContext()

  const { webApp, isFirstAppLoad } = useTelegram()

  const isConnectionRestored = useIsConnectionRestored()

  const userWalletAddress = useTonAddress()

  const handleSearchInputChange = useCallback((value: string) => {
    setSearchValue(value)
  }, [])

  useEffect(() => {
    const promoImg = new Image()
    promoImg.src = '/images/testnetLaunch.png'

    promoImg.onload = () => {
      setIsPromoImageLoaded(true)
    }
  }, [])

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

  if (
    !webApp ||
    !isConnectionRestored ||
    !isPromoImageLoaded ||
    (userWalletAddress && typeof balance === 'undefined')
  ) {
    return (
      <S.LoaderWrapper>
        <Loader type="homePage" />
      </S.LoaderWrapper>
    )
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main className={inter.className}>
        <Layout onSearch={handleSearchInputChange}>
          <S.Wrapper>
            <Container>
              <S.PromoImage
                alt="testnet_promo_image"
                onClick={handePromoClick}
                onLoad={() => setIsPromoImageLoaded(true)}
                src={'/images/testnetLaunch.png'}
              />
            </Container>
            {isPromoImageLoaded && (
              <>
                <Container>
                  <S.HeaderWrapper>
                    <Tabs
                      activeTab={selectedTab}
                      onChange={setSelectedTab}
                      tabs={mockTabs}
                    />
                  </S.HeaderWrapper>
                  <button
                    onClick={() => {
                      router.push(AppRoutes.VestingDistribution)
                    }}
                  >
                    VestingDistribution
                  </button>
                </Container>
                <Container>{currentHomeContent}</Container>
              </>
            )}
          </S.Wrapper>
        </Layout>
        {isFirstAppLoad && invitedBy?.username && (
          <S.InvitedAlertBlock userName={invitedBy.username} />
        )}
      </main>
    </>
  )
}

export default Home
