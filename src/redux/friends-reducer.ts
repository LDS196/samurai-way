type UserType={
    id: number
    name: string
}
type UsersType =  Array<UserType> ;
type UsersStateType={
    names:UsersType
}
const initialState:UsersStateType = {
    names: [
        {id: 1, name: 'Andrew'},
        {id: 2, name: 'Vano'},
        {id: 3, name: 'Tony'}
    ]
}
const friendsReducer = (state:UsersStateType = initialState, action: any) => {

    return state;
};

export default friendsReducer;