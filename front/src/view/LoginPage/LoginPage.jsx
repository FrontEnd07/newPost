import React, { useState } from 'react';
import style from "./LoginPage.module.scss";
import { Header, Title, Form } from "./index"

const LoginPage = () => {

    const [register, setRegister] = useState(false);

    return <div className={`page-holder page-holder align-items-center py-4 bg-gray-100 vh-100 ${style.main ? style.main : ""}`}>
        <div className={`container ${style.main ? style.main : ""}`}>
            <div className='align-items-center row'>
                <div className='px-lg-4 col-lg-6'>
                    <div className='card'>
                        <Header />
                        <div className="p-lg-5 card-body">
                            <Title type={register} />
                            <Form type={register} />
                        </div>
                        <div className="px-lg-5 py-lg-4 card-footer">
                            <div className="text-sm text-muted">
                                У вас {register ? 'уже есть' : 'нет'} аккаунта? <a href='#' onClick={() => setRegister(!register)}>
                                    {register ? 'Авторизоваться' : 'Регистрация'}</a>.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ms-xl-auto px-lg-4 text-center text-primary col-xl-5 col-lg-6">
                    <div className={`${style.info ? style.info : ""} mb-4`}>
                        <div>
                            <span>
                                <span>
                                    <img alt="" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27475%27%20height=%27356%27/%3e" />
                                </span>
                                <img alt="" srcSet="https://bubbly-react.vercel.app/img/drawkit-illustration.svg, https://bubbly-react.vercel.app/img/drawkit-illustration.svg 2x" src="https://bubbly-react.vercel.app/img/drawkit-illustration.svg" className="img-fluid" />
                            </span>
                        </div>
                    </div>
                    <h1 className="mb-4">Начни экономить <br className="d-none d-lg-inline" />свое время &amp; деньги</h1>
                    <p className="lead text-muted">Однажды утром, когда Грегор Замза очнулся от беспокойного сна, он обнаружил, что преобразился в своей постели в</p>
                </div>
            </div>
        </div>
    </div>
}

export default LoginPage;
