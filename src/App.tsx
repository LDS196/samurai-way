import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import Music from "./components/Music/Music";
import {Navigate, Route, Routes,} from "react-router-dom";
import  {UsersPage} from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/App-reducer";
import { StateType} from "./redux/redux-store";
import Preloader from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";
import {Login} from "./components/Login/Login";
import 'antd/dist/antd.css';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)

type AppType = {
    initializeApp: () => void
    initialized: boolean
}

class App extends React.Component<AppType> {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Routes>
                        <Route path={'/'} element={<Navigate to={'/profile'}/>}/>
                        <Route path='/dialogs' element={<SuspendedDialogs/>}/>
                        <Route path='/profile/:userId?' element={<SuspendedProfile/>}/>
                        <Route path='/news' element={<News/>}/>
                        <Route path='/music' element={<Music/>}/>
                        <Route path='/settings'element={<Settings/>}/>
                        <Route path='/users' element={<UsersPage/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='*' element={<div>404 Not Found</div>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: StateType) => ({initialized: state.app.initialized})


export default compose<React.ComponentType>(
    // withRouter,
    connect(mapStateToProps, {initializeApp}))(App);
