import React, { useState, useEffect } from 'react';
import style from "./AddTracker.module.scss";
import Form from './Form';
import Containers from '../Containers';
import TableContainer from "./TableContainer";
import { useDispatch, useSelector } from 'react-redux';
import { getTrackerApi } from '../../../http/Main/Tracker';
import { optionsAddressApi } from '../../../http/Main/Address';

const AddTracker = () => {
    const dispatch = useDispatch();
    const { address } = useSelector(state => state.address);
    const { tracker } = useSelector(state => state.tracker);

    useEffect(() => {
        if (!address) dispatch(optionsAddressApi());
        if (!tracker) dispatch(getTrackerApi());
        return () => { }
    }, [])

    return <Containers header={"Мои трекеры"}>
        <section>
            <div className='mb-5 row'>
                <div className='col-lg-4'>
                    <div className='mb-4 mb-lg-0 card'>
                        <div className="card-header">
                            <h4 className="card-heading">Добавить трекер</h4>
                        </div>
                        <div className='card-body'>
                            <Form />
                        </div>
                    </div>
                </div>
                <div className='col-lg-8'>
                    <TableContainer />
                </div>
            </div>
        </section>
    </Containers>
}

export default AddTracker;
