import React, { FC } from 'react'
import * as S from './style'

export const WaitingForApproval: FC = () => {
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
        {data.map((el) => (
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
  type: "completed" | "pending" | "in_order"
}

const StatusIcon: FC<StatusIconProps> = (props) => {
  const { type } = props;
  switch (type) {
    case "completed":
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


const data = [
  {
    title: 'Waiting for Buy Transaction ',
    description: 'Waiting for Buy Transaction ',
    status: 'completed',
  },
  {
    title: 'Waiting for Oracle To Confirm Tx...',
    description: 'Waiting for Oracle To Confirm Tx...',
    status: 'pending',
  },
  {
    title: 'Deploying TON Wallet and Creating Sale User...',
    description: 'Deploying TON Wallet and Creating Sale User... Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, culpa. Quidem voluptates blanditiis ipsa eligendi labore, fugiat tempore nisi ab temporibus nam nemo voluptate, laudantium dicta. Repudiandae doloremque rem veniam?',
    status: 'in_order',
  },
  {
    title: 'Claiming Cross Chain Funds...',
    description: 'Claiming Cross Chain Funds...',
    status: 'in_order',
  },
  {
    title: 'Deploying TON Wallet and Creating Sale User...',
    description: 'Deploying TON Wallet and Creating Sale User... Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, culpa. Quidem voluptates blanditiis ipsa eligendi labore, fugiat tempore nisi ab temporibus nam nemo voluptate, laudantium dicta. Repudiandae doloremque rem veniam?',
    status: 'in_order',
  },
]
