import React, { useState } from 'react';
import Footer from "../Footer";
import style from "./Main.module.scss";
import { CiHome } from "react-icons/ci";
import { BsHouseAdd } from "react-icons/bs";
import { Collapse, Nav } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, NavLink, useLocation } from "react-router-dom";
import {
    Order,
    Address,
    Dashboard,
    AddTracker,
    InfoAddress,
    OrderUserList,
    AdminAddTracker,
} from "./index"
import { PiKeyboardThin, } from "react-icons/pi";
import { AiOutlineOrderedList } from "react-icons/ai";

const Main = () => {
    const dispatch = useDispatch()
    const [toggle, setToggle] = useState([])
    const about = JSON.parse(localStorage.getItem('about'))
    let { show } = useSelector(state => state.showHeaderSidebar)

    const handlerToggle = (idEvent) => setToggle((prevItems) => ({ ...prevItems, [idEvent]: !prevItems[idEvent] }));

    const sidebar = [
        {
            "name": "ПАНЕЛЬ",
            "show": true,
            "icon": <CiHome className="me-3" size={24} />,
            "path": [
                {
                    "name": "Главное",
                    "link": '/'
                },
                {
                    "name": "Адрес",
                    "link": '/address'
                },
                {
                    "name": "Добавить трекер",
                    "link": '/add-tracker'
                },
                {
                    "name": "Создать заказ",
                    "link": '/order'
                }
            ]
        },
        {
            "name": "ADMIN",
            "show": about.role === "0" ? true : false,
            "icon": <PiKeyboardThin className="me-3" size={24} />,
            "path": [
                {
                    "name": "Добавить трекер",
                    "link": '/admin-add-tracker'
                },
                {
                    "name": "Заказы клиентов",
                    "link": '/order-user-list'
                }
            ]
        },
    ]

    const info = [
        {
            "name": "Добавить адрес нашего склада",
            "icon": <BsHouseAdd className="me-3" size={24} />,
            "link": "/info-address",
            "path": ['Default', "CMS", 'E-commerce', 'Projects', "Charts"]
        },
        // {
        //     "name": "Directory structure",
        //     "link": "#",
        //     "icon": <PiTableLight className="me-3" size={24} />,
        //     "path": ['Default', "CMS", 'E-commerce', 'Projects', "Charts"]
        // },
        // {
        //     "name": "Next.js",
        //     "icon": <PiKeyboardThin className="me-3" size={24} />,
        //     "path": ['Default', "CMS", 'E-commerce', 'Projects', "Charts"]
        // },
        // {
        //     "name": "Changelog",
        //     "icon": <PiStarLight className="me-3" size={24} />,
        //     "path": ['Default', "CMS", 'E-commerce', 'Projects', "Charts"]
        // },
        // {
        //     "name": "Credits",
        //     "icon": <SiHotjar className="me-3" size={24} />,
        //     "path": ['Default', "CMS", 'E-commerce', 'Projects', "Charts"]
        // },
    ]
    return <div className={`d-flex align-items-stretch ${style.main}`}>
        <div className={`sidebar py-3 ${!show ? "shrink show" : ""}`} id="sidebar">
            <h6 className="sidebar-heading">Меню</h6>
            <ul className="list-unstyled">{sidebar.map((el, i) => {
                if (el.show) {
                    return <li key={i} className="sidebar-list-item">
                        <Nav
                            role="button"
                            data-bs-toggle="collapse"
                            onClick={() => handlerToggle(i)}
                            className={"sidebar-link text-muted"}
                            aria-expanded={toggle[i] ? "true" : "false"}
                        >
                            {el.icon}
                            <span className="sidebar-link-title">{el.name}</span>
                        </Nav>
                        <Collapse in={toggle[i] ? true : false}>
                            <div className='sidebar-list-item'>
                                {el.path.map((v, k) => <NavLink
                                    to={v.link}
                                    key={k}
                                    className={({ isActive }) =>
                                        isActive ? "sidebar-link text-muted active" : "sidebar-link text-muted"
                                    }
                                    end>
                                    {v.name}
                                </NavLink>)}
                            </div>
                        </Collapse>
                    </li>
                } else {
                    return null
                }
            })}
            </ul>
            <h6 className="sidebar-heading">Инфо</h6>
            <ul className="list-unstyled">{info.map((el, i) => <NavLink to={el.link} key={i} className="sidebar-link text-muted">
                {el.icon}
                <span className="sidebar-link-title">{el.name}</span>
            </NavLink>)}
            </ul>
        </div>
        <div className="page-holder bg-gray-100">
            <div className='px-lg-4 px-xl-5 container-fluid'>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/address" element={<Address />} />
                    <Route path="/add-tracker" element={<AddTracker />} />
                    <Route path="/info-address" element={<InfoAddress />} />
                    <Route path="/order-user-list" element={<OrderUserList />} />
                    <Route path="/admin-add-tracker" element={<AdminAddTracker />} />
                </Routes>
            </div>
            <Footer />
        </div>
    </div >
}

export default Main;
