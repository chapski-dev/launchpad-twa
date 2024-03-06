import { FC, ReactElement, useMemo, useState } from 'react'
import { SvgCheck, SvgPending, SvgRightArrow } from 'ui/icons'
import * as S from './style'

type TaskProps = {
  title: string
  description: string
  icon: ReactElement
  onClick?: () => void
  status: 'success' | 'pending' | 'not_started'
  className?: string
}

export const Task: FC<TaskProps> = (props) => {
  const { title, description, icon, onClick, status, className } = props

  const [taskStatus] = useState(status)

  const renderSVG = useMemo(() => {
    return (status: 'success' | 'pending' | 'not_started') => {
      switch (status) {
        case 'success':
          return <SvgCheck />
        case 'pending':
          return <SvgPending />
        case 'not_started':
          return <SvgRightArrow />
      }
    }
  }, [])

  return (
    <S.Wrapper className={className} $taskStatus={taskStatus} onClick={onClick}>
      <S.LeftBlock>
        <S.Icon $taskStatus={taskStatus}>{icon}</S.Icon>
        <S.Info>
          <S.Title $taskStatus={taskStatus}>
            {title}
            <S.Warning $taskStatus={taskStatus}>*</S.Warning>
          </S.Title>
          <S.Description $taskStatus={taskStatus}>{description}</S.Description>
        </S.Info>
      </S.LeftBlock>
      <S.StatusSvg>{renderSVG(taskStatus)}</S.StatusSvg>
    </S.Wrapper>
  )
}
