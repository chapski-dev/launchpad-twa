import { FC, ReactNode } from 'react'
import * as S from './style'

export type TabItem = {
  label: string
  value: string
  icon?: ReactNode
  disabled?: boolean
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
          <S.TabItem
            key={tab.value}
            $isDisabled={tab.disabled}
            onClick={() => !tab.disabled && onChange(tab)}
          >
            <S.TabTopWrapper>
              {tab.icon}
              <S.LabelWrapper>
                {tab.disabled && (
                  <S.DisabledLabel>Coming soon...</S.DisabledLabel>
                )}
                <S.TabItemLabel $isActive={isActive} $isDisabled={tab.disabled}>
                  {tab.label}
                </S.TabItemLabel>
              </S.LabelWrapper>
            </S.TabTopWrapper>

            <S.TabLine $isActive={isActive} />
          </S.TabItem>
        )
      })}
    </S.Wrapper>
  )
}
