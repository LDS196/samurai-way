import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import Music from "./components/Music/Music";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/App-reducer";
import {StateType} from "./redux/redux-store";
import Preloader from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
type AppType = {
    initializeApp: any // type thanks
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
                    <Switch>
                    <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
                    <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)}/>
                    <Route path='/news' component={News}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/settings' component={Settings}/>
                    <Route path='/users' render={() => < UsersContainer />}/>
                    <Route path='/login' render={() => < Login/>}/>
                    {/*<Route path='*' render={() => <div>404 Not Found</div>} />*/}
                    {/*    <Redirect from="/" to="/profile" />*/}
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: StateType) => ({initialized: state.app.initialized})


export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);
