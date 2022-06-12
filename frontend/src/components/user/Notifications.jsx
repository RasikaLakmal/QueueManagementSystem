import React,{useState,useEffect} from 'react'
import { Stack, Card ,Row,Col,Button} from "react-bootstrap";
import UNavBar from "../user/UNavBar";
import {Link} from 'react-router-dom'
import io from 'socket.io-client' 
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
const socket = io.connect("http://localhost:3001");


function Notifications() {
  const [posts,setposts] =useState([])
const [requestError,setRequestError]= useState()
const [error,setError]=useState(null);
const [notifications, setNotifications] = useState([]);
const [notifications2, setNotifications2] = useState([]);


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
  
  axios.get("http://localhost:3001/api/cp/queuenum",
  {

  }).then(resqn=>{
    console.log(resqn)
    setposts(resqn.data)

  }).catch(err=>{
    console.log(err)
    setRequestError(err)
  })
},[])
useEffect(() => {
  socket.on('receive_queueNext',(data) =>{
    console.log(data)
    if ((data.issue_Id == posts.map(post=>post.issue_id))&&(data.counter_No == posts.map(post=>post.counterNoId))) {
      setNotifications2([...notifications2,data]);
      localStorage.setItem('notifications2',JSON.stringify([data]))
    }
  })
})
useEffect(() => {
  socket.on('receive_queueNow',(data) =>{
    console.log(data)
    if ((data.issue_Id == posts.map(post=>post.issue_id))&&(data.counter_No == posts.map(post=>post.counterNoId))) {
      setNotifications([...notifications,data]);
      localStorage.setItem('notifications',JSON.stringify([data]))
      
        
    }
  })
})


//const notify =  JSON.parse(localStorage.getItem('notifications'))
const notify2 =  JSON.parse(localStorage.getItem('notifications2'))
    
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
               {notifications.map(post=>( <div><Card border="primary" style={{ width: '99%' }}>
    <div class="card-header"><h3 style={{textAlign: "Left", color: "gray"}}>New Notification</h3><p style={{textAlign: "Center",fontSize: "25px"}}><b>your issue id:{post.issue_Id}, and counter no is:{post.counter_No}</b></p> <Row><Col md={{  offset: 10 }}>{<Link to='/qn'><Button variant="secondary">View</Button></Link> }</Col></Row></div>
    </Card>
  <br />
  
  <Card border="primary" style={{ width: '99%' }}>
    <div class="card-header"><h3 style={{textAlign: "Left", color: "gray"}}>New Notification</h3><p style={{textAlign: "Center",fontSize: "25px"}}><b>{post.message}</b></p></div>
     </Card></div>))} 
  <br /> {notifications2.map(post=>(<div>
  <Card border="primary" style={{ width: '99%' }}>
    <div class="card-header"><h3 style={{textAlign: "Left", color: "gray"}}>New Notification</h3><p style={{textAlign: "Center",fontSize: "25px"}}><b>your issue id:{post.issue_Id}, and counter no is:{post.counter_No}</b></p> <Row><Col md={{  offset: 10 }}>{<Link to='/qn'><Button variant="secondary">View</Button></Link> }</Col></Row></div>
    </Card>
  <br />
  <Card border="primary" style={{ width: '99%' }}>
    <div class="card-header"><h3 style={{textAlign: "Left", color: "gray"}}>New Notification</h3><p style={{textAlign: "Center",fontSize: "25px"}}><b>{post.message}</b></p></div>
    </Card> </div>))} 
  <br /> 
</> <Row><Col md={{  offset: 10 }}>{<Link to="/qn"> <Button variant="warning">Back</Button></Link>}</Col></Row>
                  </Stack>

          </div>
          </div></div></div>
        )
      }
    export default Notifications;
