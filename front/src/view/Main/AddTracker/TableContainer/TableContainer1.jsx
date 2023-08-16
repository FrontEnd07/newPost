import React, { useEffect, useState } from 'react';
import 'moment/locale/ru';
import moment from "moment";
import { Table } from "../../../../components";
import { useDispatch, useSelector } from 'react-redux';
import { getTrackerApi } from '../../../../http/Main/Tracker';
import { http_build_query } from '../../../../utils/NFormatter';

const TableContainer = () => {
    const dispatch = useDispatch();
    const [tableFilter, setTableFilter] = useState({});
    const { tracker } = useSelector(state => state.tracker);

    const handlerTable = (filter) => {
        const kays = Object.keys(filter)[0]
        setTableFilter(prev => ({ ...prev, [kays]: filter[kays] }))
    }

    useEffect(() => {
        if (Object.keys(tableFilter).length > 0) {
            dispatch(getTrackerApi(`?` + http_build_query(tableFilter)))
        }
    }, [tableFilter])

    const dataTable = [
        {
            tableTop: [
                {
                    name: "id",
                    sort: "id"
                },
                {
                    name: "Трекер",
                    sort: "tracker"
                },
                {
                    name: "Количество",
                    sort: "quantity"
                },
                {
                    name: "Дата",
                    sort: "created_at"
                },
                {
                    name: "статус",
                    sort: "status"
                },
                {
                    name: "Наименования",
                    sort: "name"
                },
                {
                    name: "Адрес",
                    sort: "street"
                }
            ],
        },
        {
            tableBody: tracker?.map(el => ({
                id: el.id,
                tracker: el.tracker,
                name: el.name ? el.name : "-",
                status: "el.tracker",
                date: moment(el.date).locale('ru').format("DD MMMM YYYY"),
                pcs: el.quantity,
                street: el.address ? el.address.street : "Адрес был удален",
            }))
        }
    ];

    return <Table handlerTable={handlerTable} data={dataTable} />
}

export default TableContainer;
