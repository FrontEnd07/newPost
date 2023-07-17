import React from 'react';
import LaddaButton, { S, EXPAND_RIGHT } from 'react-ladda';
import "ladda/dist/ladda-themeless.min.css";

const Button = ({ disabled, text, hendle, appClassName }) => {

    return <LaddaButton
        onClick={hendle}
        loading={disabled}
        className={`${appClassName ? appClassName : "btn btn-outline-primary"}`}
        data-color="#eee"
        data-size={S}
        data-style={EXPAND_RIGHT}
        data-spinner-size={30}
        data-spinner-color="#ddd"
        data-spinner-lines={12}
    >
        {text}
    </LaddaButton>
}

export default Button;
