import { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { AppRoutes } from 'constants/app'
import { useOutsideClick } from 'hooks/useOutsideClick/useOutsideClick'
import { FCWithChildren } from 'types/app'

import { Header } from './components'
import * as S from './style'

type LayoutProps = {
  onSearch?: (searchValue: string) => void
}

export const Layout: FCWithChildren<LayoutProps> = (props) => {
  const { children, onSearch } = props

  const router = useRouter()

  const [isSearchInputDisplayed, setIsSearchIputDisplayed] =
    useState<boolean>(false)

  const toggleSearchInput = () => {
    setIsSearchIputDisplayed((prev) => !prev)
  }

  const searchInputRef = useRef(null)

  useOutsideClick(searchInputRef, () => setIsSearchIputDisplayed(false))

  return (
    <S.Wrapper>
      {router.pathname === AppRoutes.Home && isSearchInputDisplayed ? (
        <S.Input
          ref={searchInputRef}
          actionElement={<S.CloseIcon onClick={toggleSearchInput} />}
          onChange={(evt) => onSearch!(evt.target.value)}
          placeholder="Search"
        />
      ) : (
        <Header />
      )}
      {children}
    </S.Wrapper>
  )
}
