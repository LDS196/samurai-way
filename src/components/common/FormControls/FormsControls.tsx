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

type FormsControls = {
    input: WrappedFieldInputProps
    meta: WrappedFieldMetaProps
    placeholder?: string
    type?: HTMLInputTypeAttribute
    autoFocus?: boolean
}

export const Input: React.FC<FormsControls> = (
    {input, meta: {touched, error}, type, placeholder, autoFocus}) => {
    return (
        <div>
            <input {...input} type={type} placeholder={placeholder} autoFocus={autoFocus}/>
            {touched && error && <span>{error}</span>}
        </div>
    )
}

export const Textarea: React.FC<FormsControls> = (
    {input, meta: {touched, error}, placeholder}) => {
    return (
        <div>
            <textarea {...input} placeholder={placeholder}/>
            {touched && error && <span>{error}</span>}
        </div>
    )
}