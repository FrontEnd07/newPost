import React from 'react';
import style from "./Pagination.module.scss";

const generatePaginationItems = ({ total, perPage, currentPage, lastPage, handlerTable }) => {
    const items = [];

    // Function to generate page numbers with ellipsis
    const generatePageNumbers = (start, end) => {
        const result = [];
        for (let i = start; i <= end; i++) {
            result.push(
                <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
                    <a onClick={() => handlerTable({ page: i })} className={`page-link ${style.link}`} role="button" tabIndex="0">
                        {i}
                    </a>
                </li>
            );
        }
        return result;
    };

    // Display range around the current page
    const displayRange = 3; // You can adjust this number based on your design preference

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

    // Display page numbers with ellipsis
    if (lastPage <= displayRange * 2 + 1) {
        // If total pages are within the display range, show all pages
        items.push(...generatePageNumbers(1, lastPage));
    } else {
        // Display ellipsis and adjust the range based on the current page
        let start = Math.max(1, currentPage - displayRange);
        let end = Math.min(lastPage, currentPage + displayRange);

        if (start > 1) {
            // Display ellipsis before the first page
            items.push(<li key="ellipsis-start" className="page-item disabled"><span className="page-link">...</span></li>);
        }

        items.push(...generatePageNumbers(start, end));

        if (end < lastPage) {
            // Display ellipsis after the last page
            items.push(<li key="ellipsis-end" className="page-item disabled"><span className="page-link">...</span></li>);
        }
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

const Pagination = ({ total, perPage, currentPage, lastPage, handlerTable }) => (
    <ul className="ms-md-auto mb-0 pagination">
        {generatePaginationItems({ total, perPage, currentPage, lastPage, handlerTable })}
    </ul>
);

export default Pagination;
