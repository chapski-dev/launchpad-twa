import { styled } from 'styled-components'

export const Wrapper = styled.div`
  padding: 12px 0;
`

export const Heading1 = styled.h1`
  color: ${({ theme }) => theme.color.text};
  margin-bottom: 12px;
  font-size: 18px;
`

export const Heading2 = styled.h2`
  color: ${({ theme }) => theme.color.text};
  margin: 12px 0;
  font-size: 18px;
`

export const Heading3 = styled.h3`
  color: ${({ theme }) => theme.color.text};
  margin: 12px 0;
`

export const Heading4 = styled.h4`
  color: ${({ theme }) => theme.color.text};
  margin: 12px 0;
`

export const Paragraph = styled.p`
  color: ${({ theme }) => theme.color.hint};
  margin: 12px 0;
  font-size: 14px;
`

export const Link = styled.a`
  color: ${({ theme }) => theme.color.link};
  margin: 12px 0;
  text-decoration: underline;
`

export const Image = styled.img`
  margin: 12px 0;
  max-width: 100%;
  border-radius: 4px;
`

export const ListItem = styled.li`
  margin: 12px 0;
  color: ${({ theme }) => theme.color.hint};
  max-width: 100%;
`

export const CodeBlock = styled.pre`
  margin: 12px 0;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  color: ${({ theme }) => theme.color.hint};
  padding: 10px;
  border-radius: 5px;
`
