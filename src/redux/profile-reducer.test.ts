import profileReducer, {addPostActionCreator, deletePostActionCreator, PostStateType} from "./profile-reducer";

let initialState: PostStateType
beforeEach(() => {
    initialState = {
        posts: [
            {id: 1, message: 'How are you', likesCount: 12},
            {id: 2, message: 'HI Friends', likesCount: 12},
        ],
        profile: null,
        status: ''
    }
})

test('new post should be added ', () => {
    const newPost = 'My new post'
    const endState = profileReducer(initialState, addPostActionCreator(newPost))
    expect(endState.posts.length).toBe(3)
    expect(endState.posts[2].message).toBe('My new post')
});
test('after deleting length message should be correct ', () => {
    const postId = 1
    const endState = profileReducer(initialState, deletePostActionCreator(postId))
    expect(endState.posts.length).toBe(1)
    expect(endState.posts[0].message).toBe('HI Friends')
})