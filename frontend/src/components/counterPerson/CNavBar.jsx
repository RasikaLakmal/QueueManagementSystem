import React, { useEffect ,useState} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { Container, Nav,Card } from "react-bootstrap";
import {Link} from 'react-router-dom'
import { BsPersonCircle } from "react-icons/bs";
import axios from "axios";

function CNavbar() {
    const [posts,setposts] =useState([])
    const [posts1,setposts1] =useState([])
    const [requestError,setRequestError]= useState()
    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(false);
  
    const counterToken = localStorage.getItem('jsonwebtoken')
  
    axios.interceptors.request.use(
      config  => {
          config.headers.authorization =`Bearer ${counterToken}`;
          console.log(config)
          return config;
      },
      error =>{
          return Promise.reject(error)
      }
    )
    useEffect(()=>{
     
      axios.get("http://localhost:3001/api/issue/counterid",
      {
        
  
      }).then(res=>{
        console.log(res)
        setposts(res.data)
        
      }).catch(err=>{
        console.log(err)
        setRequestError(err)
      })
    },[])
    
    const logout = async () => {
      try {
        localStorage.removeItem('jsonwebtoken')
       
      }catch (error) {
        console.log(error);         
 }
}

    return (
    <div>
        <Navbar collapseOnSelect expand="lg" bg="light">
        <Container> 
                <Navbar.Collapse className="justify-right">
                 <Nav>&nbsp;<h2>Counter</h2>
                  <h5 
                            className="text-secondary"
                            style={{marginTop:"50px"}}>    
                             <Card border="primary"> Counter :  {posts.map(post=>post.counter_id)}</Card>
                        </h5> &nbsp;&nbsp;
                   </Nav>
                </Navbar.Collapse>
            </Container>
            <Container> 
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Link 
                            className="btn btn-outline-secondary rounded " 
                            to="/"
                            style={{marginTop:"10px"}} onClick={() => logout()}>   
                               {posts.map(post=>post.name)} <BsPersonCircle/>
                        </Link>&nbsp;&nbsp;
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default CNavbar