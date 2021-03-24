import React,{useRef,useCallback, useState} from 'react'
import * as Yup from 'yup'
import {FormHandles} from '@unform/core'
import {Form} from '@unform/web'
import {FiLogIn, FiMail} from 'react-icons/fi'
import {Link,  } from 'react-router-dom'

import getValidationErrors from '../../utils/getValidationErrors'
import logo from '../../assets/logo_1.svg'
import {Container, Content, Background, AnimationContainer} from './styles'


import {useToast}from '../../hooks/toast'

import Input from '../../components/Input'
import Button from '../../components/Button'
import api from '../../services/api'
interface ForgotPasswordFormData {
    email:string,
}
const ForgotPassword: React.FC = ()=>{
    const formRef = useRef<FormHandles>(null)

   
    const {addToast} = useToast();
    const [loading, setLoading] = useState(false)

    
    const handleSubmit=useCallback(async(data: ForgotPasswordFormData)=>{
        try{
            setLoading(true)
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail Obrigatório').email('Digite um e-mail válido'),
            })
        await schema.validate(data,{abortEarly:false})

        await api.post('/password/forgot',{
            email:data.email,
        })
        addToast({
            type:'success',
            title:'Email de recuperação enviado',
            description:'Enviamos um email para confirmar a recuperação de senha, cheque sua caixa de entrada'
        })
        //history.push('/home')
        } catch(err){
            if(err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err)
                formRef.current?.setErrors(errors)

                return;
            }

            addToast({
                type:'error',
                title:'Erro na recuperação de senha',
                description:'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente'
            })    
        } finally{
            setLoading(false)
        }
        

    },[addToast])
    return(
    <Container>
        <Content>
            <AnimationContainer>
                <img src={logo} alt="logo" width="200px"/>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Recuperar senha</h1>
                    <Input name="email" icon={FiMail}placeholder="E-mail"/>
                    <Button loading={loading} type="submit">Recuperar</Button>
                </Form>
                <Link to="/"><FiLogIn/>Voltar ao Login</Link>
            </AnimationContainer>
        </Content>
        <Background/>
    </Container>)
}
  

export default ForgotPassword