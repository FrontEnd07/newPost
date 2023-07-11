import React from 'react';
import style from "./Footer.module.scss";

const Footer = () => {
    let today = new Date();
    return <footer className={`footer bg-white shadow align-self-end py-3 px-xl-5 w-100 ${style.main && style.main}`}>
        <div className='container-fluid'>
            <div className='row'>
                <div className='text-center text-md-start fw-bold col-md-6'>
                    <p class="mb-2 mb-md-0">Новая почта © {today.getFullYear()}</p>
                </div>
                <div className='text-center text-md-end text-gray-400 col-md-6'>
                    <p class="mb-0">Version 1.3.0</p>
                </div>
            </div>
        </div>
    </footer>
}

export default Footer;
