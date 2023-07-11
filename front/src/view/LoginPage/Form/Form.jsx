import React from 'react';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LField, Check, LFieldMask } from "../../../components/index";

const auth = yup.object().shape({
    name: yup.string().trim().required("Обязательно"),
    pass: yup.string().trim().required("Обязательно"),
    agree: yup.boolean()
});

const regSchema = yup.object().shape({
    name: yup.string().trim().required("Обязательно"),
    pass: yup.string().trim().required("Обязательно"),
    phone: yup.string().transform((value) => value
        .replace(/\+992/g, '')
        .replace(/\s.*?/g, '')
        .replace(/\(/g, '')
        .replace(/\)/g, '')
        .replace(/-/g, '')
        .replace(/_/g, ''))
    .min(9, 'Не менее 9 символов').required("Обязательно"),
    city: yup.string().trim().required("Обязательно"),
        conditions: yup.boolean().oneOf([true])
});

const Form = ({ type }) => {

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(type ? regSchema : auth),
    });

    const handlerSubmit = (client) => {
        console.log(client)
    }

    return <form id="loginForm" action="/" className="">

        <LField
            id="name"
            placeholder="Ваше имя"
            name="name"
            type="text"
            register={register}
            errors={errors} />

        {type && <>
            <LFieldMask
                id="phone"
                placeholder="Телефон"
                name="phone"
                mask="+\9\92 (99) 999-99-99"
                register={register}
                errors={errors}
            />
            <LField
                id="city"
                placeholder="Город"
                name="city"
                type="text"
                register={register}
                errors={errors} />
        </>}

        <LField
            id="pass"
            placeholder="Пароль"
            name="pass"
            type="password"
            register={register}
            errors={errors} />

        {type ? <Check
            id="conditions"
            placeholder="Я согласен с Условиями использования"
            name="conditions"
            type="checkbox"
            register={register}
            errors={errors} /> : <Check
            id="agree"
            placeholder="Запомнить меня"
            name="agree"
            type="checkbox"
            register={register}
            errors={errors} />}

        <button onClick={handleSubmit(handlerSubmit)} className="btn btn-primary btn-lg">Войти</button>
    </form>
}

export default Form;
