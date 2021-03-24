import React, {InputHTMLAttributes, useCallback, useEffect, useRef, useState} from 'react'
import {IconBaseProps} from 'react-icons'
import {FiAlertCircle} from 'react-icons/fi'
import {useField} from '@unform/core'

import {Container, Error} from './styles'



interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    name:string;
    containerStyle?:Object;
    icon:React.ComponentType<IconBaseProps>;

}
const Input:React.FC<InputProps> = ({name,containerStyle, icon: Icon, ...rest}) =>{
    const inputRef = useRef<HTMLInputElement>(null)
    const [IsFocused, setIsFocused] = useState(false)
    const [IsFilled, setIsFilled] = useState(false)
    const { fieldName, defaultValue, error, registerField} = useField(name);
    const handleInputFocus = useCallback(()=>{
        setIsFocused(true)
    },[])
    const handleInputBlur = useCallback(()=>{
        setIsFocused(false)
        setIsFilled(!!inputRef.current?.value)
        
    },[])
    useEffect(()=>{
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        })
    },[fieldName,registerField])
    return(
    <Container style={containerStyle} isErrored={!!error} isFilled={IsFilled} isFocused={IsFocused}>
    {Icon && <Icon size={20}/>}
    <input ref={inputRef} defaultValue={defaultValue} onFocus={handleInputFocus} onBlur={handleInputBlur} {...rest} />
    {error && <Error title={error}><FiAlertCircle color="red" size={20}/></Error>}
    </Container>)
}

export default Input