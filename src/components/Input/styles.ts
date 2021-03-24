import styled,{css} from 'styled-components'
import Tooltip from '../Tooltip/'

interface ContainerProps {
    isFocused:boolean;
    isFilled:boolean;
    isErrored:boolean;
    
}

export const Container = styled.div<ContainerProps>` 
    background-color:rgba(255,255,255,0.2);
    border-radius:180px;
    border:2px solid transparent;
    padding:19px;
    width:100%;
    display:flex;
    align-items:center;


    & + div {
        margin-top:8px;};

    ${props => props.isErrored && css `
    border-color:red;`}

    ${props => props.isFocused && css `
    border-color:white;`}

    ${props => props.isFilled && css ``}

 
 
    input{
        color: #ffffff;
        flex:1;
        border:0;
        background-color:transparent;

        ::placeholder {
        color: #ffffff;
   }};
   
        svg{
        margin-right:16px;
   }
   `;

export const Error = styled(Tooltip)`
    height:20px;
    margin-left:16px;
    svg{
        margin:0;
    }

    span{
        background-color: red;

        &::before {
            border-color: red transparent;
        }
    }
`




