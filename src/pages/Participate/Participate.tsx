import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import 'rc-slider/assets/index.css'

import Slider from 'rc-slider'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { useTheme } from 'styled-components'
import { getICOProjectById } from 'api'
import { AppRoutes } from 'constants/app'
import { useCustomBackButton } from 'hooks/useCustomBackButton/useCustomBackButton'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { Container } from 'ui/Container/Container'
import { Input } from 'ui/Input/Input'
import { Loader } from 'ui/Loader/Loader'
import { formatNumberWithSeparators } from 'utils/formatNumberWithSeparators'

import * as S from './style'

const mockData = {
  minAmount: 50,
  maxAmount: 2000,
}

const heightMarks = {
  0: '0%',
  25: '25%',
  50: '50%',
  75: '75%',
  100: '100%',
}

export const Participate: FC = () => {
  const [currentJettonsBuyAmount, setCurrentJettonsBuyAmount] =
    useState<number>(mockData.minAmount)

  const theme = useTheme()

  const { id } = useParams()

  const { tg } = useTelegram()

  const navigate = useNavigate()

  useCustomBackButton()

  const {
    data: project,
    isLoading: isProjectLoading,
    isSuccess: isProjectLoaded,
  } = useQuery(['icoProject'], () => getICOProjectById(id as string), {
    enabled: Boolean(id),
  })

  useEffect(() => {
    if (project) {
      tg.MainButton.setText('Buy ' + project.metadata.symbol)
      tg.MainButton.show()
      tg.MainButton.onClick(() => alert('Mock handler to buy jettons!'))
    }

    tg.onEvent('backButtonClicked', () => {
      navigate(`${AppRoutes.Project}/${id}`)
    })

    return () => {
      tg.offEvent('backButtonClicked', () => {
        navigate(`${AppRoutes.Project}/${id}`)
      })

      tg.MainButton.hide()
    }
  }, [id, navigate, project, tg])

  const handleSliderValueChange = useCallback((value: number) => {
    const minBuyAmountPercent =
      (Number(mockData.minAmount) / mockData.maxAmount) * 100

    const updatedAmountValue = Math.round((value / 100) * mockData.maxAmount)

    if (updatedAmountValue >= minBuyAmountPercent) {
      setCurrentJettonsBuyAmount(Math.round((value / 100) * mockData.maxAmount))
    }
  }, [])

  const sliderValue = useMemo(
    () => (Number(currentJettonsBuyAmount) / mockData.maxAmount) * 100,
    [currentJettonsBuyAmount]
  )

  if (isProjectLoading) {
    return <Loader />
  }

  if (isProjectLoaded) {
    return (
      <Container>
        <S.Wrapper>
          <S.Title>Buy {project.metadata.symbol} jettons</S.Title>
          <S.InfoBlockWrapper>
            <S.InfoTitle>
              {formatNumberWithSeparators(mockData.minAmount)}
            </S.InfoTitle>
            <S.InfoLabel>Minimum investment</S.InfoLabel>
          </S.InfoBlockWrapper>
          <S.InfoBlockWrapper>
            <S.InfoTitle>
              {formatNumberWithSeparators(mockData.maxAmount)}
            </S.InfoTitle>
            <S.InfoLabel>Maximum investment</S.InfoLabel>
          </S.InfoBlockWrapper>
          <S.InputWrapper>
            <Input
              onChange={(evt) =>
                setCurrentJettonsBuyAmount(Number(evt.target.value))
              }
              placeholder={`Enter amount of ${project.metadata.symbol} jettons`}
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
      </Container>
    )
  }

  return null
}
