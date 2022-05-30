import React, { useEffect ,useState} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { Container, Nav } from "react-bootstrap";
import {Link,useNavigate} from 'react-router-dom'
import { BsPersonCircle } from "react-icons/bs";
import axios from "axios";

function CNavbar() {
  
  return (
    <div>
        <Navbar collapseOnSelect expand="lg" bg="light">
        <Container> 
                <Navbar.Collapse className="justify-right">
                 <Nav>
                      <h5 
                            className="text-secondary"
                            style={{marginTop:"10px"}}>    
                              Counter : 
                        </h5>&nbsp;&nbsp;
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <Container> 
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
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

export default CNavbar