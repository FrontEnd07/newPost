import React, { useState, useEffect } from 'react';
import style from './AddOrder.module.scss';
import * as yup from "yup";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import { price } from '../../utils/NFormatter';
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai"
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from 'react-redux';
import { Button, LField, Radio } from "../../components"
import { postOrderApi } from '../../http/Main/Order/Order';
import { disabledAC } from '../../store/Reducers/Order/Order';

const schema = yup.object().shape({
    link: yup.string().trim().required("Обязательно"),
    price: yup.string().trim().required("Обязательно"),
    pcs: yup.string().trim().required("Обязательно"),
    radio: yup.string().required("Обязательная поля!"),
    file: yup.mixed()
        .required("Required"),
});

const AddOrder = () => {
    const dispatch = useDispatch();
    let { disabled } = useSelector(state => state.order);
    let { address } = useSelector(state => state.address)
    const [additionalFields, setAdditionalFields] = useState([]);
    const [additionalFormData, setAdditionalFormData] = useState();

    const handleAddField = () => {
        setAdditionalFields([...additionalFields, Date.now()]);
    };

    const handleValueChange = (event, index) => {
        const updatedFormData = { ...additionalFormData };
        updatedFormData[index] = event.target.value;
        setAdditionalFormData(updatedFormData);
    };

    const handleDeleteField = (index) => {
        unregister("parametrs")
        setAdditionalFields((prevFields) => prevFields.filter((fieldIndex) => fieldIndex !== index));
    };

    const {
        register,
        formState: { errors },
        handleSubmit,
        unregister,
        setValue
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
        const formData = new FormData();
        formData.append('link', data.link);
        formData.append('price', data.price);
        formData.append('quantity', data.pcs);
        formData.append('image', data.file);
        formData.append('streetId', data.radio);
        if (data.parametrs) {
            formData.append('parametrs', JSON.stringify(data.parametrs));
        }
        dispatch(disabledAC(!disabled))
        dispatch(postOrderApi(formData));
    }

    return <div className='card'>
        <div className='card-header'>
            <h4 className="card-heading">Создать заказ</h4>
        </div>
        <div className='card-body'>
            <form action="/">
                <LField
                    id="link"
                    placeholder="Ссылка на товар"
                    name="link"
                    type="text"
                    register={register}
                    errors={errors} />
                <div className='row'>
                    <div className='col-md-6'>
                        <LField
                            id="price"
                            placeholder="Цена товара ¥"
                            name="price"
                            type="text"
                            onChange={e => { e.target.value = price(e.target.value) }}
                            small="Цена товар и доставки по Китаю"
                            register={register}
                            errors={errors} />
                    </div>
                    <div className='col-md-6'>
                        <LField
                            id="pcs"
                            placeholder="Количество"
                            name="pcs"
                            type="number"
                            onChange={e => { e.target.value = e.target.value.replace(/\D/g, '') }}
                            register={register}
                            errors={errors} />
                    </div>
                </div>
                {additionalFields.map((index) => <div className={`${style.addBlock}`} key={index}>
                    <div className='col-md-11'>
                        <LField
                            key={index}
                            id={`value_${index}`}
                            placeholder={`Цвет, размер и т.п (На Китайском)`}
                            name={`parametrs[value_${index}]`}
                            type="text"
                            onChange={(event) => handleValueChange(event, index)}
                            register={register}
                            errors={errors}
                        />
                    </div>
                    <div className='mb-3' onClick={() => handleDeleteField(index)}>
                        <AiOutlineDelete size={24} />
                    </div>
                </div>)}
                <a onClick={handleAddField} className={`mb-3 ${style.radio}`}>
                    <div><AiOutlinePlus size={17} /></div>
                    <div className='form-check'>Добавить характристику</div>
                </a>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control
                        as="input"
                        type="file"
                        isInvalid={!!errors.file}
                        name="file"
                        onChange={event => { setValue("file", event.currentTarget.files[0]) }}
                    />
                </Form.Group>
                {address ? <Radio
                    name="radio"
                    options={radioOptions}
                    register={register}
                    errors={errors}
                /> : <Link to="/address" className={`mb-3 ${style.radio} ${errors["radio"] ? style.RError : ""}`}>
                    <div><AiOutlinePlus size={17} /></div>
                    <div className='form-check'>Добавить адрес</div>
                </Link>}
                <Button text="Добавить" disabled={disabled} hendle={handleSubmit(handlerSubmit)} />
            </form>
        </div>
    </div>
}

export default AddOrder;
