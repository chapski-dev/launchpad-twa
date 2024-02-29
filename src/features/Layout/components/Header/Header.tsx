import { ChangeEvent, FC, useCallback, useState } from 'react'
import { SvgLoop } from 'ui/icons'
import { ProfileBlock } from './components/ProfileBlock/ProfileBlock'
import * as S from './style'

export const Header: FC = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false)
  const handleSearchInputChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(evt.target.value)
    },
    []
  )

  return (
    <S.FlexWrapper>
      <S.UserInfoWrapper>
        <ProfileBlock />
      </S.UserInfoWrapper>
      <S.Input
        icon={<SvgLoop />}
        onBlur={() => setIsSearchFocused(false)}
        onChange={handleSearchInputChange}
        onFocus={() => setIsSearchFocused(true)}
        placeholder="Search"
      />
    </S.FlexWrapper>
  )
}
