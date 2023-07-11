import React, { forwardRef } from 'react';

export const Check = forwardRef((props, ref) => {

    const { errors, icon, label, register, type, appClassName, ...rest } = props

    return <div className="mb-3 form-check">
        <input
            type={type}
            id={rest.id}
            className={`form-check-input ${errors[rest.name] ? "is-invalid" : ""}`}
            {...register(rest.name)} />
        <label htmlFor={rest.id} className="form-check-label">{rest.placeholder}</label>
    </div>
})
