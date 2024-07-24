import {Nav, NavDropdown} from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import Jdenticon from './Jdenticon.js'

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

const Sidebar = () => {

  const navigate = useNavigate()

  return(
    <div className="">
      
     <Nav className="col-md-12 card d-none d-md-none d-lg-none d-xl-block bg-primary sidebar">
        <div className="sidebar-sticky"></div>
      <Nav.Item>
         <p>&nbsp;</p>
      </Nav.Item>
      <Nav.Item>
          <button className="btn btn-primary btn-block" style={{width: '160px'}} onClick = {() => navigate("/app")}>App</button>
      </Nav.Item>
      <Nav.Item>
          <button className="btn btn-primary btn-block" style={{width: '160px'}} onClick = {() => navigate("/app/explore")}>Explore</button>
      </Nav.Item>
      <Nav.Item>
          <button className="btn btn-primary btn-block" style={{width: '160px'}} onClick = {() => navigate("/app/manage-vda")}>Manage VDA</button>
      </Nav.Item>
      <Nav.Item>
          <button className="btn btn-primary btn-block" style={{width: '160px'}} onClick = {() => navigate("/app/owned")}>Owned Polls</button>
      </Nav.Item>
      <Nav.Item>
          <button className="btn btn-primary btn-block" style={{width: '160px'}} onClick = {() => navigate("/app/participated")}>Polls You Participated In</button>
      </Nav.Item>
      </Nav>
    </div>
  )
}