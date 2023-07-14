import React from 'react';

const ShortInfoCard = ({ body, bodyFooter }) => {
    return <div className="h-100 card">
        <div className="d-flex align-items-center justify-content-between card-body">
            <div>
                <h4 className={`fw-normal ${body.appClassName}`}>{body.number}</h4>
                <p className="subtitle text-sm text-muted mb-0">{body.text}</p>
            </div>
            <div className="flex-shrink-0 ms-3">
                {body.icon}
            </div>
        </div>
        <div className={`py-3 card-footer ${bodyFooter.appClassName}`}>
            <div className={`align-items-center row ${body.appClassName}`}>
                <div className="col-10">
                    <p className="mb-0"> {bodyFooter.text}</p>
                </div>
                <div className="text-end col-2">
                    <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="caret-up"
                        className="svg-inline--fa fa-caret-up fa-w-10 "
                        role="img"
                        xlinkHref="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512">
                        <path
                            fill="currentColor"
                            d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z">
                        </path>
                    </svg>
                </div>
            </div>
        </div>
    </div>
}

export default ShortInfoCard;
