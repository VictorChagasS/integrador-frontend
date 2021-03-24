import React, {ChangeEvent, useCallback, useRef} from 'react'
import {FiUser, FiMail, FiLock, FiCamera, FiArrowLeft} from 'react-icons/fi'
import {Form} from '@unform/web'
import {FormHandles} from '@unform/core'
import * as Yup from 'yup'
import {useHistory, Link} from 'react-router-dom'

import api from '../../services/api'
import getValidationErrors from '../../utils/getValidationErrors'
import {useToast} from '../../hooks/toast'
import DefaultImage from '../../assets/PersonIcon.png'
import {Global,Container, Content, AvatarInput} from './styles'




import Input from '../../components/Input'
import Button from '../../components/Button'
import { useAuth } from '../../hooks/auth'
interface ProfileFormData{
    name:string,
    email:string,
    password:string,
    old_password:string,
    password_confirmation:string;
}
const Profile: React.FC = ()=>{
   
    const formRef = useRef<FormHandles>(null)
    const {addToast} = useToast();
    const history = useHistory();
    const {user, updateUser} = useAuth()


    const handleSubmit=useCallback(async(data: ProfileFormData)=>{
        try{
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('E-mail Obrigatório').email('Digite um e-mail válido'),
                old_password:Yup.string(),
                password:Yup.string().when('old_password',{
                    is: val => !!val.length,
                    then: Yup.string().required('Campo obrigatório'),
                    otherwise: Yup.string()
                }),
                password_confirmation: Yup.string().when('old_password',{
                    is: val => !!val.length,
                    then: Yup.string().required('Campo obrigatório'),
                    otherwise: Yup.string()
                }).oneOf([Yup.ref('password'), null], 'Senhas não batem',),
                
            })
        await schema.validate(data,{abortEarly:false})
        const {name, email, password, old_password, password_confirmation} = data;
        const formData = Object.assign({
            name,
            email 

         
        }, data.old_password ? {
            old_password,
            password,
            password_confirmation
        }: {})
        const response = await api.put('/profile',formData)
        updateUser(response.data)
        history.push('/')
        addToast({
            type:'success',
            title:'Perfil realizado',
            description:'Suas informações do perfil foram atualizadas com sucesso',
        })

       
        } catch(err){
            if(err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err)
                formRef.current?.setErrors(errors)

               return;
            }

            addToast({
                type:'error',
                title:'Erro na atualização do perfil',
                description:'Ocorreu um erro ao atualizar seu perfil, tente novamente'
            })    
        }

    },[addToast, history])

    const handleAvatarChange = useCallback((e: ChangeEvent<HTMLInputElement>)=>{
       
        if (e.target.files){
            const data = new FormData()
            data.append('avatar',e.target.files[0])
           api.patch('/users/avatar',data).then((response)=>{
                updateUser(response.data)
            
               addToast({
                type:'success',
                title:'Avatar atualizado',
               })
           })
        }
    },[addToast,updateUser])
    return(
    <Container>
        <Global/>
        <header>
            <div>
            <Link to="/home">
                <FiArrowLeft></FiArrowLeft>
            </Link>
            </div>
            </header>
        <Content>
         
            <Form ref={formRef} onSubmit={handleSubmit} initialData={{
                name:user.name,
                email:user.email
            }} >
              <AvatarInput>   <img src={user.avatar_url ? user.avatar_url : DefaultImage} alt={user.name}/>
              <label htmlFor="avatar">
                  <FiCamera/>
                  <input type="file" id="avatar" onChange={handleAvatarChange}/>
              </label>
              </AvatarInput>
            
            
                <h1>Meu perfil</h1>
                <Input name="name" icon={FiUser}placeholder="Nome"/>
                <Input name="email" icon={FiMail}placeholder="E-mail"/>
                <Input name="old_password" icon={FiLock} type="password" placeholder="Senha atual" containerStyle={{marginTop:24}}/>
                <Input name="password" icon={FiLock} type="password" placeholder="Nova senha"/>
                <Input name="password_confirmation" icon={FiLock} type="password" placeholder="Confirmar senha"/>
                <Button type="submit">Confirmar mudanças</Button>
            
            </Form>
           
        </Content>
    </Container>
    )
}
  

export default Profile