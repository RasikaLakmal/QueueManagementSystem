import React, { useEffect,useState } from 'react'
import { Button,Card,Row,Col } from "react-bootstrap";
import CNavbar from "../counterPerson/CNavBar"
import {Link,useNavigate,useLocation} from 'react-router-dom'
import axios from "axios";

function ViewIssue() {

  const params = useLocation();
    const [post,setpost] =useState({})
     const [requestError,setRequestError]= useState()
     const navigate = useNavigate()
    
  
    const counterToken = localStorage.getItem('counterJWT')
  
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
      axios.get(`http://localhost:3001/api/issue/get/${params.state.page}`)
        .then(respose=>{
          console.log(respose)
          setpost(respose.data)
        }).catch(err=>{
          console.log(err)
        })
        },[params.state.page])
        
        return (
            <div><CNavbar/>
              <div class="card" style={{width: "75%",marginTop:"5%",marginLeft:"15%",backgroundColor:"#white"}} >
              
            <div class="card-body">
            <div>
                  <br/>
                  <h1 style={{textAlign: "left"}} > Counter </h1>
                  <br/><br/>
  
                 
               <Row>
                 Counter: Counter_no</Row> 
                 <Row><div class="card" style={{width: "98%",marginTop:"5%",marginLeft:"1%",backgroundColor:"#white"}} >
    <div  style={{width: "90%",marginBottom:"0%",marginLeft:"1%",backgroundColor:"#white"}}>
        <h3 style={{textAlign: "Left", color: "red"}}>25</h3>
        <p style={{textAlign: "Left"}}>{post.name}
    phone_no</p></div>
    <Card.Body>
      <Card.Title style={{textAlign: "Left"}}>Issue</Card.Title>
      <Card.Text style={{textAlign: "Left"}}>
        With supporting text below as a natural lead-in to additional content.tgfffnhb;l
        
        jhbgbfgbm ;. m.vbm .,m.,/mbhh;tjrGtrghthbtrfbhrfbhghynb hyn
      </Card.Text>
     
    </Card.Body>
    
  </div></Row> <Row><Col md={{  offset: 9 }}>{<Link to="/q"><Button variant="primary">Done</Button></Link> }
  {<Link to="/g"><Button variant="danger">Done & Call Next</Button></Link>}</Col></Row>
  
  
            </div>
            </div></div></div>
          )
        }
      export default ViewIssue
  