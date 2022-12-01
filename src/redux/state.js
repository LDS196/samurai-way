
let state = {
    profilePage: {
        posts: [
            {id: 1, message: 'How are you', likesCount: 12},
            {id: 2, message: 'HI Friends', likesCount: 12},
    ],
},
    dialogsPage: {
        messages: [
            {id: 1, message: 'How are you',},
            {id: 2, message: 'HI Friends',},
            {id: 3, message: 'Yo Yo!',},
            {id: 4, message: 'How are you',},
            {id: 5, message: 'How are you',},
            {id: 6, message: 'How are you',}
        ],
        dialogs: [
            {id: 1, name: 'Viktor',},
            {id: 2, name: 'User',},
            {id: 3, name: 'Vasya',},
            {id: 4, name: 'Katya',},
            {id: 5, name: 'Olga',},
            {id: 6, name: 'Sveta',}
        ],
    },
    friendsData: {
        names:  [
            {id: 1, name: 'Andrew'},
            {id: 2, name: 'Vano'},
            {id: 3, name: 'Tony'}
        ]
    },
};
export let addPost = (postMessage) => {
    debugger;
    let newPost = {
        id: 5,
        message: postMessage,
        likesCount: 0
    }
    state.profilePage.posts.push(newPost)
}
export default state;