import styled,{createGlobalStyle} from 'styled-components'
import {shade} from 'polished'

export const Global = createGlobalStyle`
    body {
        background-image: linear-gradient(to right,#179ed4,#1ac4b5)!important;
        
    }
`

export const Container = styled.div`
    
    height:100%;

    strong{
        font-weight:bold
    }

 `
export const Header = styled.header`
    padding:32px 0px;
    background-color: #0c80ad;
    border-bottom:2px solid white;

`;

export const HeaderContent = styled.div`
    max-width:1120px;
    margin: 0 auto;
    display:flex;
    align-items:center;

    >img{
        height:80px;
    }
    button{
        margin-left: auto;
        background:transparent;
        border:0;

        svg{
            color: #FFF;
            width:20px;
            height:20px;
        }
    }
`
export const Profile = styled.div`
    display:flex;
    align-items:center;
    margin-left:80px;

    img {
        width:76px;
        height:76px;
        border-radius:50%;
    }
    div {
        display:flex;
        flex-direction:column;
        margin-left:16px;
        line-height:24px;
    }
    a{
        color:#FFFFFF;
        text-decoration:none;

        &:hover{
            opacity:0.8;
        }

    }
`

export const Content = styled.main`
   
    max-width:1120px;
    margin: 64px auto;

    display:flex;


`;
export const Schedule = styled.div`
    flex:1;
    margin-right:120px;
   

    h1{
        font-size:36px;
        font-weight:bold;
    }

    p{
        color:#f5f5f5;
        margin-top:8px;
        display:flex;
        align-items:center;
        font-weight:500;

    span{
        
        display:flex;
        align-items:center;
    }
        
    span + span::before {
        content:'';
        width:1px;
        height:12px;
        background-color:white;
        margin:0 8px;   
    }
    }
    

`;

export const NextAppointment = styled.div`
    
    margin-top:64px;
    > strong{
        font-weight:bold;
        font-size:20px;
        font-weight:400;
    }
    strong{
        font-weight:bold;
    }
    div{
        color:#000000;
        background:#FFFFFF;
        display:flex;
        align-items:center;
        padding:16px 24px;
        border-radius:10px;
        position:relative;
        margin-top:24px;
        

        &::before{
            position: absolute;
            height:80%;
            width:2px;
            left:0;
            top:10%;
            content:'';
            background:#0c80ad;
        }
        img{
            width:80px;
            height:80px;
            border-radius:50%;
        }
        strong{
           
            margin-left:24px;
            color:#000000;
        }
        span{
            margin-left:auto;
            display:flex;
            align-items:center;

            svg{
                margin-right:8px;
                color:#10e6d3;
            }
        }
    }

`

export const Section = styled.section`
    margin-top:48px;

    >strong{
        font-weight:bold;
        color:#FFFFFF;
        font-size:20px;
        line-height:26px;
        border-bottom: 1px solid #FFFFFF;
        display:block;
        padding-bottom:16px;
        margin-bottom:16px;
    }
    >p{
        margin-bottom: 48px;
    }

`
export const Appointment = styled.div`
    display:flex;
    align-items:center;

    & + div{
        margin-top:16px;
    }
    span{
            margin-left:auto;
            display:flex;
            align-items:center;
            width:70px;

            svg{
                margin-right:8px;
                color:#10e6d3;
            }
        }

        div{
            flex:1;
            color:#000000;
            background:#FFFFFF;
            display:flex;
            align-items:center;
            padding:16px 24px;
            border-radius:10px;
            margin-left:24px;
        
        }
        img{
            width:56px;
            height:56px;
            border-radius:50%;
        }
        strong{
           
            margin-left:24px;
            color:#000000;
        }

`
export const Calendar = styled.aside`
    width:380px;

    .DayPicker {
    background: #28262e;
    border-radius: 10px;
  }
  .DayPicker-wrapper {
    padding-bottom: 0;
  }
  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }
  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }
  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }
  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }
  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }
  .DayPicker-Day--today {
    font-weight: normal;
  }
  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }
  .DayPicker-Day--selected {
    background: #1ac4b5 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;