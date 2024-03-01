import { FC } from 'react'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { useVerificationUserStore } from 'libs/store'
import { SvgRequired, SvgVerified } from 'ui/icons'
import * as S from './style'

export const ProfileBlock: FC = () => {
  const { user } = useTelegram()
  const { verified} = useVerificationUserStore();
  
  return (
    <S.Wrapper>
      <S.ProfileBox>
        <S.BgAvatar>
          <S.ProfileName>{user?.first_name[0]}</S.ProfileName>
        </S.BgAvatar>
        <S.ConfirmationIcon>
          <S.IconStatus>
            {verified ? <SvgVerified /> : <SvgRequired />}
          </S.IconStatus>
        </S.ConfirmationIcon>
      </S.ProfileBox>
      <S.InfoBlock>
        <S.Name>{user?.first_name}</S.Name>
        {!verified ? (
          <S.Pending>Verification required</S.Pending>
        ) : (
          <S.Verified>Account verified</S.Verified>
        )}
      </S.InfoBlock>
    </S.Wrapper>
  )
}
