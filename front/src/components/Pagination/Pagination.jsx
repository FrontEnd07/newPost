import React from 'react';
import style from "./Pagination.module.scss";

const generatePaginationItems = ({ total, perPage, currentPage, lastPage, handlerTable }) => {
    const items = [];
    items.push(
        <li key="first" className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <a onClick={() => handlerTable({ page: 1 })} className={`page-link ${style.link}`} role="button" tabIndex="0">
                <span aria-hidden="true">«</span>
                <span className="visually-hidden">First</span>
            </a>
        </li>
    );
    items.push(
        <li key="previous" className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <a onClick={() => handlerTable({ page: currentPage - 1 })} className={`${style.link} page-link`} role="button" tabIndex="0">
                <span aria-hidden="true">‹</span>
                <span className="visually-hidden">Previous</span>
            </a>
        </li>
    );
    for (let i = 1; i <= lastPage; i++) {
        items.push(
            <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
                <a onClick={() => handlerTable({ page: i })} className={`page-link ${style.link}`} role="button" tabIndex="0">
                    {i}
                </a>
            </li>
        );
    }
    items.push(
        <li key="next" className={`page-item ${currentPage === lastPage ? 'disabled' : ''}`}>
            <a onClick={() => handlerTable({ page: currentPage + 1 })} className={`${style.link} page-link`} role="button" tabIndex="0">
                <span aria-hidden="true">›</span>
                <span className="visually-hidden">Next</span>
            </a>
        </li>
    );
    items.push(
        <li key="last" className={`page-item ${currentPage === lastPage ? 'disabled' : ''}`}>
            <a onClick={() => handlerTable({ page: lastPage })} className={`page-link ${style.link}`} role="button" tabIndex="0">
                <span aria-hidden="true">»</span>
                <span className="visually-hidden">Last</span>
            </a>
        </li>
    );
    return items;
};

const Pagination = ({ total, perPage, currentPage, lastPage, handlerTable }) => <ul className="ms-md-auto mb-0 pagination">
    {generatePaginationItems({ total, perPage, currentPage, lastPage, handlerTable })}
</ul>

export default Pagination;