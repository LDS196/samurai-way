import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import store from "./redux/state";

export let rerenderEntireTree = (state: any) => {
    ReactDOM.render(
        <BrowserRouter>
            <App state={state}
                 dispatch={store.dispatch.bind(store)}
                 dispatchDialog={store.dispatchDialog.bind(store)}

            />
        </BrowserRouter>,
        document.getElementById('root')

    );
}
rerenderEntireTree (store.getState());
store.subscribe(rerenderEntireTree)