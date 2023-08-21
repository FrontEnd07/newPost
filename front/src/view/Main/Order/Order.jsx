import React from 'react';
// import style from "./Order.module.scss";
import { AddOrder } from '../../../components';
import Containers from '../Containers/Containers';
import TableContainer from './TableContainer';

const Order = () => <Containers header={"Заказы"}>
    <section>
        <div className='mb-5 row'>
            <div className='mb-5 col-lg-4'>
                <AddOrder />
            </div>
            <div className='col-lg-8'>
                <TableContainer />
            </div>
        </div>
    </section>
</Containers>

export default Order;
