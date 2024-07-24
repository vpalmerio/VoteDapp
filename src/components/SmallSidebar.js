import { useNavigate } from "react-router-dom";

import { Nav, NavDropdown } from 'react-bootstrap'

import * as c from './Constants'

export default function Smallsidebar() {
  
    const navigate = useNavigate()
  
    return (
      <Nav className="card bg-transparent transparent-border d-block d-xl-none small-sidebar text-white mt-3" style={{ maxWidth: '160px'}}>
        <div className="card-header">
            <p></p>
        </div>
        <NavDropdown className="card bg-dark text-white text-center" title="Menu">
          <NavDropdown.Item onClick = {() => navigate(c.APP_LINK)}>App</NavDropdown.Item>
          <NavDropdown.Item onClick = {() => navigate(c.EXPLORE_LINK)}>Explore</NavDropdown.Item>
          <NavDropdown.Item onClick = {() => navigate(c.MANAGE_VDA_LINK)}>Manage VDA</NavDropdown.Item>
          <NavDropdown.Item onClick = {() => navigate(c.OWNED_POLLS_LINK)}>Owned Polls</NavDropdown.Item>
          <NavDropdown.Item onClick = {() => navigate(c.PARTICIPATED_POLLS_LINK)}>Polls You Participated In</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    )
  }