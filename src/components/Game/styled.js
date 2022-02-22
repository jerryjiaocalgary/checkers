import styled from 'styled-components'
import withTheme from '@material-ui/core/styles/withTheme'

export default withTheme()(styled.div`
  overflow: hidden;

  .Container {
    margin: 16px auto;    
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    box-sizing: content-box;

    .Hint {
      margin: ${props => props.theme.spacing.unit}px;
      text-align: center;
      text-transform: uppercase;
    }

    .BoardDiv {
      max-width: 560px;
      width: 65%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }

    .TimerDiv {
      max-width: 330px;
      width 35%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }
  } 
`)
