import React from 'react';
import style from "./Loading.module.scss";
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
    return <div className={`${style.true}`}>
        <div>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    </div>
}

export default Loading;
