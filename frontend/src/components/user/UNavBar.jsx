import React, {useEffect,useState}from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { Container, Nav } from "react-bootstrap";
import {Link} from 'react-router-dom'
import { MdNotifications } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import axios from "axios";

function UNavbar() {
    const [posts,setposts] =useState([])
    const [requestError,setRequestError]= useState()
    const [error,setError]=useState(null);
    
    
  
    const userToken = localStorage.getItem('ujsonwebtoken')
  
    axios.interceptors.request.use(
      config  => {
          config.headers.authorization =`Bearer ${userToken}`;
          console.log(config)
          return config;
      },
      error =>{
          return Promise.reject(error)
      }
    )
    
  
    useEffect(()=>{
      axios.get("http://localhost:3001/api/issue/username",
      {
  
      }).then(res=>{
        console.log(res)
        setposts(res.data)
    
      }).catch(err=>{
        console.log(err)
        setRequestError(err)
      })
    },[])
  
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
                               {posts.map(post=>post.name)} <BsPersonCircle/>
                        </Link>&nbsp;&nbsp;
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default UNavbar