import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { Container, Nav } from "react-bootstrap";
import {Link} from 'react-router-dom'
import { MdNotifications } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";

function UNavbar() {
  return (
    <div>
        <Navbar collapseOnSelect expand="lg" bg="light">
            <Container> 
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Link 
                            className=" btn-outline-secondary btn-lg" 
                            to="/nf"
                            style={{marginTop:"10px"}}> 
                               <MdNotifications/> 
                        </Link>&nbsp;&nbsp;
                        <Link 
                            className="btn btn-outline-secondary rounded " 
                            to="/"
                            style={{marginTop:"10px"}}>    
                               Logout <BsPersonCircle/>
                        </Link>&nbsp;&nbsp;
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default UNavbar