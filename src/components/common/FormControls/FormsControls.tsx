import s from './FormsControls.module.css'

const FormControl=({meta, ...props}:any)=>{
    const hasError=meta.touched && meta.error

    return(
        <div className={s.formControl + ' ' + (hasError?s.error:'')}>
            <div>
                {props.children}
            </div>

            { hasError&& <span className={s.formControl + ' ' + s.error}>{meta.error}</span>}
        </div>
    )
}
export const TextArea=(props:any)=>{

    const {input,...restProps}=props
    return(
            <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
    )
}
export const Input=(props:any)=>{

    const {input,...restProps}=props
    return(
        <FormControl {...props}><input {...input} {...restProps}/></FormControl>
    )
}
