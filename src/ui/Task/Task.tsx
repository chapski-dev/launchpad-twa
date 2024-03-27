import { FC, useMemo } from 'react'
import {
  SvgCheck,
  SvgIdentificationCard,
  SvgPending,
  SvgRightArrow,
  SvgTglogo,
  SvgWalletImg,
  SvgXcomlogo,
} from 'ui/icons'
import * as S from './style'

export type TaskProps = {
  title?: string
  description?: string
  type: 'telegram' | 'twitter' | 'wallet' | 'kyc'
  onClick?: () => void
  status?: 'done' | 'pending' | 'not-started'
  className?: string
  optional?: boolean
  done?: boolean
  disabled?: boolean
}

export const Task: FC<TaskProps> = (props) => {
  const {
    title,
    description,
    type,
    onClick,
    status,
    className,
    optional,
    done,
    disabled,
  } = props

  const renderStatusIcon = useMemo(() => {
    return (status?: TaskProps['status']) => {
      switch (status) {
        case 'done':
          return <SvgCheck />
        case 'pending':
          return <SvgPending />
        case 'not-started':
          return <SvgRightArrow />
        default:
          return null
      }
    }
  }, [])

  const renderItemIcon = useMemo(() => {
    return (type?: TaskProps['type']) => {
      switch (type) {
        case 'kyc':
          return <SvgIdentificationCard />
        case 'telegram':
          return <SvgTglogo />
        case 'twitter':
          return <SvgXcomlogo />
        case 'wallet':
          return <SvgWalletImg />
        default:
          return null
      }
    }
  }, [])

  return (
    <S.Wrapper
      $status={status}
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      <S.LeftBlock>
        <S.Icon $status={status}>{renderItemIcon(type)}</S.Icon>
        <S.Info>
          <S.Title $status={status}>
            {title}
            {!optional && !done && <S.Required children="*" />}
          </S.Title>
          <S.Description children={description} $status={status} />
        </S.Info>
      </S.LeftBlock>
      <S.StatusSvg>{renderStatusIcon(status)}</S.StatusSvg>
    </S.Wrapper>
  )
}
