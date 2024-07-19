import React from 'react';

import { useNavigate } from "react-router-dom";

export default function Button(props) {

    const handleClick = () => {
        if (props.path !== undefined) {
            navigate(props.path);
        }
        if (props.onClick) {
            props.onClick();
        }
    }

    const navigate = useNavigate()
    return (
        <div className='center-content'>
            <button className="btn btn-primary btn-block" onClick = {() => handleClick()}>{props.text}</button>
        </div>
    )
}