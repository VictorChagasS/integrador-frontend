import styled,{keyframes} from 'styled-components';
import LoginImageBackground from '../../assets/ImageBackground.png'
import {shade} from 'polished'
export const Container = styled.div`
    height:100vh;
    display:flex;
    align-items:stretch;
    `
 
export const Content = styled.div`
    display:flex;
    align-items:center;
    flex-direction:column;
    justify-content:center;
    width:100%;
    max-width:700px;`;

const appearFromLeft = keyframes`
    from{
        opacity:0;
        transform:translateX(-50px);
    }
    to{
        opacity:1;
        transform:translateX(0);
    }
`
export const AnimationContainer = styled.div`
    display:flex;
    align-items:center;
    flex-direction:column;
    justify-content:center;
    animation: ${appearFromLeft} 1s;
form{
      margin:60px 0;
      width:340px;
      text-align:center  
    };

    h1{
        margin-bottom:24px;
        font-weight:bold;
    };

    
    button{
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
    };

    a{
        color:#FFFFFF;
        display:block;
        text-decoration:none;
        margin-top:24px; 
    }
 
    >a{
        display:flex;
        align-items:center;
        font-weight:500;
        color:#FFFFFF;
     
 

        svg{
            margin-right:13px;
        };

        &:hover{
            color:${shade(0.1, '#FFFFFF')}};
        };
`
    
   
export const Background = styled.div`
    flex:1;
    background: url(${LoginImageBackground}) no-repeat center;
    background-size:cover;
`