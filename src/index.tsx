
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {BrowserRouter} from "react-router-dom";
import state, {addPost, subscribe, updateNewPostText} from "./redux/state";

export let rerenderEntireTree = (state: any) => {
    ReactDOM.render(
        <BrowserRouter>
            <App state={state}
                 addPost={addPost}
                 updateNewPostText={updateNewPostText}
            />
        </BrowserRouter>,
        document.getElementById('root')

    );
}
rerenderEntireTree (state);
subscribe(rerenderEntireTree)