import React from 'react';
import style from "./Form.module.scss";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from 'react-redux';
import { LField, Radio, Button } from "../../../../components";
import { postAddTrackerApi } from '../../../../http/Main/Tracker';
import { disabledAC } from "../../../../store/Reducers/Main/Tracker";

const schema = yup.object().shape({
    tracker: yup.string().trim().required("Обязательно"),
    title: yup.string().trim(),
    pcs: yup.string().trim().required("Обязательно"),
    radio: yup.string().required("Обязательная поля!")
});

const Form = () => {

    const dispatch = useDispatch();
    const { address } = useSelector(state => state.address);
    const { disabled } = useSelector(state => state.tracker);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const radioOptions = address?.map(el => ({
        label: el.street,
        value: el.id,
        checked: false
    }))

    const handlerSubmit = (data) => {
        dispatch(disabledAC(!disabled))
        const payload = {
            "name": data.title,
            "tracker": data.tracker,
            "quantity": data.pcs,
            "streetId": data.radio
        }
        dispatch(postAddTrackerApi(payload))
    }

    return <form action="/">
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
        {address ? <Radio
            name="radio"
            options={radioOptions}
            register={register}
            errors={errors}
        /> : <Link to="/address" className={`mb-3 ${style.radio} ${errors["radio"] ? style.RError : ""}`}>
            <div><AiOutlinePlus size={17} /></div>
            <div>Добавить адрес</div>
        </Link>}
        <Button text="Добавить" disabled={disabled} hendle={handleSubmit(handlerSubmit)} />
    </form>
}

export default Form;