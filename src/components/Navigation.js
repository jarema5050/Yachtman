import React from 'react';
import {Nav} from 'react-bootstrap';
 
const Navigation = () => {
    return (
    <div className="navbar-margin">
      <Nav defaultActiveKey="/home" as="ul">
        <Nav.Item as="li">
          <Nav.Link href="/">Account</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href="/ships">Ships</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href="/cruises">Cruises</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
    );
}
 
export default Navigation;