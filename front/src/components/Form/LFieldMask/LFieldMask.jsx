import React, { forwardRef } from 'react';
import style from "./LFieldMask.module.scss";
import InputMask from "react-input-mask";

export const LFieldMask = forwardRef((props, ref) => {

    const { mask, errors, register, label, type, ...rest } = props

    return <div className="form-floating mb-3">
        <InputMask
            className={`form-control ${errors[rest.name] ? "is-invalid" : ""}`}
            mask={mask}
            type="text"
            {...register(rest.name)}
            {...rest}
        />
        <label className="form-label" htmlFor={rest.id}>{rest.placeholder}</label>
    </div >
})