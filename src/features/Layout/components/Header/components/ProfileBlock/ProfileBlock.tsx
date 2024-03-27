import { FC } from 'react'
import { useTonAddress } from '@tonconnect/ui-react'
import { useProfileContext } from 'hooks/useProfileContext/useProfileContext'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { SvgRequired, SvgVerified } from 'ui/icons'
import * as S from './style'

export const ProfileBlock: FC = () => {
  const { user } = useTelegram()

  const userWalletAddress = useTonAddress()

  const { xapiProfileInfo } = useProfileContext()

  return (
    <S.Wrapper>
      <S.ProfileBox>
        <S.BgAvatar>
          <S.ProfileName>{user?.first_name[0]}</S.ProfileName>
        </S.BgAvatar>
        <S.ConfirmationIcon>
          <S.IconStatus>
            {userWalletAddress ? <SvgVerified /> : <SvgRequired />}
          </S.IconStatus>
        </S.ConfirmationIcon>
      </S.ProfileBox>
      <S.InfoBlock>
        <S.Name>{user?.first_name}</S.Name>
        {!userWalletAddress ? (
          <S.Status
            children="Verification required"
            state={xapiProfileInfo?.state}
          />
        ) : (
          <S.Status children="Ready for participation!" state={'verified'} />
        )}
      </S.InfoBlock>
    </S.Wrapper>
  )
}
