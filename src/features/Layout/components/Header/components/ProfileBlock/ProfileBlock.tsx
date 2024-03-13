import { FC } from 'react'
import { useProfileContext } from 'hooks/useProfileContext/useProfileContext';
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { SvgRequired, SvgVerified } from 'ui/icons'
import * as S from './style'

export const ProfileBlock: FC = () => {
  const { user } = useTelegram()

  const { xapiProfileInfo } = useProfileContext();

  return (
    <S.Wrapper>
      <S.ProfileBox>
        <S.BgAvatar>
          <S.ProfileName>{user?.first_name[0]}</S.ProfileName>
        </S.BgAvatar>
        <S.ConfirmationIcon>
          <S.IconStatus>
            {xapiProfileInfo?.state === 'verified' ? <SvgVerified /> : <SvgRequired />}
          </S.IconStatus>
        </S.ConfirmationIcon>
      </S.ProfileBox>
      <S.InfoBlock>
        <S.Name>{user?.first_name}</S.Name>
        {xapiProfileInfo?.state === 'unverified' ? (
          <S.Status children="Verification required" state={xapiProfileInfo?.state} />
        ) : (
          <S.Status children="Account verified" state={xapiProfileInfo?.state} />
        )}
      </S.InfoBlock>
    </S.Wrapper>
  )
}
