import React, { useState, useEffect, forwardRef } from 'react';
import styles from "./ReactTable.module.scss";
import { useDebounce } from 'usehooks-ts'
import { useDispatch } from "react-redux";
import { Pagination } from "../../components";
import { useTable, useSortBy } from "react-table";
import { Button } from "../";

const ReactTable = ({ columns,
    data,
    meta,
    placeholder,
    handlerTable,
    deleteHandler = false,
    manualPagination = false
}) => {

    const dispatch = useDispatch();
    const [query, setQuery] = useState(null)
    const [check, setCheck] = useState({ selection: {} })
    const [isInitialRender, setIsInitialRender] = useState(true);

    const debouncedValue = useDebounce(query, 500)

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

    useEffect(() => {
        if (isInitialRender) {
            setIsInitialRender(false);
            return;
        }

        handlerTable({ search: debouncedValue });
    }, [debouncedValue])

    const handlerDelete = () => {
        if (Object.keys(check.selection).length > 0) {
            deleteHandler(Object.keys(check.selection).map(Number))
            setCheck({ selection: {} })
        }
    }

    const {
        rows,
        prepareRow,
        headerGroups,
        getTableProps,
        getTableBodyProps,
    } = useTable({
        columns,
        data,
        manualPagination
    }, useSortBy);

    return <div>
        <div className='dataTable-top'>
            {deleteHandler && <span className="me-2">
                <Button hendle={handlerDelete} text="Удалить" appClassName="align-top mb-1 mb-lg-0 btn btn-outline-primary btn-sm" />
            </span>}
            <div className="d-inline-block">
                <select defaultValue="5" onChange={(e) => handlerTable({ perPage: e.target.value, page: 1 })} className="d-inline w-auto me-1 form-select form-select-sm">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                </select>
            </div>
            <div className="d-inline-block">
                <input type="search" onChange={(e) => setQuery(e.target.value)} placeholder={placeholder} id="search" className="form-control" />
            </div>
        </div>
        <div className='table-responsive' style={{ position: "relative" }}>
            <table className="align-middle mb-0 table table-hover" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => <th
                            colSpan="1"
                            style={{ cursor: 'pointer' }}
                            className="py-4"
                            {...column.getHeaderProps(column.getSortByToggleProps())}>
                            <span className="d-flex align-items-center text-transform-none">
                                {column.render("Header")}
                                <span>
                                    {column.isSorted ? (column.isSortedDesc ? "🔽" : " 🔼") : ""}
                                </span>
                            </span>
                        </th>)}
                    </tr>)}
                </thead>
                <tbody className="position-relative border-top-0" {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return <tr role="row" {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return <td
                                    style={{ maxWidth: "200px" }}
                                    className="text-start"
                                    {...cell.getCellProps()}>
                                    {(cell.column.id === 'id' && deleteHandler) ? <input
                                        style={{ cursor: "pointer" }}
                                        type="checkbox"
                                        onChange={event => handlerCheck(cell.value, event)}
                                        checked={check.selection[cell.value] || false}
                                    /> : cell.render('Cell')}
                                </td>;
                            })}
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
        <div className={`dataTable-bottom align-items-center d-flex ${styles.grid}`}>
            {meta ? <>
                <div className="flex-shrink-0 mb-2 mb-md-0 me-auto">Страницы {meta?.currentPage} из {meta?.lastPage}</div>
                <Pagination
                    total={meta?.total}
                    perPage={meta?.perPage}
                    handlerTable={handlerTable}
                    currentPage={meta?.currentPage}
                    lastPage={meta?.lastPage} />
            </> : null}
        </div>
    </div>
}

export default ReactTable;
