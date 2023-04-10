import {CommonThunkType} from "./redux-store";
import {chatApi, ChatMessageType, StatusType} from "components/api/chat-api";
import {Dispatch} from "redux";
import {v1} from "uuid";

const MESSAGES_RECEIVED: string = "chat-reducer/MESSAGES_RECEIVED";
const SET_STATUS: string = "chat-reducer/SET_STATUS";

type ThunkType = CommonThunkType<ChatAC>

type ChatMessageDomainType= ChatMessageType & {id:string}
type ChatAC = ReturnType<typeof messagesReceived> & ReturnType<typeof setStatusWS>

const initialState = {
    messages: [] as ChatMessageDomainType[],
    status: 'pending' as StatusType
}
export type InitialStateType = typeof initialState

export const chatReducer = (state = initialState, action: ChatAC): InitialStateType => {
    switch (action.type) {
        case MESSAGES_RECEIVED:
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m=>({...m, id: v1()}))].filter((m, i, array) => i >= array.length - 100),
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state;
    }
};

export const messagesReceived = (messages: ChatMessageType[]) => ({
    type: MESSAGES_RECEIVED,
    payload: {messages}
} as const);

export const setStatusWS = (status: StatusType) => ({
    type: SET_STATUS,
    payload: {status}
} as const);

let _newMessagesHandler: ((messages: ChatMessageType[]) => void) | null = null
let _newStatusHandler: ((status: StatusType) => void) | null = null

const newMessagesHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessagesHandler === null) {
        _newMessagesHandler = (messages: ChatMessageType[]) => {
            dispatch(messagesReceived(messages))
        }
    }
    return _newMessagesHandler
}

const newStatusHandlerCreator = (dispatch: Dispatch) => {
    if (_newStatusHandler === null) {
        _newStatusHandler = (status) => {
            dispatch(setStatusWS(status))
        }
    }
    return _newStatusHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatApi.start()
    chatApi.subscribe('messages-received', newMessagesHandlerCreator(dispatch))
    chatApi.subscribe('status-changed', newStatusHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatApi.unsubscribe('messages-received', newMessagesHandlerCreator(dispatch))
    chatApi.unsubscribe('status-changed', newStatusHandlerCreator(dispatch))
    chatApi.stop()
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {

    chatApi.sendMessage(message)
}


