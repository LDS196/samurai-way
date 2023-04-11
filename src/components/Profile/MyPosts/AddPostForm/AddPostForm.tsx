import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../../common/FormControls/FormsControls";
import {maxLengthCreator, required} from "utils/validators/validators";
import {Button} from "antd";

const maxLength10 = maxLengthCreator(150)

export type FormDataType = {
    newPost: string
}
type PropsType = {}

const AddPostForm: React.FC<InjectedFormProps<FormDataType, PropsType> & PropsType> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>

            <div style={{margin: '5px 0'}}>
                <Field component={Textarea}
                       name={'newPost'}
                       placeholder={'Add new post'}
                       validate={[required, maxLength10]}/>
            </div>
            <div>
                <Button style={{margin: '5px 0'}}
                        type={"primary"}
                        htmlType={'submit'}>Add Post</Button>
            </div>
        </form>
    )
}

export default reduxForm<FormDataType, PropsType>({form: 'AddPost'})(AddPostForm)