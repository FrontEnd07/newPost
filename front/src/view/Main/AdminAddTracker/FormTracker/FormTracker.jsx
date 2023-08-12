import React, { useState, useEffect } from 'react';
import * as yup from "yup";
import style from "./FormTracker.module.scss"
import Form from 'react-bootstrap/Form';
import { useDebounce } from 'usehooks-ts'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, LField, LFieldMask } from "../../../../components"
import { getUserApi, postAdminAddTrackerApi } from "../../../../http/Main/AdminAddTracker";

const schema = yup.object().shape({
    tracker: yup.string().required("Обязательно"),
    phone: yup.string().transform((value) => value.replace(/\+992|\s|\(|\)|-|_/g, '')),
    image: yup.mixed(),
});

const FormTracker = () => {
    const dispatch = useDispatch()
    let { disabled } = useSelector(state => state.adminAddTracker)
    const [query, setQuery] = useState(null)
    const [userFetch, setUserFetch] = useState([])
    const [userValue, setUserValue] = useState("")
    const debouncedValue = useDebounce(query, 500)
    const [isInitialRender, setIsInitialRender] = useState(true);

    useEffect(() => {
        if (isInitialRender) {
            setIsInitialRender(false);
            return;
        }

        debouncedValue === '' ? setUserFetch([]) : dispatch(getUserApi(debouncedValue)).then(res => {
            if (res) setUserFetch(res.body)
        })

    }, [debouncedValue])

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const handlerSubmit = (data) => {
        let formData = new FormData();
        if (userValue.length == 13) {
            data.phone = userValue.slice(4)
        }
        var trackerArray = data.tracker.trim().split(/[\s,]+/);
        for (let i = 0; i < trackerArray.length; i++) {
            formData.append('tracker[]', trackerArray[i]);
        }
        if (data.image) {
            formData.append('image', data.image);
        }
        formData.append('phone', data.phone);
        dispatch(postAdminAddTrackerApi(formData))
    }

    return <div className='card'>
        <div className='card-header'>
            <h4 className="card-heading">Создать трекер</h4>
        </div>
        <div className='card-body'>
            <form action="/">
                <LField
                    id="tracker"
                    placeholder="Трекер"
                    name="tracker"
                    type="text"
                    register={register}
                    small="Вы можете вводит до 255 символов, несколько трек-номеров, разделяя их пробелами или другими знаками табуляции."
                    errors={errors} />
                <div style={{ position: "relative" }}>
                    <LFieldMask
                        id="phone"
                        placeholder="Телефон"
                        name="phone"
                        value={userValue}
                        onChange={(e) => {
                            setUserValue(`+992` + e.target.value.replace(/\+992|\s|\(|\)|-|_/g, ''))
                            setQuery(e.target.value.replace(/\+992|\s|\(|\)|-|_/g, ''))
                        }}
                        mask="+\9\92 (99) 999-99-99"
                        register={register}
                        errors={errors}
                    />
                    <ListGroup className={`${style.list} ${userFetch.length > 0 ? style.DBloc : style.DNone}`}>
                        {userFetch.map((el) => <ListGroup.Item onClick={() => {
                            setUserValue(`+992` + el.phone)
                            setUserFetch([])
                        }} key={el.id}>{el.user}</ListGroup.Item>)}
                    </ListGroup>
                </div>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control
                        as="input"
                        type="file"
                        name="image"
                        onChange={event => { setValue("image", event.currentTarget.files[0]) }}
                    />
                </Form.Group>
                <Button text="Добавить" disabled={disabled} hendle={handleSubmit(handlerSubmit)} />
            </form>
        </div>
    </div>
}

export default FormTracker;
