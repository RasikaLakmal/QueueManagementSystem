import React,{useState,useEffect} from 'react'
import { Stack, Card ,Row,Col,Button} from "react-bootstrap";
import UNavBar from "../user/UNavBar";
import {Link} from 'react-router-dom'
import io from 'socket.io-client' 
import axios from "axios";
const socket = io.connect("http://localhost:3001");


function Notifications() {
  const userToken= localStorage.getItem('ujsonwebtoken')

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

  const [messageReceive, setMessageReceive] = useState()

  useEffect(() => {
    socket.on('receive_message',(data) =>{
      setMessageReceive(data.message);
    })
  })
    
        return (
            <div><UNavBar/>
          <div class="card" style={{width: "75%",marginTop:"5%",marginLeft:"15%",backgroundColor:"#white"}} >

          <div class="card-body">
          <div>
                
                <h1 style={{textAlign: "Left"}} > Notifications </h1>
                <br/><br/>

                <Stack direction="vertical" className="d-flex justify-content-center">
                <Row> 
               </Row> 
               <Row></Row> <>
               <Card border="primary" style={{ width: '99%' }}>
    <div class="card-header"><h3 style={{textAlign: "Left", color: "gray"}}>New Notification</h3><p style={{textAlign: "Center"}}>your issue id:, and counter no is:</p> <Row><Col md={{  offset: 10 }}>{<Link to='/qn'><Button variant="secondary">View</Button></Link> }</Col></Row></div>
  </Card>
  <br />
  <Card border="primary" style={{ width: '99%' }}>
    <div class="card-header"><h3 style={{textAlign: "Left", color: "gray"}}>New Notification</h3><p style={{textAlign: "Center"}}>you are the next!</p></div>
  </Card>
  <br />          <Card border="primary" style={{ width: '99%' }}>
    <div class="card-header"><h3 style={{textAlign: "Left", color: "gray"}}>New Notification</h3><p style={{textAlign: "Center"}}>It's your turn,now join with the customer care
    {messageReceive}</p></div>
  </Card>
</>
                </Stack>
               
          </div>
          </div></div></div>
        )
      }
    export default Notifications;
