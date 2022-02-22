import styled from 'styled-components'
import withTheme from '@material-ui/core/styles/withTheme'

export default withTheme()(styled.div`
  overflow: hidden;

  .Container {
    margin: 16px auto;    
    width: 98%;    
    border: solid 1px #492510;

    .Header {
        width: 100%;
        font-size: 2rem;
        font-weight: 800;
        background-color: #c8a69D;
        text-align: center;
        padding: 0;         
    }

    .MainTimer {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        min-height: 100px;
        font-size: 3.5rem;
        font-weight: 800;
        color: #fff;
        background-color: #333;        
    }

    .TimedOut {
        width: 100%;
        font-size: 1.2rem;        
        background-color: #d0d0d0;
        .msg {
            color: red;
            font-weight: 800;           
        }
        .reset {
            margin: 2px;
            padding: 2px;
            background-color: #e0e0e0;
            .btn {
                
                display: inline-block;
                height: 33px;
            }
        }
    }        
  } 
`)