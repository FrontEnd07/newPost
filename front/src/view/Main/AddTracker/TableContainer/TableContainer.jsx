import React, { useState, useEffect } from 'react';
import 'moment/locale/ru';
import moment from "moment";
import {
    ReactTable,
    Loading
} from '../../../../components';
import { useDispatch, useSelector } from "react-redux";
import { http_build_query } from '../../../../utils/NFormatter';
import { getTrackerApi, deleteTrackerApi } from '../../../../http/Main/Tracker';

const columns = [
    {
        Header: "id",
        accessor: "id",
        sortable: true,
    },
    {
        Header: "Трекер",
        accessor: "tracker",
        sortable: true,
    },
    {
        Header: "Количество",
        accessor: "quantity",
        sortable: true
    },
    {
        Header: "Дата",
        accessor: "created_at",
        Cell: ({ row }) => moment(row.original.date).locale('ru').format("DD MMMM YYYY"),
        sortable: true
    },
    {
        Header: "статус",
        Cell: ({ row }) => {
            const { status } = row.original
            if (status.length > 0) {
                return status.map((el, i) => <div>
                    <span className="badge text-success bg-success-light">
                        <span className="indicator"></span>
                        {el.status}
                    </span>
                </div>)
            } else {
                return "-"
            }
        },
        accessor: "status",
        sortable: true
    },
    {
        Header: "Наименования",
        accessor: "name",
        Cell: ({ row }) => row.original.name ? row.original.name : "Без наименования",
        sortable: true
    },
    {
        Header: "Адрес",
        accessor: "street",
        Cell: ({ row }) => row.original.address.street,
        sortable: true
    }
]


const TableContainer = () => {
    const dispatch = useDispatch();
    const { meta, loading, tracker } = useSelector(state => state.tracker);
    const [tableFilter, setTableFilter] = useState({});

    useEffect(() => {
        if (Object.keys(tableFilter).length > 0) {
            dispatch(getTrackerApi(`?` + http_build_query(tableFilter)));
        }
    }, [tableFilter]);

    const handlerTable = (filter) => {
        const keys = Object.keys(filter)[0];
        setTableFilter(prev => ({ ...prev, [keys]: filter[keys] }));
    };

    const deleteHandler = (id) => {
        dispatch(deleteTrackerApi(id))
    }

    return <div className="card-table card">
        {loading && <Loading />}
        <ReactTable
            deleteHandler={deleteHandler}
            columns={columns}
            data={tracker}
            meta={meta}
            placeholder="Трекер, Наименования, Статус, Адрес"
            handlerTable={handlerTable}
        />
    </div>
}

export default TableContainer;
