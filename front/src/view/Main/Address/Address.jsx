import React from 'react';
import style from "./Address.module.scss";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CardAddress } from "../../../components"
import Containers from "../Containers"
import { LField, Check, LFieldMask } from "../../../components";

const schema = yup.object().shape({
    name: yup.string().trim().required("Обязательно"),
    city: yup.string().trim().required("Обязательно"),
    street: yup.string().trim().required("Обязательно"),
    phone: yup.string().transform((value) => value.replace(/\+992|\s|\(|\)|-|_/g, ''))
        .min(9, 'Не менее 9 символов').required("Обязательно"),
});

const Address = () => {

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

    return <Containers header={"Добавить адресс"}>
        <div className='col-lg-8'>
            <div className='mb-4 card'>
                <div className='card-header'>
                    <h4 className="card-heading">Заполняйте форму</h4>
                </div>
                <div className='card-body'>
                    <form action="/" >
                        <LField
                            id="name"
                            placeholder="Ваше имя"
                            name="name"
                            type="text"
                            register={register}
                            errors={errors} />
                        <LField
                            id="city"
                            placeholder="Город"
                            name="city"
                            type="text"
                            register={register}
                            errors={errors} />
                        <LField
                            id="street"
                            placeholder="Улица, дом и квартира"
                            name="street"
                            type="text"
                            register={register}
                            errors={errors} />
                        <LFieldMask
                            id="phone"
                            placeholder="Телефон"
                            name="phone"
                            mask="+\9\92 (99) 999-99-99"
                            register={register}
                            errors={errors}
                        />
                        <button onClick={handleSubmit(handlerSubmit)} className="btn btn-outline-primary">Добавить</button>
                    </form>
                </div>
            </div>
        </div>
        <div className='col-lg-4'>
            <CardAddress />
        </div>
    </Containers>
}

export default Address;
