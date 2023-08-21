import React, { useEffect, useState } from 'react';
import 'moment/locale/ru';
import moment from "moment";
import style from "./TableContainer.module.scss"
import { useSelector, useDispatch } from 'react-redux';
import { ReactTable, Loading } from '../../../../components';
import { http_build_query } from "../../../../utils/NFormatter";
import { getAdminTrackerApi } from '../../../../http/Main/AdminAddTracker';
import { deleteAdminTrackerApi } from '../../../../http/Main/AdminAddTracker';
import { trackerAdminAC } from '../../../../store/Reducers/Main/AddTrackerAdmin';

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
            return "-"
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
            return "-"
        },
        sortable: true
    },
    {
        Header: "Статус",
        accessor: "status",
        Cell: ({ row }) => {
            const { status } = row.original
            if (status.length > 0) {
                return status.map((el, i) => <div key={i}>
                    <span className="badge text-success bg-success-light">
                        <span className="indicator"></span>
                        {el.status}
                    </span>
                </div>)
            } else {
                return "-"
            }
        },
        sortable: true
    },
    {
        Header: "Дата",
        accessor: "date",
        Cell: ({ row }) => moment(row.original.date).locale('ru').format("DD MMMM YYYY"),
        sortable: true
    },
]

const TableContainer = () => {
    const dispatch = useDispatch();
    const [tableFilter, setTableFilter] = useState({});
    let { loading, trackerAdmin, meta } = useSelector(state => state.adminAddTracker)

    useEffect(() => {
        if (trackerAdmin.length === 0) {
            dispatch(getAdminTrackerApi())
        }
        return () => dispatch(trackerAdminAC([]))
    }, [])

    useEffect(() => {
        if (Object.keys(tableFilter).length > 0) {
            dispatch(getAdminTrackerApi(`?` + http_build_query(tableFilter)));
        }
    }, [tableFilter]);

    const handlerTable = (filter) => {
        const keys = Object.keys(filter)[0];
        setTableFilter(prev => ({ ...prev, [keys]: filter[keys] }));
    };

    const deleteHandler = (id) => {
        dispatch(deleteAdminTrackerApi(id));
    }

    return <div className="card-table card">
        {loading && <Loading />}
        <ReactTable
            meta={meta}
            columns={columns}
            data={trackerAdmin}
            placeholder="Трекер"
            deleteHandler={deleteHandler}
            handlerTable={handlerTable}
        />
    </div>
}

export default TableContainer;
