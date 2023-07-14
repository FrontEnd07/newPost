import React from 'react';
import style from "./Table.module.scss";

const Table = ({ data }) => {

    return <div className={`card-table card ${style.main ? style.main : ""}`}>
        <div className='dataTable-top'>
            <span className="me-2">
                <select className="d-inline w-auto me-1 form-select form-select-sm">
                    <option>Bulk Actions</option>
                    <option>Delete</option>
                </select>
                <button type="button" className="align-top mb-1 mb-lg-0 btn btn-outline-primary btn-sm">Apply</button>
            </span>
            <div className="d-inline-block">
                <select className="d-inline w-auto me-1 form-select form-select-sm">
                    <option>5</option>
                    <option>10</option>
                    <option>15</option>
                    <option>20</option>
                    <option>25</option>
                </select>
            </div>
            <div className="d-inline-block">
                <input placeholder="Search" type="text" id="search" className="form-control" />
            </div>
        </div>
        <div className='table-responsive'>
            <table role="table" className="align-middle mb-0 table table-hover">
                <thead className="">
                    <tr role="row">{data[0].tableTop.map((el, i) => <th key={i} colSpan="1" role="columnheader" className="py-4">
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
                <tbody className="position-relative border-top-0">{data[1].tableBody.map((el, i) => <tr key={i} role="row">
                    <td className="">
                        <div className="">
                            <input type="checkbox" className="form-check-input" />
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
                </tr>)}
                </tbody>
            </table>
        </div>
        <div className='dataTable-bottom align-items-center d-flex'>
            <div className="flex-shrink-0 mb-2 mb-md-0 me-auto">Showing page 1 of 1</div>
        </div>
    </div>
}

export default Table;
