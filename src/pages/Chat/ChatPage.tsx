import React, {memo, useEffect, useRef, useState} from "react";
import {Avatar, Button} from "antd";
import style from "../Chat/ChatPage.module.css";
import {ChatMessageType} from "components/api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "redux/chat-reducer";
import {StateType} from "redux/redux-store";
import TextArea from "antd/es/input/TextArea";
import {Navigate} from "react-router-dom";

export const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    );
};

const Chat = () => {
    const dispatch = useDispatch()
    const status = useSelector((state: StateType) => state.chat.status)
    const isAuth = useSelector((state: StateType) => state.auth.isAuth)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    if (!isAuth) return <Navigate to={'/login'}/>
    return <div>
        {status === 'error'
            ? <div>Some error</div>
            : <>
                <Messages/>
                <AddMessageForm/>
            </>
        }

    </div>
}


const Messages = () => {
    const messagesAnchorRef = useRef<HTMLDivElement>(null)

    const messages = useSelector((state: StateType) => state.chat.messages)

    const [autoScroll, setAutoScroll] = useState(true)

    const onScrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            setAutoScroll(true)
        } else {
            setAutoScroll(false)
        }
    }
    useEffect(() => {
        if (autoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }

    }, [messages])

    return <div style={{height: '600px', overflow: 'auto'}} onScroll={onScrollHandler}>

        {!!messages && messages.map((m) => <Message key={m.id} message={m}/>)}
        <div ref={messagesAnchorRef}></div>
    </div>

};

const AddMessageForm = () => {
    const status = useSelector((state: StateType) => state.chat.status)
    const dispatch = useDispatch()
    const [message, setMessage] = useState('')

    const sendMessageHandler = () => {
        if (!message) return
        dispatch(sendMessage(message))
        setMessage('')
    }
    return (
        <div>
            <div>
                <TextArea size={"small"} placeholder="Message"
                          style={{marginTop: '10px', maxWidth: '400px'}}
                          onChange={(e) => setMessage(e.currentTarget.value)}
                          value={message}
                />
            </div>
            <div style={{marginTop: '10px'}}>

                <Button type="primary" disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</Button>
            </div>
        </div>
    );
};

const Message: React.FC<{ message: ChatMessageType }> = memo(({message}) => {
    return (
        <div>
            <div className={style.userInfo}>
                <Avatar src={message.photo}/>
                <span>UserID: {message.userId}</span>
                <span>UserName: {message.userName}</span>
            </div>
            <p>{message.message}</p>
            <hr/>
        </div>
    );
});

export default ChatPage;
