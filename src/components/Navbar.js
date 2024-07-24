import Jdenticon from './Jdenticon.js'

import Sidebar from './Sidebar'
import SmallSidebar from './SmallSidebar'

export default function Navbar(props) {
    
  return (
    <div>
      <nav className="navbar navbar-dark fixed-top bg-primary flex-md-nowrap p-0 shadow mx-auto">
        <div className="text-white col-sm-1 col-md-1 mr-0 py-2 px-2">
          <SmallSidebar />
          <small >
          <a
            className="navbar-brand"
            href="/"
            target="_blank"
            rel="noopener noreferrer"
          >VoteDapp</a></small>
        </div>
        
        {props.loadingBlockchain ? <div></div>
        :  <div className="text-white">
            <ul className="navbar-nav px-3">
              <li className="nav-item text-nowrap d-none d-sm-block">
                  <small id="account"> VDA Balance: {props.accountBalance}, {props.account} <span></span>
                  <Jdenticon size="30" value={props.account} />
                  </small>
                
              </li>
            </ul>
          </div> 
        }
      </nav>
      <Sidebar />
    </div>  
  )
}