import React from 'react';

import { useNavigate } from "react-router-dom";

export default function Button({ path, text, onClick, buttonType = '' }) {

    const handleClick = () => {
        if (path !== undefined) {
            navigate(path);
        }
        if (onClick) {
            onClick();
        }
    }

    const navigate = useNavigate()
    return (
        <div className='center-content'>
            <button className="btn btn-primary btn-block" style={{width: '160px'}} type={buttonType} onClick = {() => handleClick()}>{text}</button>
        </div>
    )
}