import React, { useEffect, useState } from 'react';
import style from "./Table.module.scss";
import { useDispatch } from "react-redux";
import { Loading, Pagination } from "../";
import { useDebounce } from 'usehooks-ts'
import { useSelector } from 'react-redux';
import { deleteTrackerApi } from '../../http/Main/Tracker';
import { Button } from "../"


const Table = ({ data, handlerTable }) => {
    const dispatch = useDispatch();
    const [query, setQuery] = useState(null)
    const [check, setCheck] = useState({ selection: {} })
    const [isInitialRender, setIsInitialRender] = useState(true);

    const debouncedValue = useDebounce(query, 500)
    const { meta, loading } = useSelector(state => state.tracker);

    useEffect(() => {
        if (isInitialRender) {
            setIsInitialRender(false);
            return;
        }

        handlerTable({ search: debouncedValue });
    }, [debouncedValue])

    const handlerCheck = (id, event) => {
        setCheck(state => {
            const selection = {
                ...check.selection,
                [id]: event.target.checked
            };

            if (!event.target.checked) delete selection[id];

            return {
                ...state,
                selection
            };
        })
    }

    const handlerDelete = () => {
        if (Object.keys(check.selection).length > 0) {
            dispatch(deleteTrackerApi(Object.keys(check.selection).map(Number)))
            setCheck({ selection: {} })
        }
    }

    return <div className={`card-table card ${style.main ? style.main : ""}`}>
        <div className='dataTable-top'>
            <span className="me-2">
                <Button hendle={handlerDelete} text="Удалить" appClassName="align-top mb-1 mb-lg-0 btn btn-outline-primary btn-sm" />
            </span>
            <div className="d-inline-block">
                <select defaultValue="10" onChange={(e) => handlerTable({ perPage: e.target.value })} className="d-inline w-auto me-1 form-select form-select-sm">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                </select>
            </div>
            <div className="d-inline-block">
                <input type="search" onChange={(e) => setQuery(e.target.value)} placeholder="Трекер, Наименования, Статус, Адрес" id="search" className="form-control" />
            </div>
        </div>
        <div className='table-responsive' style={{ position: "relative" }}>
            {loading && <Loading />}
            <table className="align-middle mb-0 table table-hover">
                <thead>
                    <tr>{data[0].tableTop?.map((el, i) => <th onClick={() => handlerTable({ sort: el.sort })} key={i} colSpan="1" style={{ cursor: 'pointer' }} className="py-4">
                        <span className="d-flex align-items-center text-transform-none">
                            {el.name}
                            <span className="d-grid ms-auto">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-up" className="svg-inline--fa fa-caret-up fa-w-10 fa-sm ms-1 opacity-6" role="img" xlinkHref="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                    <path fill="currentColor" d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z"></path>
                                </svg>
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" className="svg-inline--fa fa-caret-down fa-w-10 fa-sm ms-1 opacity-6" role="img" xlinkHref="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                    <path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z">
                                    </path>
                                </svg>
                            </span>
                        </span>
                    </th>)}
                    </tr>
                </thead>
                <tbody className="position-relative border-top-0">{data[1].tableBody?.map((el, i) => <tr key={i} role="row">
                    <td>
                        <div>
                            <input
                                style={{ cursor: "pointer" }}
                                type="checkbox"
                                onChange={event => handlerCheck(el.id, event)}
                                className="form-check-input"
                                checked={check.selection[el.id] || false}
                            />
                        </div>
                    </td>
                    <td className="text-start">
                        <a className="text-decoration-none text-reset fw-bolder">
                            {el.tracker}
                        </a>
                    </td>
                    <td className="text-start">{el.pcs}</td>
                    <td className="text-start">{el.date}</td>
                    <td className="text-start">
                        <span className="badge text-success bg-success-light">
                            <span className="indicator"></span>
                            {el.status}
                        </span>
                    </td>
                    <td className="text-end">{el.name === "0" ? '-' : el.name}</td>
                    <td className="text-end">{el.street}</td>
                </tr>)}
                </tbody>
            </table>
        </div>
        <div className='dataTable-bottom align-items-center d-flex'>
            <div className="flex-shrink-0 mb-2 mb-md-0 me-auto">Показаны страницы {meta?.currentPage} из {meta?.lastPage}</div>
            <Pagination total={meta?.total} perPage={meta?.perPage} handlerTable={handlerTable} currentPage={meta?.currentPage} lastPage={meta?.lastPage} />
        </div>
    </div>
}

export default Table;
