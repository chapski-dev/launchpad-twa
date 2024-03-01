import { FC, useState } from 'react'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { SvgRequired, SvgVerified } from 'ui/icons'
import * as S from './style'

export const ProfileBlock: FC = () => {
  const { user } = useTelegram()

  const [statusVerified] = useState(false);

  return (
    <S.Wrapper>
      <S.ProfileBox>
        <S.BgAvatar>
          <S.ProfileName>{user?.first_name[0]}</S.ProfileName>
        </S.BgAvatar>
        <S.ConfirmationIcon>
          <S.IconStatus>
            {statusVerified ? <SvgVerified /> : <SvgRequired />}
          </S.IconStatus>
        </S.ConfirmationIcon>
      </S.ProfileBox>
      <S.InfoBlock>
        <S.Name>{user?.first_name}</S.Name>
        {!statusVerified ? (
          <S.Pending>Verification required</S.Pending>
        ) : (
          <S.Verified>Account verified</S.Verified>
        )}
      </S.InfoBlock>
    </S.Wrapper>
  )
}
