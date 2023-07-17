import React, { forwardRef } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const CustomToggle = forwardRef(({ children, onClick }, ref) => (
    <a
        type="button"
        className='pe-0 dropdown-toggle nav-link'
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
    </a>
));

const DropDown = ({ ButtonChildren, appClassName, content }) => {
    console.log()
    return <Dropdown className={`${appClassName}`}>
        <Dropdown.Toggle
            as={CustomToggle}>
            {ButtonChildren}
        </Dropdown.Toggle>

        <Dropdown.Menu className='dropdown-menu-animated'>
            {content[0]?.content}
            <Dropdown.Divider />
            {content[1]?.menu.map((el, i) => <React.Fragment key={i}><Dropdown.Item href={el.link}>{el.name}</Dropdown.Item></React.Fragment>)}
            <Dropdown.Divider />
            {content[2]?.menu.map((el, i) => <React.Fragment key={i}><Dropdown.Item onClick={el.function} href={el.link}>{el.name}</Dropdown.Item></React.Fragment>)}

        </Dropdown.Menu>
    </Dropdown >
}

export default DropDown;
