import React, { forwardRef } from 'react';
import style from "./CardAddress.module.scss"
import { FaPen } from "react-icons/fa";
import Dropdown from 'react-bootstrap/Dropdown';
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { deleteAddressApi } from '../../http/Main/Address/Address';

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

const CardAddress = ({ body }) => {

    const dispatch = useDispatch();

    const hundleDelete = (id) => {
        dispatch(deleteAddressApi(id))
    }

    return <div className={`mb-2 col-sm-3 ${style.main ? style.main : ""}`}>
        <div className='h-100 card'>
            <div className='card-header'>
                <h5 className='card-heading'>Адрес доставки</h5>
                <div className="card-header-more">
                    <Dropdown>
                        <Dropdown.Toggle
                            as={CustomToggle}>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='dropdown-menu-animated'>
                            <Dropdown.Item onClick={() => hundleDelete(body.id)}>
                                <RiDeleteBin7Fill size={12} className="me-2 opacity-5" />
                                Удалить
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <div className='card-body'>
                <p className="card-text text-muted card-text">
                    {body.phone}
                    <br />
                    {body.street}
                    <br />
                    {body.city}
                    <br />
                    Tajikistan
                    <br />
                    <strong>{body.name}</strong>
                </p>
            </div>
        </div>
    </div>
}

export default CardAddress;
