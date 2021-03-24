import styled from 'styled-components'
import {shade} from 'polished'
export const Container = styled.button`
 font-size:20px;
     font-weight:500;
     background-color:#1ac4b5;
     border-radius:180px;
     border:none;
     padding:0px 19px;
     margin-top:16px;
     width:100%;
     color: #ffffff;
     height:56px;
     transition: background-color 0.5s;

     &:hover{

     background: ${shade(0.05, '#1ac4b5')};
     color:${shade(0.1, '#FFFFFF')}};
`;
