import React, {useCallback, useRef} from 'react'
import {FiUser, FiMail, FiLock, FiArrowLeft} from 'react-icons/fi'
import {Form} from '@unform/web'
import {FormHandles} from '@unform/core'
import * as Yup from 'yup'
import {Link, useHistory} from 'react-router-dom'

import api from '../../services/api'
import getValidationErrors from '../../utils/getValidationErrors'
import logo from '../../assets/logo_1.svg'
import {useToast} from '../../hooks/toast'
import {Container, Content, Background, AnimationContainer} from './styles'




import Input from '../../components/Input'
import Button from '../../components/Button'
interface SignUpFormData{
    name:string,
    email:string,
    password:string,
    isBarber:boolean
}
const Register: React.FC = ()=>{
    const formRef = useRef<FormHandles>(null)
    const {addToast} = useToast();
    const history = useHistory();

    const handleSubmit=useCallback(async(data: SignUpFormData)=>{
        try{
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('E-mail Obrigatório').email('Digite um e-mail válido'),
                password:Yup.string().min(6, 'No mínimo 6 dígitos'),
            })
        data.isBarber=true;
        await schema.validate(data,{abortEarly:false})
        await api.post('/users',data)
        history.push('/')
        addToast({
            type:'success',
            title:'Cadastro realizado',
            description:'Você já pode fazer seu login na plataforma',
        })

       
        } catch(err){
            if(err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err)
                formRef.current?.setErrors(errors)

               return;
            }

            addToast({
                type:'error',
                title:'Erro no cadastro',
                description:'Ocorreu um erro ao fazer cadastro, tente novamente'
            })    
        }

    },[addToast, history])
    return(
    <Container>
        <Background/>
        <Content>
            <AnimationContainer>
                <img src={logo} alt="logo" width="200px"/>
                <Form ref={formRef} onSubmit={handleSubmit} >
                    <h1>Faça seu cadastro</h1>
                    <Input name="name" icon={FiUser}placeholder="Nome"/>
                    <Input name="email" icon={FiMail}placeholder="E-mail"/>
                    <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>
                    <Button type="submit">Cadastrar</Button>
                
                </Form>
                <Link to="/"><FiArrowLeft/>Voltar para login</Link>
            </AnimationContainer>
        </Content>
    </Container>
    )
}
  

export default Register