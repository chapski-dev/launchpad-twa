import styled from 'styled-components'
import { Task } from 'ui/Task/Task'

export const Wrap = styled.div`
  padding: 20px;
  display: flex;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  border-radius: 25px;
  width: 100%;
`

export const TaskCard = styled(Task)`
  align-items: center;
`
