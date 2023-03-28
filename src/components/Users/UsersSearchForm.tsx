import {Field, Form, Formik} from "formik";
import React, {memo} from "react";
import {FilterType} from "../../redux/users-reducer";

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
type FormType = {
    term: string
    friend: 'true' | 'false' | 'null'

}
export const UsersSearchForm: React.FC<PropsType> = React.memo(({onFilterChanged}) => {
    const usersSearchFormValidate = (values: any) => {
        const errors = {}
        return errors
    }
    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter:FilterType={
            term: values.term,
            friend: values.friend==='null'?null:values.friend==='true'? true: false
        }
        onFilterChanged(filter)
        setSubmitting(false)
    }

    return (
        <div>
            <Formik
                initialValues={{term: '', friend: 'null'}}
                validate={usersSearchFormValidate}
                onSubmit={submit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field type="text" name="term"/>
                        <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Only follow</option>
                            <option value="false">Only unfollow</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
})