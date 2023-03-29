import {Field, Form, Formik} from "formik";
import React, {memo} from "react";
import {FilterType, getUsers} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {getPageSizeSelector, getUsersFilterSelector} from "../../redux/users-selectors";

type PropsType = {}
type Friend = 'true' | 'false' | 'null';
type FormType = {
    term: string
    friend: Friend
}
export const UsersSearchForm: React.FC<PropsType> = memo(() => {
    const pageSize = useSelector(getPageSizeSelector)
    const dispatch = useDispatch()
    const filter = useSelector(getUsersFilterSelector)

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
                enableReinitialize
                initialValues={{term: filter.term, friend: String(filter.friend) as Friend}}
                validate={usersSearchFormValidate}
                onSubmit={submit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field type="text" name="term" />
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