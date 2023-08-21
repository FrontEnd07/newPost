import React from 'react';
import Containers from '../Containers';
import TableContainer from './TableContainer';

const OrderUserList = () => {
    return <Containers header="Заказы пользователей">
        <section>
            <div className='mb-12 row'>
                <div className='col-lg-12'>
                    <TableContainer />
                </div>
            </div>
        </section>
    </Containers>
}

export default OrderUserList;
