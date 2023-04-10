import React, {useEffect, useState} from "react";
import {Avatar} from "antd";
import s from "components/Header/Header.module.css";

export type ChatMessageType = {
    message: string,
    photo: string | null,
    userId: number,
    userName: string
}
const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    );
};
const Chat = () => {

    return <div>
        <Messages/>
        <AddMessageForm/>
    </div>
}


const Messages = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        debugger
        wsChannel.addEventListener('message', (e) => {
            const newMessages = JSON.parse(e.data);
            setMessages((prevState) => [...prevState, ...newMessages])
        })
    }, [])

    return <div style={{height: '400px', overflow: 'auto'}}>

        {!!messages && messages.map((m, index) => <Message key={index} message={m}/>)}

    </div>

};
const AddMessageForm = () => {
    const [message,setMessage]= useState('')

    const sendMessage=()=>{
        if(!message) return
        wsChannel.send(message)
        setMessage('')
    }
    return (
        <div>
            <div>
                <textarea onChange={(e)=> setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <button onClick={sendMessage}> send</button>
            </div>
        </div>
    );
};

const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {

    return (
        <div>
            <Avatar className={s.userFoto} src={message.photo}/>
            <span>{message.userId}</span>
            <span>{message.userName}</span>
            <p>{message.message}</p>
            <hr/>
        </div>
    );
};

export default ChatPage;
