import { styled } from 'styled-components'
import { GetXapiProfileResp } from 'api/types';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 12px 0 12px 0px;
`

export const ImgBlock = styled.div`
  width: 36px;
  height: 36px;
  background-color: white;
  border-radius: 50%;
`

export const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`

export const Name = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.color.text};
`

export const Status = styled.span<{ state?: GetXapiProfileResp['state'] }>`
  font-size: ${({state}) => state === 'verified' ? '15px' : '14px' };
  color: ${({ theme, state }) => state === 'verified' ? theme.color.success : theme.color.warning};
`

export const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  position: relative;
  justify-content: flex-start;
  gap: 8px;
  max-width: 109px;
  height: 36px;
  color: ${({ theme }) => theme.color.text};
`

export const BgAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ theme }) => theme.gradient.g2};
`

export const ProfileName = styled.span`
  display: flex;
  font-size: 26px;
  font-style: normal;
  font-weight: 600;
  background-clip: text;
  background: ${({ theme }) => theme.gradient.g1};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

export const ConfirmationIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0px;
  bottom: 0px;
  border-radius: 50%;
  width: 13.5px;
  height: 13.5px;
  background-color: white;
`

export const IconStatus = styled.div`
  padding-top: 1.5px;
  padding-left: -0.1px;
`
