import React, { useState } from 'react';
import style from "./AddTracker.module.scss";
import * as yup from "yup";
import Containers from '../Containers';
import { useForm } from "react-hook-form";
import { LField, Radio } from "../../../components";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    tracker: yup.string().trim().required("Обязательно"),
    title: yup.string().trim(),
    pcs: yup.string().trim().required("Обязательно"),
    radio: yup.string().required("Обязательная поля!")
});

const AddTracker = () => {
    const [submit, setSubmit] = useState(false)
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const handlerSubmit = (client) => {
        setSubmit(!submit)
        console.log(client)
    }

    const radioOptions = [
        { label: "Содирхон хофиз 257", value: "0", checked: true },
        { label: "Содирхон хофиз 374", value: "1" }
    ];
    console.log(submit)
    return <Containers header={"Мои трекеры"}>
        <section>
            <div className='mb-5 row'>
                <div className='col-lg-4'>
                    <div className='mb-4 mb-lg-0 card'>
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
                    <div className='card-table card'>test</div>
                </div>
            </div>
        </section>
    </Containers>
}

export default AddTracker;
