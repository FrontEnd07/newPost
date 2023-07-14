import React, { forwardRef } from 'react';
import style from "./Radio.module.scss";

export const Radio = forwardRef((props, ref) => {

    const { errors, icon, label, register, options, appClassName, ...rest } = props

    return <>
        {options.map((el, i) => <div className="form-check mb-3" key={i}>
            <input
                type="radio"
                id={i}
                value={el.value}
                defaultChecked={el.checked && el.checked}
                className={`form-check-input ${errors[rest.name] ? "is-invalid" : ""}`}
                {...register(rest.name)} />
            <label title={el.label} htmlFor={i} className="form-check-label">{el.label}</label>
        </div>)}
    </>
})

