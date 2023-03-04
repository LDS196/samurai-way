
export type ResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: ResultCode
}
export enum ResultCode {
    Success = 0,
    Error = 1,
    Captcha = 10
}