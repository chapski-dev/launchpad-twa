import { FC, useCallback, useMemo, useState } from 'react'
import 'rc-slider/assets/index.css'

import { TnC } from '@ton-and-company/sdk'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Slider from 'rc-slider'
import { useQuery } from 'react-query'
import { useTheme } from 'styled-components'
import { Address } from 'ton-core'
import { getICOProjectById } from 'api'
import { AppRoutes } from 'constants/app'
import * as S from 'domains/Participate/style'
import { BackButton } from 'features/BackButton'
import { MainButton } from 'features/MainButton'
import { Container } from 'ui/Container/Container'
import { FadeInWrapper } from 'ui/FadeInWrapper/FadeInWrapper'
import { Input } from 'ui/Input/Input'
import { Loader } from 'ui/Loader/Loader'
import { formatNumberWithSeparators } from 'utils/formatNumberWithSeparators'
import { getBalance } from 'utils/getBalance'

const heightMarks = {
  0: '0%',
  25: '25%',
  50: '50%',
  75: '75%',
  100: '100%',
}

const Participate: FC = () => {
  const [currentJettonsBuyAmount, setCurrentJettonsBuyAmount] =
    useState<number>(0)

  const [isTrxChecking, setIsTrxChecking] = useState<boolean>(false)

  const router = useRouter()

  const { id } = router.query

  const theme = useTheme()

  const userWalletAddress = useTonAddress()

  const [tonConnectUI] = useTonConnectUI()

  const {
    data: projectSideInfo,
    isLoading: isProjectSideLoading,
    isSuccess: isProjectSideLoaded,
  } = useQuery(['projectSideInfo'], () => TnC.projectInfo(1), {
    onSuccess: (data) => {
      setCurrentJettonsBuyAmount(data.minimumBuyTON)
    },
  })

  const {
    data: project,
    isLoading: isProjectLoading,
    isSuccess: isProjectLoaded,
  } = useQuery(['icoProject'], () => getICOProjectById(id as string), {
    enabled: Boolean(id),
  })

  const {
    data: balance,
    isLoading: isBalanceLoading,
    isSuccess: isBalanceLoaded,
  } = useQuery(
    ['userBalance'],
    () => getBalance(userWalletAddress, 'testnet'),
    {
      enabled: !!userWalletAddress,
    }
  )

  const handleBuyJettonsClick = useCallback(async () => {
    if (!project || typeof balance !== 'number' || !projectSideInfo) {
      console.log(project, balance, projectSideInfo)
      return
    }

    if (balance - 0.2 < currentJettonsBuyAmount) {
      alert(
        `You don't have enough TON in your account to purchase ${project.metadata.symbol}`
      )
      return
    }

    const icoParams = project.tokenomics.find(
      (tokenomic: any) => tokenomic.name === 'ico'
    )?.value

    const trxMessage = await TnC.buyJettons(
      Address.parse(icoParams.address),
      Address.parse(userWalletAddress),
      BigInt(currentJettonsBuyAmount)
    )

    const deployParams = {
      validUntil: Date.now() + 100000,
      messages: [trxMessage],
    }

    const trx = await tonConnectUI.sendTransaction(deployParams)

    if (trx.boc) {
      setIsTrxChecking(true)

      let currentAttempts = 0

      const checkTransactionStatus = async () => {
        if (currentAttempts >= 5) {
          setIsTrxChecking(false)
          alert(
            'Exceeded maximum number of attempts to check your transaction.'
          )
          return
        }

        const result = await TnC.waitForBuyTx(trx.boc, currentAttempts)

        if (result.ready) {
          setIsTrxChecking(false)

          router.push({
            pathname: AppRoutes.Complete,
            query: {
              symbol: project.metadata.symbol,
              amount: currentJettonsBuyAmount,
            },
          })

          // alert(
          //   `You have successfully purchased ${project.metadata.symbol} jettons!`
          // )
        } else {
          currentAttempts++

          setTimeout(checkTransactionStatus, 1000)
        }
      }

      checkTransactionStatus()
    }
  }, [
    balance,
    currentJettonsBuyAmount,
    project,
    projectSideInfo,
    router,
    tonConnectUI,
    userWalletAddress,
  ])

  const handleSliderValueChange = useCallback(
    (value: number) => {
      if (!projectSideInfo) {
        return
      }

      const minBuyAmountPercent =
        (Number(projectSideInfo.minimumBuyTON) /
          projectSideInfo.maximumBuyTON) *
        100

      const updatedAmountValue = Math.round(
        (value / 100) * projectSideInfo.maximumBuyTON
      )

      if (value >= minBuyAmountPercent) {
        setCurrentJettonsBuyAmount(updatedAmountValue)
      }
    },
    [projectSideInfo]
  )

  const sliderValue = useMemo(() => {
    if (!projectSideInfo) {
      return
    }

    return (
      (Number(currentJettonsBuyAmount) / projectSideInfo.maximumBuyTON) * 100
    )
  }, [currentJettonsBuyAmount, projectSideInfo])

  if (isProjectSideLoading || isProjectLoading || isBalanceLoading) {
    return <Loader type="participatePage" />
  }

  if (isProjectLoaded && isProjectSideLoaded && isBalanceLoaded) {
    return (
      <>
        <Head>
          <title>Project</title>
        </Head>
        <FadeInWrapper>
          <Container>
            <BackButton onClick={() => router.back()} />
            <S.Wrapper>
              <S.Title>Buy {project.metadata.symbol} jettons</S.Title>
              <S.InfoBlockWrapper>
                <S.InfoTitle>
                  {formatNumberWithSeparators(projectSideInfo.minimumBuyTON)}
                </S.InfoTitle>
                <S.InfoLabel>Minimum investment</S.InfoLabel>
              </S.InfoBlockWrapper>
              <S.InfoBlockWrapper>
                <S.InfoTitle>
                  {formatNumberWithSeparators(projectSideInfo.maximumBuyTON)}
                </S.InfoTitle>
                <S.InfoLabel>Maximum investment</S.InfoLabel>
              </S.InfoBlockWrapper>
              <S.InputWrapper>
                <Input
                  max={projectSideInfo.maximumBuyTON}
                  min={projectSideInfo.maximumBuyTON}
                  onChange={(evt) =>
                    setCurrentJettonsBuyAmount(Number(evt.target.value))
                  }
                  placeholder={`Enter amount of ${project.metadata.symbol} jettons`}
                  type="number"
                  value={currentJettonsBuyAmount}
                />
                <Slider
                  activeDotStyle={{
                    borderColor: theme.color.btn,
                  }}
                  handleStyle={{
                    border: 'solid 2px ' + theme.color.btn,
                  }}
                  marks={heightMarks}
                  max={100}
                  min={0}
                  onChange={(e) => handleSliderValueChange(Number(e))}
                  step={1}
                  style={{ width: '95%', margin: '0 auto' }}
                  trackStyle={{
                    backgroundColor: theme.color.btn,
                  }}
                  value={sliderValue}
                />
              </S.InputWrapper>
            </S.Wrapper>
            <MainButton
              onClick={handleBuyJettonsClick}
              progress={isTrxChecking}
              text={'Buy ' + project?.metadata.symbol}
            />
          </Container>
        </FadeInWrapper>
      </>
    )
  }

  return null
}

export default Participate
