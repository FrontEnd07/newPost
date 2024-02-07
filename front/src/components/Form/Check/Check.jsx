import React, { forwardRef } from 'react';
import styles from "./Check.module.scss";

export const Check = forwardRef((props, ref) => {

    const { errors, icon, label, register, type, appClassName, ...rest } = props

    return <div className={`mb-3 form-check ${styles.main}`}>
        <input
            role="button"
            type={type}
            id={rest.id}
            className={`form-check-input ${errors[rest.name] ? "is-invalid" : ""}`}
            {...register(rest.name)} />
        <label role="button" htmlFor={rest.id} className="form-check-label">{rest.placeholder}</label>
    </div>
})
