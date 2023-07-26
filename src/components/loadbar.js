import React from 'react';

import loader from './loader.png'

export default function Loadbar(props) {

    return (
      <div>
        <nav className="card fixed-bottom mr-auto ml-auto bg-dark p-0 shadow" style={{ maxWidth: '800px', overflow: 'auto'}}>
          <div className="text-white col-sm-1 col-md-1 mr-0">
            
            <small className="navbar-brand">
            <img 
              src={loader} 
              alt="Ballot Box" 
              width="64"
              height="64"
            />

              {" " + props.loadingDescription}
            </small>
          </div>
        </nav>
      </div>  

    )
  
}