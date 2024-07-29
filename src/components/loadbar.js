import React from 'react';

import loader from '../media/loader.png'

/*
 * This component provides a loading bar at the bottom of the page, with a description of what is happening. 
 * This component is mainly used when the app is loading the blockchain state and when the user is waiting 
 * for a transaction to be mined.
 */ 

export default function LoadBar(props) {

    return (
      <div className='row fixed-bottom justify-content-center'>
        <div className="card mr-auto ml-auto bg-dark p-0 py-2 shadow" style={{ maxWidth: '800px', overflow: 'auto'}}>
          <div className="text-white col-sm-1 col-md-1 mr-0 px-3">
            
            <small className="navbar-brand">
            <img 
              src={loader} 
              alt="Loading Gif" 
              width="64"
              height="64"
              style={{ marginRight: '15px' }}
            />
            {' '}
            {props.loadingDescription}
            </small>
          </div>
        </div>
      </div>  

    )
  
}