import styled from 'styled-components'
import { Button as MUIButton, withStyles } from '@material-ui/core';


export const CardContainer = styled.div`
  flex-shrink: 0;
  width: 300px;
  margin: ${props => props.theme.spacing(1)};
  padding: ${props => props.theme.spacing(2.5, 2)};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  border-radius: ${props => props.theme.shape.borderRadius()};
  background-color: ${props => props.theme.palette.background.main};
  & > * + * {
    margin-top: ${props => props.theme.spacing(4)};
  }
  box-shadow: ${props => props.theme.shadows[1]};
  animation: fadeIn 0.3s;
`

export const NotificationContainer = styled.div`

  min-width: 280px;
  width: 100%;
  max-width: 400px;
  font-size: 1.2rem;
  animation: fadeIn 0.3s;
`

export const RecordBlock = styled.div`
  justify-content: flex-start;
  & > * + * {
    margin-top: ${props => props.theme.spacing(1)};
  };
`

export const RecordTitle = styled.p`
  line-height: 1.15;
  opacity: ${props => props.theme.typography.opacity};
  animation: fadeIn 0.3s;
`

export const RecordRow = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  opacity: ${props => props.isVisible ? 'unset' : 0};
`

export const MarkedFirst = styled.span`
  margin-right: 0.3em;
  color: ${props => props.theme.palette.text.corporate};
  font-weight: 700;
`

export const MutedInner = styled.span`
  margin: 0 0.3em;
  opacity: ${props => props.theme.typography.opacity};
`
