import {Field, InjectedFormProps, reduxForm} from "redux-form";

import React from "react";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormControls/FormsControls";

export type FormDataType = {
    NewMessageBody:string
}
type PropsType={

}
const maxLength50 = maxLengthCreator(50)

const AddMessageForm: React.FC<InjectedFormProps<FormDataType,PropsType>&PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={'NewMessageBody'}
                       placeholder={'Enter your message'}
                       validate={[required, maxLength50]}/>
                <div>
                    <button>Send</button>
                </div>
            </div>
        </form>
    )
}
export default reduxForm<FormDataType>({form: ' AddMessageForm'})(AddMessageForm)