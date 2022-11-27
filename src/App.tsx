import React from 'react';
import './App.css';
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Profile from "./components/profile";

function App() {
    return (
        <div className="app-wrapper">
            <Header />
            <Navbar />
            <Profile />
        </div>
    );
}

export default App;
