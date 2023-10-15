import { styled } from 'styled-components'
import { Button as UIButton } from 'ui/Button/Button'
import { SvgReferralLink } from 'ui/icons'

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
`

export const Circle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.btn};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ReferralLinkIcon = styled(SvgReferralLink)`
  width: 60px;
  height: 60px;

  path {
    fill: ${({ theme }) => theme.color.btnText};
  }
`

export const Title = styled.h4`
  margin: 0;
  padding: 0;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  color: ${({ theme }) => theme.color.text};
`

export const Label = styled.span`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  color: ${({ theme }) => theme.color.hint};
  max-width: 320px;
  text-align: center;
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`

export const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 90%;
`

export const Button = styled(UIButton)<{ isAccent?: boolean }>`
  width: 49%;
  background-color: ${({ theme, isAccent }) =>
    isAccent ? theme.color.btn : theme.color.bgSecondary};
  color: ${({ isAccent, theme }) =>
    !isAccent ? theme.color.text : theme.color.btnText};
`

export const ShareLink = styled.a`
  border: none;
  outline: none;
  border-radius: 8px;
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.color.btn};
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.color.btnText};
  transition: 0.3s;
  cirsor: pointer;
  text-decoration: none;
  width: 49%;
  text-align: center;
`

export const Link = styled.span`
  color: ${({ theme }) => theme.color.link};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`
