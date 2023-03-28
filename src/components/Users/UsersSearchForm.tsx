import {Field, Form, Formik} from "formik";
import React, {memo} from "react";
import {FilterType, getUsers} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {getPageSizeSelector} from "../../redux/users-selectors";

type PropsType = {}
type FormType = {
    term: string
    friend: 'true' | 'false' | 'null'
}
export const UsersSearchForm: React.FC<PropsType> = memo(() => {
    const pageSize = useSelector(getPageSizeSelector)
    const dispatch = useDispatch()

    const usersSearchFormValidate = (values: FormType) => {
        const errors = {}
        return errors
    }

    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter:FilterType={
            term: values.term,
            friend: values.friend==='null'?null:values.friend==='true'? true: false
        }
        dispatch(getUsers(1, pageSize, filter))
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