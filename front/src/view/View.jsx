import React from 'react';
import style from "./View.module.scss";
import { useSelector } from "react-redux";
import { LoginPage, Header, Main, Footer } from "./index"

const View = () => {

    const about = JSON.parse(localStorage.getItem('about'))
    let { login } = useSelector(state => state.sign);

    if (!(about || login)) return <LoginPage />

    return <div className={`align-items-stretch ${style.main ? style.main : ""}`}>
        <Header />
        <Main />
    </div>
}

export default View;
