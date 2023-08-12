import React from 'react';
import FormTracker from './FormTracker';
import Containers from '../Containers'
import { Navigate } from 'react-router-dom';
import TableContainer from "./TableContainer";

const AdminAddTracker = () => {
    const about = JSON.parse(localStorage.getItem('about'))

    let content;

    if (about.role === "0") {
        content = <Containers header="Добавить трекер">
            <section>
                <div className='mb-5 row'>
                    <div className='mb-5 col-lg-4'>
                        <FormTracker />
                    </div>
                    <div className='col-lg-8'>
                        <TableContainer />
                    </div>
                </div>
            </section>
        </Containers>
    } else {
        content = <Navigate to="/" replace />;
    }

    return content
}

export default AdminAddTracker;
