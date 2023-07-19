import React, { useState } from 'react';
import style from "./Header.module.scss";
import { DropDown } from '../../components';
import { FaPaperPlane } from "react-icons/fa";
import { AiOutlineBarChart } from "react-icons/ai"
import { showAC } from "../../store/Reducers/Header";
import { useDispatch, useSelector } from "react-redux";
import { postLogOutApi } from "../../http/LoginPage/LoginPage";

const Header = () => {

    const dispatch = useDispatch()
    let { show } = useSelector(state => state.showHeaderSidebar)
    const about = JSON.parse(localStorage.getItem('about'))
    const handleShow = () => dispatch(showAC(!show));

    const logOut = () => {
        dispatch(postLogOutApi());
    }

    const body = [
        {
            action: "Header",
            role: "User",
            content: <div className="text-gray-700 dropdown-header" role="heading">
                <h6 className="text-uppercase font-weight-bold">{about.name}</h6>
                <small>{about.role === "1" && "Пользователь"}</small>
            </div>
        },
        {
            action: "body",
            menu: [
                {
                    name: "Настройки",
                    function: "",
                    Link: "#"
                }
            ]
        },
        {
            action: "footer",
            menu: [
                {
                    name: "Выход",
                    function: () => logOut(),
                    Link: "#"
                }
            ]
        }
    ]

    return <header className="header">
        <nav className="px-4 py-2 shadow navbar navbar-expand-lg bg-white">
            <a onClick={handleShow} className="sidebar-toggler text-gray-500 me-4 me-lg-5 lead" href="#">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="align-left" className="svg-inline--fa fa-align-left fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="currentColor" d="M12.83 352h262.34A12.82 12.82 0 0 0 288 339.17v-38.34A12.82 12.82 0 0 0 275.17 288H12.83A12.82 12.82 0 0 0 0 300.83v38.34A12.82 12.82 0 0 0 12.83 352zm0-256h262.34A12.82 12.82 0 0 0 288 83.17V44.83A12.82 12.82 0 0 0 275.17 32H12.83A12.82 12.82 0 0 0 0 44.83v38.34A12.82 12.82 0 0 0 12.83 96zM432 160H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0 256H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"></path>
                </svg>
            </a>
            <a href="/" className="fw-bold text-uppercase text-base navbar-brand">
                <span className="d-none d-brand-partial">Новая почта</span>
                <span className="d-none d-sm-inline"> Dashboard</span>
            </a>
            <div className="ms-auto d-flex align-items-center mb-0">
                <div className="dropdown nav-item">
                    <form id="searchForm" className="ms-auto d-none d-lg-block me-4">
                        <div id="react-aria-1" aria-expanded="false" role="search" className="input-group-navbar dropdown-toggle input-group input-group-sm">
                            <input placeholder="Search ..." type="search" className="form-control form-control-sm" />
                            <button type="button" className="btn btn-transparent" >
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="svg-inline--fa fa-search fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="me-2 dropdown nav-item">
                    <a id="notifications" aria-expanded="false" role="button" className="text-gray-400 px-1 nav-link-icon dropdown-toggle nav-link" href="#">
                        <AiOutlineBarChart size={31} />
                        <span className="notification-badge bg-green"></span>
                    </a>
                </div>
                <div className="me-2 me-lg-3 dropdown nav-item">
                    <a id="messages" aria-expanded="false" role="button" className="text-gray-400 px-1 nav-link-icon dropdown-toggle nav-link" href="#">
                        <FaPaperPlane size={24} />
                        <span className="notification-badge notification-badge-number bg-primary">10</span>
                    </a>
                </div>
                <DropDown content={body} appClassName={`ms-auto dropdown nav-item`} ButtonChildren={<div className="avatar">
                    <div className="position-relative overflow-hidden rounded-circle h-100 d-flex align-items-center justify-content-center">
                        <span className={`${style.span}`}>
                            <img alt="Jason Doe"
                                srcSet="https://bubbly-react.vercel.app/_next/image?url=%2Fimg%2Favatar-6.jpg&amp;w=48&amp;q=75 1x, /_next/image?url=%2Fimg%2Favatar-6.jpg&amp;w=96&amp;q=75 2x"
                                src="https://bubbly-react.vercel.app/_next/image?url=%2Fimg%2Favatar-6.jpg&amp;w=96&amp;q=75"
                                decoding="async"
                                data-nimg="fixed"
                                className={`rounded-circle ${style.img}`} />
                        </span>
                    </div>
                </div>} />
            </div>
        </nav>
    </header>
}

export default Header;
