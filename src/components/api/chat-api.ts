const subscribers = {
    'messages-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[],
}

let ws: WebSocket | null = null

type EventsNamesType = 'messages-received' | 'status-changed'

function closeHandler() {
    console.log('close')
    notifySubscribersAboutStatus("pending")
    setTimeout(createChannel, 3000)
}

const onMessageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data);
    subscribers['messages-received'].forEach(s => s(newMessages))
}
const openHandler = () => {
    notifySubscribersAboutStatus('ready')
}
const errorHandler = () => {
    notifySubscribersAboutStatus('error')
    console.error('Refresh App')
}
const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', onMessageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}
const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach(s => s(status))
}

function createChannel() {
    cleanUp()
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersAboutStatus("pending")
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', onMessageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)

}

export const chatApi = {
    start() {
        createChannel()
    },
    stop() {
        subscribers["messages-received"] = []
        subscribers["status-changed"] = []
        cleanUp()
    },
    subscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
//@ts-ignore
        subscribers[eventName].push(callback)
    },
    unsubscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        //@ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {

        ws?.send(message)
    }
}

export type ChatMessageType = {
    message: string,
    photo: string | null,
    userId: number,
    userName: string
}
type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void
export type StatusType = 'pending' | 'ready' | 'error';
