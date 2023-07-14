import React, { useState } from 'react';
import style from "./AddTracker.module.scss";
import * as yup from "yup";
import Containers from '../Containers';
import { useForm } from "react-hook-form";
import { LField, Radio, Table } from "../../../components";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    tracker: yup.string().trim().required("Обязательно"),
    title: yup.string().trim(),
    pcs: yup.string().trim().required("Обязательно"),
    radio: yup.string().required("Обязательная поля!")
});

const AddTracker = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const handlerSubmit = (client) => {
        console.log(client)
    }

    const radioOptions = [
        { label: "Содирхон хофиз 257", value: "0", checked: true },
        { label: "Содирхон хофиз 374", value: "1" }
    ];

    const dataTable = [
        {
            tableTop: [
                {
                    name: "id"
                },
                {
                    name: "Трекер"
                },
                {
                    name: "Количество"
                },
                {
                    name: "Дата"
                },
                {
                    name: "статус"
                },
                {
                    name: "Наименования"
                }
            ],
        },
        {
            tableBody: [
                {
                    id: "1",
                    tracker: "TW650123123",
                    name: "0",
                    status: "Получен на склад Гуанчжоу",
                    date: '25-07-2023',
                    pcs: 45
                },
                {
                    id: "1",
                    tracker: "TW6506506206",
                    name: "0",
                    status: "Получен на склад Урумчи",
                    date: '25-07-2023',
                    pcs: 12
                },
                {
                    id: "1",
                    tracker: "TW650123206",
                    name: "0",
                    status: "Получен на склад Душанбе",
                    date: '25-07-2023',
                    pcs: 12
                },
                {
                    id: "1",
                    tracker: "78123912123",
                    name: "0",
                    status: "Получен на склад Гуанчжоу",
                    date: '25-07-2023',
                    pcs: 7
                },
                {
                    id: "1",
                    tracker: "90-18290389",
                    name: "-",
                    status: "Получен на склад Худжанд",
                    date: '25-07-2023',
                    pcs: 1
                }]
        }
    ];

    return <Containers header={"Мои трекеры"}>
        <section>
            <div className='mb-5 row'>
                <div className='col-lg-4'>
                    <div className='mb-4 mb-lg-0 card'>
                        <div className="card-header">
                            <h4 className="card-heading">Добавить трекер</h4>
                        </div>
                        <div className='card-body'>
                            <form action="/">
                                <LField
                                    id="tracker"
                                    placeholder="Трек номер"
                                    name="tracker"
                                    type="text"
                                    register={register}
                                    errors={errors} />
                                <LField
                                    id="title"
                                    placeholder="Наименования"
                                    name="title"
                                    type="text"
                                    register={register}
                                    errors={errors} />
                                <LField
                                    id="pcs"
                                    placeholder="Количество"
                                    name="pcs"
                                    type="text"
                                    register={register}
                                    errors={errors} />
                                <Radio
                                    name="radio"
                                    options={radioOptions}
                                    register={register}
                                    errors={errors}
                                />
                                <button onClick={handleSubmit(handlerSubmit)} className="btn btn-outline-primary">Добавить</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='col-lg-8'>
                    <Table data={dataTable} />
                </div>
            </div>
        </section>
    </Containers>
}

export default AddTracker;
