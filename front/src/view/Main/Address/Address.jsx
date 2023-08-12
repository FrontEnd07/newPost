import React from 'react';
// import style from "./Address.module.scss";
import * as yup from "yup";
import Containers from "../Containers"
import { useForm } from "react-hook-form";
import { CardAddress } from "../../../components"
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from 'react-redux';
import { LField, LFieldMask, Button } from "../../../components";
import { postAddressApi } from '../../../http/Main/Address/Address';
import { disabledAC } from '../../../store/Reducers/Main/Address/Address';

const schema = yup.object().shape({
    name: yup.string().trim().required("Обязательно"),
    city: yup.string().trim().required("Обязательно"),
    street: yup.string().trim().required("Обязательно"),
    phone: yup.string().transform((value) => value.replace(/\+992|\s|\(|\)|-|_/g, ''))
        .min(9, 'Не менее 9 символов').required("Обязательно"),
});

const Address = () => {
    const dispatch = useDispatch();
    let { disabled, address } = useSelector(state => state.address);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const handlerSubmit = (client) => {
        dispatch(disabledAC(!disabled))
        dispatch(postAddressApi(client));
    }

    return <Containers header={"Добавить адресс"}>
        <div className='col-lg-12'>
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
                        <Button text="Добавить" disabled={disabled} hendle={handleSubmit(handlerSubmit)} />
                    </form>
                </div>
            </div>
            <div className='gy-4 row'>
                {address?.map((el, i) => <CardAddress key={i} body={el} />)}
            </div>
        </div>
    </Containers>
}

export default Address;
