import React, { useState, useEffect } from 'react';
import style from "./TableContainer.module.scss";
import 'moment/locale/ru';
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import { ReactTable, Loading } from "../../../../components";
import { http_build_query } from '../../../../utils/NFormatter';
import { listAC } from '../../../../store/Reducers/Main/AdminOrderList';
import { getAdminOrderListApi, deleteAdminOrderApi } from "../../../../http/Main/AdminOrderList"

const columns = [
    {
        Header: "id",
        accessor: "id",
        sortable: true,
    },
    {
        Header: "Ссылка",
        accessor: "link",
        Cell: (props) => <div className="text-reset text-decoration-none d-flex align-items-center">
            <div className="card-table-img me-3 d-none d-lg-block">
                <span className={style.image}>
                    <img src={props.row.original.image} alt="" />
                </span>
            </div>
            <strong style={{ maxWidth: "200px" }}>{props.row.original.link}</strong>
        </div>,
        sortable: true,
    },
    { Header: "Цены", accessor: "price", sortable: false },
    { Header: "Количество", accessor: "quantity", sortable: true },
    {
        Header: "Дата",
        accessor: "date",
        Cell: ({ row }) => moment(row.original.date).local("ru").format("DD MMMM YYYY"),
        sortable: true
    },
    {
        Header: "Параметры",
        accessor: "parametrs",
        sortable: true,
        Cell: ({ row }) => {
            const { parametrs } = row.original;
            if (parametrs) {
                const parsedParametrs = JSON.parse(parametrs);
                const html = Object.values(parsedParametrs).map(el => `${el}<br />`).join('');
                return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
            }
            return 'Без параметров';
        },
    },
]

const TableContainer = () => {
    const dispatch = useDispatch();
    const [tableFilter, setTableFilter] = useState({});
    let { list, loading, meta } = useSelector(state => state.orderList)

    useEffect(() => {
        if (list.length === 0) {
            dispatch(getAdminOrderListApi())
        }
        return () => dispatch(listAC([]))
    }, [])

    useEffect(() => {
        if (Object.keys(tableFilter).length > 0) {
            dispatch(getAdminOrderListApi(`?` + http_build_query(tableFilter)))
        }
    }, [tableFilter]);

    const handlerTable = (filter) => {
        const keys = Object.keys(filter)[0];
        setTableFilter(prev => ({ ...prev, [keys]: filter[keys] }));
    };

    const deleteHandler = (id) => {
        dispatch(deleteAdminOrderApi(id));
    }

    return <div className="card-table card">
        {loading && <Loading />}
        <ReactTable
            meta={meta}
            columns={columns}
            data={list}
            placeholder="Трекер"
            deleteHandler={deleteHandler}
            handlerTable={handlerTable}
        />
    </div>
}

export default TableContainer;
