import React, { forwardRef, useState } from 'react';
import style from "./LField.module.scss";

export const LField = forwardRef((props, ref) => {
    const [isShowHide, setIsShowHide] = useState(true)

    const { errors, icon, label, register, type, appClassName, ...rest } = props
    return <div className="form-floating mb-3">
        <input
            type={!(isShowHide && type === 'password') ? 'text' : type}
            id={rest.id}
            className={`form-control ${errors[rest.name] ? "is-invalid" : ""}`}
            {...register(rest.name)}
            {...rest} />
        <label className="form-label" htmlFor={rest.id}>{rest.placeholder}</label>
    </div>
})

