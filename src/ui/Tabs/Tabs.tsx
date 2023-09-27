import { FC, ReactNode } from 'react'
import * as S from './style'

export type TabItem = {
  label: string
  value: string
  icon?: ReactNode
}

type TabsProps = {
  tabs: TabItem[]
  activeTab: TabItem
  onChange: (tab: TabItem) => void
}

export const Tabs: FC<TabsProps> = (props) => {
  const { tabs, onChange, activeTab } = props

  return (
    <S.Wrapper>
      {tabs.map((tab) => {
        const isActive = tab.value === activeTab.value

        return (
          <S.TabItem key={tab.value} onClick={() => onChange(tab)}>
            <S.TabTopWrapper>
              {tab.icon}
              <S.TabItemLabel $isActive={isActive}>{tab.label}</S.TabItemLabel>
            </S.TabTopWrapper>

            <S.TabLine $isActive={isActive} />
          </S.TabItem>
        )
      })}
    </S.Wrapper>
  )
}
