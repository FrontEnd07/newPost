import React, { useEffect, useState } from 'react';
import style from "./TableContainer.module.scss"
import { useSelector, useDispatch } from 'react-redux';
import { ReactTable, Loading } from '../../../../components';
import { getAdminTrackerApi } from '../../../../http/Main/AdminAddTracker';
import { http_build_query } from "../../../../utils/NFormatter";

const columns = [
    {
        Header: "id",
        accessor: "id",
        sortable: true,
    },
    {
        Header: "Трекер",
        accessor: "tracker",
        Cell: ({ row }) => {
            let { image, tracker } = row.original
            return <div className="text-reset text-decoration-none d-flex align-items-center">
                {image && <div className="card-table-img me-3 d-none d-lg-block">
                    <span className={style.image}>
                        <img src={image} alt="" />
                    </span>
                </div>}
                <strong style={{ maxWidth: "200px" }}>{tracker}</strong>
            </div>
        },
        sortable: true,
    },
    {
        Header: "Пользователь",
        accessor: "user",
        Cell: ({ row }) => {
            let { user } = row.original
            if (user) {
                return <div>{user.name}, {user.phone}</div>
            }
            return "Пользователь не добавлен!"
        },
        sortable: true
    },
    {
        Header: "Трекер пользователя",
        accessor: "userTrackerInfo",
        Cell: ({ row }) => {
            let { userTrackerInfo } = row.original
            if (userTrackerInfo) {
                return <div>{userTrackerInfo.name}, {userTrackerInfo.phone}</div>
            }
            return "Пользователь не найден!"
        },
        sortable: true
    },
]

const TableContainer = () => {
    const dispatch = useDispatch();
    const [tableFilter, setTableFilter] = useState({});
    let { loading, trackerAdmin, meta } = useSelector(state => state.adminAddTracker)

    const handlerTable = (filter) => {
        const keys = Object.keys(filter)[0];
        setTableFilter(prev => ({ ...prev, [keys]: filter[keys] }));
    };

    useEffect(() => {
        if (Object.keys(tableFilter).length > 0) {
            dispatch(getAdminTrackerApi(`?` + http_build_query(tableFilter)));
        }
    }, [tableFilter]);

    return <div className="card-table card">
        {loading && <Loading />}
        <ReactTable
            deleteType={false}
            columns={columns}
            data={trackerAdmin}
            meta={meta}
            placeholder="Трекер"
            handlerTable={handlerTable}
        />
    </div>
}

export default TableContainer;
