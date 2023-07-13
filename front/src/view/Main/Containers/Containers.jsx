import React from 'react';
import style from "./Containers.module.scss";
import { PageHeader } from "../../../components"

const Containers = ({ children, header }) => <div className={`mb-5 row ${style.main ? style.main : ""}`}>
    <PageHeader title={header} />
    {children}
</div>

export default Containers;
