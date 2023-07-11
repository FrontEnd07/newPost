import React, { useState } from 'react';
import style from "./Main.module.scss";
import { CiHome } from "react-icons/ci";
import { BsTruck } from "react-icons/bs";
import { SiHotjar } from "react-icons/si"
import Footer from "../Footer";
import { showAC } from "../../store/Reducers/Header";
import { useSelector, useDispatch } from "react-redux";
import { Collapse, Nav } from 'react-bootstrap';
import { PiBracketsAngleThin, PiTableLight, PiKeyboardThin, PiStarLight } from "react-icons/pi";

const Main = () => {
    const dispatch = useDispatch()
    const [toggle, setToggle] = useState([])
    let { show } = useSelector(state => state.showHeaderSidebar)

    const handlerToggle = (idEvent) => setToggle((prevItems) => ({ ...prevItems, [idEvent]: !prevItems[idEvent] }));

    const sidebar = [
        {
            "name": "Dashboards",
            "icon": <CiHome className="me-3" size={24} />,
            "path": ['Default', "CMS", 'E-commerce', 'Projects', "Charts"]
        },
        {
            "name": "CMS",
            "icon": <BsTruck className="me-3" size={24} />,
            "path": ['Default', "CMS", 'E-commerce', 'Projects', "Charts"]
        },
    ]

    const info = [
        {
            "name": "Introduction",
            "icon": <PiBracketsAngleThin className="me-3" size={24} />,
            "path": ['Default', "CMS", 'E-commerce', 'Projects', "Charts"]
        },
        {
            "name": "Directory structure",
            "link": "#",
            "icon": <PiTableLight className="me-3" size={24} />,
            "path": ['Default', "CMS", 'E-commerce', 'Projects', "Charts"]
        },
        {
            "name": "Next.js",
            "icon": <PiKeyboardThin className="me-3" size={24} />,
            "path": ['Default', "CMS", 'E-commerce', 'Projects', "Charts"]
        },
        {
            "name": "Changelog",
            "icon": <PiStarLight className="me-3" size={24} />,
            "path": ['Default', "CMS", 'E-commerce', 'Projects', "Charts"]
        },
        {
            "name": "Credits",
            "icon": <SiHotjar className="me-3" size={24} />,
            "path": ['Default', "CMS", 'E-commerce', 'Projects', "Charts"]
        },
    ]

    return <div className={`d-flex align-items-stretch ${style.main}`}>
        <div className={`sidebar py-3 ${!show ? "shrink show" : ""}`} id="sidebar">
            <h6 className="sidebar-heading">Главный</h6>
            <ul className="list-unstyled">{sidebar.map((el, i) => <li key={i} className="sidebar-list-item">
                <Nav
                    role="button"
                    data-bs-toggle="collapse"
                    onClick={() => handlerToggle(i)}
                    className="sidebar-link text-muted"
                    aria-expanded={toggle[i] ? "true" : "false"}
                >
                    {el.icon}
                    <span className="sidebar-link-title">{el.name}</span>
                </Nav>
                <Collapse in={toggle[i] ? true : false}>
                    <div>
                        {el.path.map((v, k) => <Nav.Link key={k} className="sidebar-link text-muted">
                            {v}
                        </Nav.Link>)}
                    </div>
                </Collapse>
            </li>)}
            </ul>
            <h6 className="sidebar-heading">Инфо</h6>
            <ul className="list-unstyled">{info.map((el, i) => <Nav.Link key={i} className="sidebar-link text-muted">
                {el.icon}
                <span className="sidebar-link-title">{el.name}</span>
            </Nav.Link>)}
            </ul>
        </div>
        <div className="page-holder bg-gray-100">
            <div className='px-lg-4 px-xl-5 container-fluid'>
                test
            </div>
            <Footer />
        </div>
    </div>
}

export default Main;
