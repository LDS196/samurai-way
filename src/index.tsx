import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
 import state from './redux/state'
import {BrowserRouter} from "react-router-dom";
import {addPost} from "./redux/state";


ReactDOM.render(
    <BrowserRouter>
    <App state={state} addPost={addPost}/>
    </BrowserRouter>,
  document.getElementById('root')

);