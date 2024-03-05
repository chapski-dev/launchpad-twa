import { ChangeEvent, FC, useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { AppRoutes } from 'constants/app'
import { SvgLoop } from 'ui/icons'
import { ProfileBlock } from './components/ProfileBlock/ProfileBlock'
import * as S from './style'

export const Header: FC = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [, setIsSearchFocused] = useState<boolean>(false)
  const handleSearchInputChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(evt.target.value)
    },
    []
  )

  const router = useRouter()

  return (
    <S.FlexWrapper>
      <S.UserInfoWrapper onClick={() => router.push(AppRoutes.Profile)}>
        <ProfileBlock />
      </S.UserInfoWrapper>
      <S.Input
        icon={<SvgLoop />}
        onBlur={() => setIsSearchFocused(false)}
        onChange={handleSearchInputChange}
        onFocus={() => setIsSearchFocused(true)}
        placeholder="Search"
        value={searchValue}
      />
    </S.FlexWrapper>
  )
}
