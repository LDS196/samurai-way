// import s from './FormsControls.module.css'
// type FormsControls = {
//     input: WrappedFieldInputProps
//     meta: WrappedFieldMetaProps
//     placeholder?: string
//     type?: HTMLInputTypeAttribute
//     autoFocus?: boolean
// }
// const FormControl: =({meta, ...props}:any)=>{
//     const hasError=meta.touched && meta.error
//
//     return(
//         <div className={s.formControl + ' ' + (hasError?s.error:'')}>
//             <div>
//                 {props.children}
//             </div>
//
//             { hasError&& <span className={s.formControl + ' ' + s.error}>{meta.error}</span>}
//         </div>
//     )
// }
// export const TextArea=(props:any)=>{
//
//     const {input,...restProps}=props
//     return(
//             <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
//     )
// }
// export const Input=(props:any)=>{
//
//     const {input,...restProps}=props
//     return(
//         <FormControl {...props}><input {...input} {...restProps}/></FormControl>
//     )
// }

import React, {HTMLInputTypeAttribute} from 'react'
import {WrappedFieldInputProps, WrappedFieldMetaProps} from 'redux-form/lib/Field'
import TextArea from "antd/es/input/TextArea";
import { Input} from "antd";
type FormsControls = {
    input: WrappedFieldInputProps
    meta: WrappedFieldMetaProps
    placeholder?: string
    type?: HTMLInputTypeAttribute
    autoFocus?: boolean
}

 export const MyInput: React.FC<FormsControls> = (
    {input, meta: {touched, error}, type, placeholder, autoFocus}) => {
    return (
        <div>

            <Input style={type !== 'checkbox'?{maxWidth:'300px',margin:'5px'}:{maxWidth:'20px',margin:'5px'}}
                   {...input} type={type} placeholder={placeholder} autoFocus={autoFocus}/>
            {type === 'checkbox' && <label>remember me</label>}
            {touched && error && <span>{error}</span>}
        </div>
    )
}

export const Textarea: React.FC<FormsControls> = (
    {input, meta: {touched, error}, placeholder}) => {
    return (
        <div>
            <TextArea {...input} placeholder={placeholder} style={{maxWidth:'400px'}}/>
            {touched && error && <span>{error}</span>}
        </div>
    )
}