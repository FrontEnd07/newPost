import React from 'react';
import style from "./Dashboard.module.scss";
import Containers from '../Containers';
import { GiCardboardBox } from "react-icons/gi"
import { BsBoxSeam } from "react-icons/bs"
import { BsTruck } from "react-icons/bs"
import { RiUserReceived2Line } from "react-icons/ri"
import { ShortInfoCard } from '../../../components';
const Dashboard = () => {

    const data = [
        {
            body: {
                appClassName: "text-red",
                text: "Склад",
                number: "120",
                icon: <GiCardboardBox className='text-red' size={32} />
            },
            bodyFooter: {
                text: "Получен на склад",
                appClassName: "bg-red-light"
            }
        },
        {
            body: {
                appClassName: "text-blue",
                text: "Урумчи",
                number: "120",
                icon: <BsBoxSeam className='text-blue' size={32} />
            },
            bodyFooter: {
                text: "Доставлен в урумчи",
                appClassName: "bg-blue-light"
            }
        },
        {
            body: {
                appClassName: "text-primary",
                text: "Таджикистан",
                number: "120",
                icon: <BsTruck className='text-primary' size={32} />
            },
            bodyFooter: {
                text: "Товар в Таджикистане",
                appClassName: "bg-primary-light"
            }
        },
        {
            body: {
                appClassName: "text-green",
                number: "120",
                text: "Получатель",
                icon: <RiUserReceived2Line className='text-green' size={32} />
            },
            bodyFooter: {
                text: "Получен",
                appClassName: "bg-green-light"
            }
        }
    ]
    return <Containers header={"Главное"}>
        <section className="mb-3 mb-lg-5">
            <div className='mb-3 row'>{data.map((el, i) => <div key={i} className='mb-4 col-lg-3 col-sm-6'>
                <ShortInfoCard body={el.body} bodyFooter={el.bodyFooter} />
            </div>)}
            </div>
        </section>
    </Containers>
}

export default Dashboard;
