import React from 'react';

import { useNavigate } from "react-router-dom";

export default function Button(props) {
    const navigate = useNavigate()
    return (
        <div className='center-content'>
            <button className="btn btn-primary btn-block" onClick = {() => navigate(props.path)}>{props.name}</button>
        </div>
    )
}