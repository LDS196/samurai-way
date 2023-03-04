import {Field, reduxForm} from "redux-form";

import React from "react";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormControls/FormsControls";


const maxLength50 = maxLengthCreator(50)
const AddMessageForm = (props: any) => {
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
export default reduxForm({form: ' AddMessageForm'})(AddMessageForm)