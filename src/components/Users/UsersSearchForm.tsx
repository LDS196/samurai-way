import {Field, Form, Formik} from "formik";
import React, {memo, useState} from "react";
import {FilterType, getUsers} from "redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {getPageSizeSelector, getUsersFilterSelector} from "redux/users-selectors";
import {Button, Input, Select,} from "antd";
import {SearchOutlined} from '@ant-design/icons';

type PropsType = {}
type Friend = 'true' | 'false' | 'null';
type FormType = {
    term: string
    friend: Friend
}
export const UsersSearchForm: React.FC<PropsType> = memo(() => {
    const [friend, setFriend] = useState<any>(useSelector(getUsersFilterSelector).friend)
    const pageSize = useSelector(getPageSizeSelector)
    const dispatch = useDispatch()
    const filter = useSelector(getUsersFilterSelector)

    const usersSearchFormValidate = (values: FormType) => {
        const errors = {}
        return errors
    }

    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: friend === 'null' ? null : friend === 'true' ? true : false
        }
        dispatch(getUsers(1, pageSize, filter))
        setSubmitting(false)
    }
    const handleChange = (value: string) => {
        setFriend(value)
    };
    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{term: filter.term, friend: String(filter.friend) as Friend}}
                validate={usersSearchFormValidate}
                onSubmit={submit}
            >
                {({isSubmitting}) => (
                    <Form >
                        <Field style={{maxWidth:'300px',margin:'5px'}} as={Input} name="term"
                               placeholder="Enter User name"/>
                        <Select
                            defaultValue={String(filter.friend)}
                            style={{minWidth:'110px',margin:'5px'}}
                            onChange={handleChange}
                            options={[
                                {value: 'null', label: 'All'},
                                {value: 'true', label: 'Only follow'},
                                {value: 'false', label: 'Only unfollow'},
                            ]}
                        />

                        <Button style={{margin:'5px'}}
                            icon={<SearchOutlined/>}
                            size={"middle"}
                            type={"primary"}
                            htmlType="submit"
                            disabled={isSubmitting}>
                            Find
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
})

