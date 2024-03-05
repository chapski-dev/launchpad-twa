import styled from 'styled-components'
import {
  SvgCheck as UISvgCheck,
  SvgHourglass as UISvgHourglass,
} from 'ui/icons'
import Oval from 'ui/LoaderSpiner/LoaderSpiner'

export const Header = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${({ theme }) => theme.color.text};
  background-color: ${({ theme }) => theme.color.bg};
  padding: 16px;
`

export const Description = styled.span`
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.color.hint};
`

export const LoaderWrapper = styled.div`
  position: relative;
`

export const LoaderSpiner = styled(Oval)``

export const SvgHourglass = styled(UISvgHourglass)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const DetailsWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: ${({ theme }) => theme.color.text};
  background-color: ${({ theme }) => theme.color.bgSecondary};

  padding: 16px;
`
export const StatusItem = styled.li`
  display: flex;
  gap: 22px;
  position: relative;

  &:last-of-type {
    .in_order {
      display: none;
    }
  }
`
export const StatusInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const StatusTitle = styled.h5`
  display: block !important;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.color.hint};
  &.completed {
    color: ${({ theme }) => theme.color.text};
  }
  &.pending {
    color: ${({ theme }) => theme.color.text};
  }
`

export const StatusIconWrapper = styled.div`
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
  width: 20px;
  height: 20px;
  background-color: transparent;
  position: relative;

  &.completed {
    background-color: ${({ theme }) => theme.color.text};
    color: ${({ theme }) => theme.color.text};
    min-width: 16px;
    min-height: 16px;
    width: 16px;
    height: 16px;
    margin: 2px;
    svg {
      path {
        stroke: ${({ theme }) => theme.color.bg};
      }
    }
  }

  &.pending {
    color: ${({ theme }) => theme.color.text};
    box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.color.text} inset;
    -webkit-box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.color.text} inset;
    -moz-box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.color.text} inset;
  }
`

export const SvgCheck = styled(UISvgCheck)`
  color: ${({ theme }) => theme.color.text};
`

export const Dot = styled.div`
  width: 7px;
  height: 7px;
  background: ${({ theme }) => theme.color.hint};
  border-radius: 50%;
  &.pending {
    background-color: ${({ theme }) => theme.color.text};
  }
`

export const Line = styled.div`
  display: block;
  width: 2px;
  height: calc(100% - 12px);
  position: absolute;
  bottom: -12px;
  left: 9px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.color.hint};
  &.completed {
    background-color: ${({ theme }) => theme.color.text};
  }
  &.pending {
    background-color: ${({ theme }) => theme.color.text};
  }
`
