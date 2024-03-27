import { FC, useMemo } from 'react'
import { ICOInfo } from '@ton-and-company/sdk/dist/core/sdk'
import { MarkdownRenderer } from 'features/MarkdownRenderer'
import { Container } from 'ui/Container/Container'
// import { Line } from 'ui/Line/Line'
// import { Tabs } from 'ui/Tabs/Tabs'
// import { DealTerms } from './components'
import * as S from './style'

// const tabs = [
//   {
//     label: 'About',
//     value: 'about',
//   },
//   {
//     label: 'Deal terms',
//     value: 'deal_tearms',
//   },
// ]

type InfoBlockProps = {
  mdContent?: string
  icoInfo?: ICOInfo
}

export const InfoBlock: FC<InfoBlockProps> = (props) => {
  const { mdContent } = props

  // const [activeTab] = useState(tabs[0])

  const infoContent = useMemo(() => {
    // switch (activeTab.value) {
    // case 'about':
    return mdContent && <MarkdownRenderer mdContent={mdContent} />
    // case 'deal_tearms':
    // return icoInfo && <DealTerms icoInfo={icoInfo} />
    // }
  }, [mdContent])

  return (
    <S.Wrapper>
      {/* <Container> */}
      {/* <Tabs activeTab={activeTab} onChange={setActiveTab} tabs={tabs} /> */}
      {/* </Container> */}
      {/* <Line /> */}
      <Container>{infoContent}</Container>
    </S.Wrapper>
  )
}
