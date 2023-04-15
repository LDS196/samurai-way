import React, {useEffect} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {initializeApp} from "redux/App-reducer";
import {StateType} from "redux/redux-store";
import Preloader from "./components/common/Preloader/Preloader";
import './index.css';
import {MainPage} from "components/MainPage/MainPage";








type AppType = {}

export const App: React.FC<AppType> = () => {

    const dispatch = useDispatch()
    const initialized = useSelector<StateType>(state => state.app.initialized)

    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    if (!initialized) {
        return <Preloader/>
    }

    return (
        <MainPage/>
    );

}




