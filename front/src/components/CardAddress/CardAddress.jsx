import React, { forwardRef } from 'react';
import style from "./CardAddress.module.scss"
import Dropdown from 'react-bootstrap/Dropdown';

const CustomToggle = forwardRef(({ children, onClick }, ref) => (
    <button
        type="button"
        className='dropdown-toggle btn btn-header-more'
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="ellipsis-v"
            className="svg-inline--fa fa-ellipsis-v fa-w-6 "
            role="img"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">
            <path
                fill="currentColor"
                d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z">
            </path>
        </svg>
    </button>
));

const CardAddress = () => {
    return <div className={`card ${style.main && style.main}`}>
        <div className='card-header'>
            <h5 className='card-heading'>Адрес доставки</h5>
            <div className="card-header-more">
                <Dropdown>
                    <Dropdown.Toggle
                        as={CustomToggle}>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className='dropdown-menu-animated'>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
        <div className='card-body'>
            <p className="card-text text-muted card-text">
                John Brown
                <br />13/25 New Avenue
                <br />New Heaven
                <br />
                45Y 73J
                <br />
                England
                <br />
                <strong>Great Britain</strong>
            </p>
        </div>
    </div>
}

export default CardAddress;
