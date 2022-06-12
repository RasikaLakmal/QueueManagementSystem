import React, { useState } from 'react'
import axios from "axios";
import Form from 'react-bootstrap/Form'
import { Button, Stack, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom'
import UNavBar from "../UNavBar";


function AddIssues(){

  const [email,setEmail] =useState('');
  const[name,setName]=useState('');
  const[phone_no,setPN]=useState('');
  const[ issue,setIssue] =useState('');
    const [error,setError]=useState(null);
   const [loading,setLoading]=useState(false);
   const navigater = useNavigate()

   const userToken= localStorage.getItem('ujsonwebtoken')

console.log("userToken", userToken)

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

   const handleAddIssues = ()=>
   {
    setError(null);
    setLoading(true);

    axios.post("http://localhost:3001/api/issue/add",
   {    
    
     name:name,
     phone_no:phone_no,
    issue:issue,
    headers: {"Authorization" : `Bearer ${userToken}`} 
    }
    ).then(response1=>{
      console.log(response1)
      alert("Your Issue is submitted!")
      navigater('/qn')
      window.location.reload()
    }).catch(error=>{
      setLoading(false)

      if(error.response1.status === 400 || error.response1.status === 401 || error.response1.status === 409)
      {
          setError(error.response1.data);
          setError("Fill all the details");
      }
      else{
          setError("Invalid input");
      }
      });
      
      
  }
  
  
  return (
    <div><UNavBar/>
    <div class="card" style={{width: "75%",marginTop:"5%",marginLeft:"15%",backgroundColor:"#white"}} >

<div class="card-body">
    <div>
          <br/><br/><br/>
          <h1 style={{textAlign: "center"}} >  Add Issue Details </h1>
          <br/><br/>

          <Stack direction="horizontal" gap={5} className="d-flex justify-content-center">
              <Form as={Row}>
                  <br/>{error && <div className="error" style={{marginTop:"-10px",color:"red"}} >{error}</div>}
                  {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Col sm={{ span: 10, offset: 1}}>
                          <Form.Control 
                                  type="email" 
                                  placeholder="Email"
                                  value={email}
                                  onChange={e=>setEmail(e.target.value)} />
                      </Col>
                  </Form.Group> */}

                  <Form.Group className="mb-3" controlId="formBasicName">
                      <Col sm={{ span: 10, offset: 1}}>
                          <Form.Control 
                                  type="text" 
                                  placeholder="Name"
                                  value={name}
                                  onChange={e=>setName(e.target.value)} />
                      </Col>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPhoneNo">
                      <Col sm={{ span: 10, offset: 1}}>
                          <Form.Control 
                                  type="number" 
                                  placeholder="Phone Number"
                                  value={phone_no}
                                  onChange={e=>setPN(e.target.value)} />
                      </Col>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicIssue">
                      <Col sm={{ span: 10, offset: 1}}>
                          <Form.Control 
                                   as="textarea"
                                  placeholder="Issue" 
                                  value={issue}
                                  onChange={e=>setIssue(e.target.value)}/>
                      </Col>
                  </Form.Group>

                  <Form.Group className="mb-3">
                      <Col sm={{ span:5, offset: 7}}>
                          <Button 
                              type="submit"
                              value={loading ?"Loading...": "Sumbit"} 
                              disabled={loading}
                              onClick={handleAddIssues}>
                                  Submit
                          </Button>
                      </Col>
                  </Form.Group>

              </Form>
          </Stack>
    </div>
    </div>
    </div>
    </div>
  )
}
export default AddIssues;