import React, { useState, useEffect } from "react";

import { NavbarBrand, Navbar, Nav, NavItem, NavbarToggler, Collapse, Container } from 'reactstrap';

import logo from './assets/images/logos/arguslogo3.jpg';

import "./assets/scss/common.scss";
import "./assets/scss/style.scss";



export default function HeaderPage() {

  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);



  return (
    <div>

    
          {/* header */}
          <div className="header6">
            <Container className="po-relative">
              <Navbar className="navbar-expand-lg h6-nav-bar">
                <NavbarBrand href="/"><img className="logostyle" src={logo} alt="wrapkit" /></NavbarBrand>
                <NavbarToggler ><span className="ti-menu"></span></NavbarToggler>
                <Collapse isOpen={true} navbar className="hover-dropdown font-14 justify-content-end" id="h6-info">
                  <Nav navbar className="ms-auto">
                    <NavItem>
                      {/* <Link className="nav-link" to={"/"}> */}
                      Read More
                      {/* </Link> */}
                    </NavItem>
                
                  </Nav>
                  <div className="act-buttons">
                    {/* <Link to="/#coming" className="btn btn-success-gradiant font-14">Upgrade To Pro</Link> */}
                  </div>
                </Collapse>
              </Navbar>
            </Container>
          </div>
          {/* header */}

      
    </div>
  );


}