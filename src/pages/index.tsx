import { FC, useState, useCallback, useMemo, useEffect } from 'react'
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
  const [isInvitedByBlockDisplayed, setIsInvitedByBlockDisplayed] =
    useState<boolean>(false)

  const router = useRouter()

  const debaunceSearchValue = useDebounce(searchValue)

  const { invitedBy } = useProfileContext()

  const { webApp } = useTelegram()

  const handleSearchInputChange = useCallback((value: string) => {
    setSearchValue(value)
  }, [])

  useEffect(() => {
    if (webApp) {
      webApp.CloudStorage.getItem(
        'isAlreadyAuthorized',
        (error: any, data: any) => {
          // && invitedBy?.username
          if (data) {
            const timer = setTimeout(() => {
              setIsInvitedByBlockDisplayed(false)
            }, 30000)

            return () => {
              clearTimeout(timer)
            }
          }
        }
      )
    }
  }, [invitedBy, webApp])

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
                </Container>
                <Container>{currentHomeContent}</Container>
              </>
            )}
          </S.Wrapper>
        </Layout>
        {isInvitedByBlockDisplayed && <S.InvitedAlertBlock />}
      </main>
    </>
  )
}

export default Home
