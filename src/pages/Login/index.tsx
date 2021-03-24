import React,{useRef,useCallback} from 'react'
import * as Yup from 'yup'
import {FormHandles} from '@unform/core'
import {Form} from '@unform/web'
import {FiLogIn, FiMail, FiLock} from 'react-icons/fi'
import {Link, useHistory } from 'react-router-dom'

import getValidationErrors from '../../utils/getValidationErrors'
import logo from '../../assets/logo_1.svg'
import {Container, Content, Background, AnimationContainer} from './styles'

import {useAuth}from '../../hooks/auth'
import {useToast}from '../../hooks/toast'

import Input from '../../components/Input'
import Button from '../../components/Button'
interface SignInFormData {
    email:string,
    password:string
}
const Login: React.FC = ()=>{
    const formRef = useRef<FormHandles>(null)

    const {signIn} = useAuth()
    const {addToast} = useToast();
    const history = useHistory();
    
    const handleSubmit=useCallback(async(data: SignInFormData)=>{
        try{
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail Obrigatório').email('Digite um e-mail válido'),
                password:Yup.string().required('Senha obrigatória'),
            })
        await schema.validate(data,{abortEarly:false})
        await signIn({
            email: data.email,
            password:data.password,
        })
        history.push('/home')
        } catch(err){
            if(err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err)
                formRef.current?.setErrors(errors)

                return;
            }

            addToast({
                type:'error',
                title:'Erro na autenticação',
                description:'Ocorreu um erro ao fazer login, cheque as credenciais'
            })    
        }
        

    },[signIn, addToast, history])
    return(
    <Container>
        <Content>
            <AnimationContainer>
                <img src={logo} alt="logo" width="200px"/>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu login</h1>
                    <Input name="email" icon={FiMail}placeholder="E-mail"/>
                    <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>
                    <Button type="submit">Login</Button>
                    <Link to="forgot-password">Esqueci minha senha</Link>
                </Form>
                <Link to="./signup"><FiLogIn/>Criar conta</Link>
            </AnimationContainer>
        </Content>
        <Background/>
    </Container>)
    
}
  

export default Login