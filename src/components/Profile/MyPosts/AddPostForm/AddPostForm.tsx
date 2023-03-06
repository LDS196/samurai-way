import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../../common/FormControls/FormsControls";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";

const maxLength10=maxLengthCreator(150)

export type FormDataType = {
    newPost:string
}
type PropsType={

}
const AddPostForm: React.FC<InjectedFormProps<FormDataType,PropsType> & PropsType>=({handleSubmit})=>{
    return(
        <form onSubmit={handleSubmit}>

            <div>
                <Field component={Textarea}
                       name={'newPost'}
                       placeholder={'Add new post'}
                       validate={[required,maxLength10 ]}/>
            </div>
            <div>
                <button>Add Post</button>
            </div>
        </form>
    )
}

export default reduxForm<FormDataType,PropsType>({form:'AddPost'})(AddPostForm)