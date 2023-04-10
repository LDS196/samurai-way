import React, {memo, useEffect, useRef, useState} from "react";
import {Avatar} from "antd";
import s from "components/Header/Header.module.css";
import {ChatMessageType} from "components/api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "redux/chat-reducer";
import {StateType} from "redux/redux-store";


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

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }

    }, [])

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


const Messages= () => {
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
    return <div style={{height: '400px', overflow: 'auto'}} onScroll={onScrollHandler}>

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
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <button disabled={status !== 'ready'} onClick={sendMessageHandler}> send</button>
            </div>
        </div>
    );
};

const Message: React.FC<{ message: ChatMessageType }> = memo(({message}) => {
    console.log('m')
    return (
        <div>
            <Avatar className={s.userFoto} src={message.photo}/>
            <span>{message.userId}</span>
            <span>{message.userName}</span>
            <p>{message.message}</p>
            <hr/>
        </div>
    );
});

export default ChatPage;
