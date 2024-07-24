import {Nav} from "react-bootstrap";

import Button from './Button'
import * as c from './Constants'

export default function Sidebar() {

    return ( 
        <div className="">
        
            <Nav className="col-md-12 card d-none d-md-none d-lg-none d-xl-block bg-primary sidebar">
                <div className="sidebar-sticky"></div>
            <Nav.Item>
                <p>&nbsp;</p>
            </Nav.Item>
            <Nav.Item>
                <Button path={c.APP_LINK} text='App'></Button>
            </Nav.Item>
            <Nav.Item>
                <Button path={c.EXPLORE_LINK} text='Explore'></Button>
            </Nav.Item>
            <Nav.Item>
                <Button path={c.MANAGE_VDA_LINK} text='Manage VDA'></Button>
            </Nav.Item>
            <Nav.Item>
                <Button path={c.OWNED_POLLS_LINK} text='Owned Polls'></Button>
            </Nav.Item>
            <Nav.Item>
                <Button path={c.PARTICIPATED_POLLS_LINK} text='Polls You Participated In'></Button>
            </Nav.Item>
            </Nav>
        </div>

    )

}