import {Breadcrumb, Layout, Menu, MenuProps, theme} from "antd";
import {UserOutlined} from "@ant-design/icons";
import React from "react";
import {Link, Navigate, Route, Routes} from "react-router-dom";
import s from "components/Header/Header.module.css";
import {HeaderContainer} from "components/Header/Header";
import News from "components/News/News";
import Music from "components/Music/Music";
import Settings from "components/Settings/Settings";
import {UsersPage} from "components/Users/UsersContainer";
import {Login} from "components/Login/Login";
import {Content, Footer, Header} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {withSuspense} from "hoc/withSuspense";



const DialogsContainer = React.lazy(() => import('../Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('../Profile/ProfileContainer'));
const ChatPage = React.lazy(() => import('pages/Chat/ChatPage'));
const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedChatPage = withSuspense(ChatPage)

const items2: MenuProps['items'] = [UserOutlined].map(
    (icon, index) => {
        const key = String(index + 1);

        return {

            key: `sub${key}`,
            icon: React.createElement(icon),
            label: 'Menu',

            children: ['Profile', 'Messages', 'Users', 'Chat', 'Music', 'News', 'Settings'].map((e, index) => {
                const subKey = icon;
                return {
                    key: index,
                    label: (
                        <Link to={'/' + `${e}`}>{e} </Link>
                    ),

                };
            }),
        };
    },
);

export const MainPage = () => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    return (
        <Layout>
            <Header style={{display:'flex', justifyContent:'space-between'}}>
                <div className={s.logo}  style={{color: 'wheat'}}>
                    Social Network
                </div>
                <HeaderContainer/>
            </Header>
            <Content style={{padding: '0 20px'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout style={{padding: '24px 0', background: colorBgContainer}}>
                    <Sider style={{background: colorBgContainer}} width={200}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%'}}
                            items={items2}
                        />
                    </Sider>
                    <Content style={{padding: '0 24px', minHeight: 280}}>
                        <Routes>
                            <Route path={'/'} element={<Navigate to={'/profile'}/>}/>
                            <Route path='/messages' element={<SuspendedDialogs/>}/>
                            <Route path='/profile/:userId?' element={<SuspendedProfile/>}/>
                            <Route path='/news' element={<News/>}/>
                            <Route path='/music' element={<Music/>}/>
                            <Route path='/settings' element={<Settings/>}/>
                            <Route path='/users' element={<UsersPage/>}/>
                            <Route path='/login' element={<Login/>}/>
                            <Route path='/chat' element={<SuspendedChatPage/>}/>
                            <Route path='*' element={<div>404 Not Found</div>}/>
                        </Routes>
                    </Content>
                </Layout>
            </Content>
            <Footer style={{textAlign: 'center'}}>Created by @LDS196</Footer>
        </Layout>
    );
};