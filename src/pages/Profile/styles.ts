import styled,{createGlobalStyle} from 'styled-components';
import {shade} from 'polished'

export const Global = createGlobalStyle`
    body {
        background-image: linear-gradient(to right,#179ed4,#1ac4b5)!important;
        
    }
`

export const Container = styled.div`
    height:100vh;
 >header{
     height:144px;
     display:flex;
     align-items:center;
     background-color: #0c80ad;
     border-bottom:2px solid white;
     
     div{
         width:100%;
         max-width: 1120px;
         margin:0 auto;

         svg{
             color:#FFFFFF;
             width:24px;
             height:24px;
         }
     }


 }
    `
 
 export const Content = styled.div`
 display:flex;
 align-items:center;
 flex-direction:column;
 justify-content:center;
 width:100%;
 margin:-126px auto 0;


 form{

   width:340px;
   text-align:center;
   display:flex;
   flex-direction:column;
 

 h1{
     margin-bottom:24px;
     font-weight:bold;
     font-size:20px;
     text-align:left;
 };

 

    a{
        color:#FFFFFF;
        display:block;
        text-decoration:none;
        margin-top:24px; 
    }
};

 `;

export const AvatarInput = styled.div`
    margin-bottom: 32px;
    position:relative;
    width:186px;
    align-self:center;
    img {
        width:186px;
        height:186px;
        border-radius:50%;
    };
    label{
        position:absolute;
        width:48px;
        height:48px;
        background:#FFF;
        border-radius:50%;
        border:2px solid #000000;
        right:0;
        bottom:0;
        color:#000000;
        transition:background-color 0.2;
        cursor:pointer;

        display:flex;
        align-items:center;
        justify-content:center;

        input{
            display:none;
        }

        svg{
            width:20px;
            height:20px;
        }
        &:hover{
            background: ${shade(0.2,'#FFFFFF')}
        }
    }
`

