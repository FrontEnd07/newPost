import React, { forwardRef, useState } from "react";
import style from "./TextArea.module.scss";
import { MdClear } from "react-icons/md";

export const TextArea = forwardRef((props, ref) => {
    const { errors, register, small, ...rest } = props
    const [textValue, setTextValue] = useState("");

    const handleClear = () => {
        setTextValue("");
    };

    return <div className={`mb-3 ${style.main}`}>
        <textarea
            className={`mb-2 form-control ${errors[rest.name] ? "is-invalid" : ""}`}
            {...rest}
            {...register(rest.name)}
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
        />
        {textValue && (
            <button type="button" className={`btn btn-outline-primary ${style.btn}`} onClick={handleClear}>
                Clear <MdClear size={20} />
            </button>
        )}
        {small && <small className="text-muted form-text">{small}</small>}
    </div>
})