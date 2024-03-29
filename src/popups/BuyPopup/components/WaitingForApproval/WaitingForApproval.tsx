import React, { FC } from 'react'
import * as S from './style'

type WaitingForApprovalProps = {
  waitingApprovalItems: {
    title: string
    description: string
    status: string
  }[]
}

export const WaitingForApproval: FC<WaitingForApprovalProps> = (props) => {
  const { waitingApprovalItems } = props

  return (
    <>
      <S.Header>
        <S.LoaderWrapper>
          <S.LoaderSpiner
            ariaLabel="oval-loading"
            height="46"
            visible
            width="46"
          />
          <S.SvgHourglass />
        </S.LoaderWrapper>
        <div>
          <h4 children="Waiting for Approval Transaction..." />
          <S.Description children="Waiting for Approval Transaction..." />
        </div>
      </S.Header>
      <S.DetailsWrapper>
        {waitingApprovalItems.map((el) => (
          <S.StatusItem className={el.status}>
            <StatusIcon type={el.status as StatusIconProps['type']} />
            <S.StatusInfoWrapper>
              <S.StatusTitle children={el.title} className={el.status} />
              <S.Description children={el.description} />
            </S.StatusInfoWrapper>
          </S.StatusItem>
        ))}
      </S.DetailsWrapper>
    </>
  )
}

type StatusIconProps = {
  type: 'completed' | 'pending' | 'in_order'
}

const StatusIcon: FC<StatusIconProps> = (props) => {
  const { type } = props
  switch (type) {
    case 'completed':
      return (
        <>
          <S.StatusIconWrapper className={type}>
            <S.SvgCheck height={10} width={10} />
          </S.StatusIconWrapper>
          <S.Line className={type} />
        </>
      )
    case 'pending':
      return (
        <>
          <S.StatusIconWrapper className={type}>
            <S.Dot className={type} />
          </S.StatusIconWrapper>
          <S.Line className={type} />
        </>
      )
    default:
      return (
        <>
          <S.StatusIconWrapper>
            <S.Dot />
          </S.StatusIconWrapper>
          <S.Line className={type} />
        </>
      )
  }
}
