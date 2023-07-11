import React from 'react';
import style from "./View.module.scss";
import { LoginPage, Header, Main, Footer } from "./index"

const View = () => {

    if (false) return <LoginPage />

    return <div className={`align-items-stretch ${style.main ? style.main : ""}`}>
        <Header />
        <Main />
    </div>
}

export default View;
