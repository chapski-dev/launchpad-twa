import { FC, useMemo } from 'react'
import ReactMarkdown, { Components } from 'react-markdown'
import gfm from 'remark-gfm'
import * as S from './style'

type MarkdownRendererProps = {
  mdContent: string
}

export const MarkdownRenderer: FC<MarkdownRendererProps> = (props) => {
  const { mdContent } = props

  const components: Components = useMemo(
    () => ({
      h1: ({ node, ...props }) => <S.Heading1 {...props} />,
      h2: ({ node, ...props }) => <S.Heading2 {...props} />,
      h3: ({ node, ...props }) => <S.Heading3 {...props} />,
      h4: ({ node, ...props }) => <S.Heading4 {...props} />,
      p: ({ node, ...props }) => <S.Paragraph {...props} />,
      a: ({ node, ...props }) => <S.Link {...props} />,
      img: ({ node, ...props }) => <S.Image {...props} />,
      pre: ({ node, ...props }) => <S.CodeBlock {...props} />,
      li: ({ node, ...props }) => <S.ListItem {...props} />,
    }),
    []
  )

  return (
    <S.Wrapper>
      <ReactMarkdown
        children={mdContent}
        components={components}
        remarkPlugins={[gfm]}
      />
    </S.Wrapper>
  )
}
