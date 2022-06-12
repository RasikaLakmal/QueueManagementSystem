import React, { useEffect ,useState} from 'react'
import {Card ,Row,Col,Form} from "react-bootstrap";
import CNavbar from "../counterPerson/CNavBar"
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import  io  from "socket.io-client";

const socket =io.connect("http://localhost:3001");


function Queue() {
  const [posts,setposts] =useState([])
  const [posts1,setposts1] =useState([])
  const [error,setError]=useState(null);
  const [requestError,setRequestError]= useState()
  const navigate = useNavigate()

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
    
    axios.get("http://localhost:3001/api/issue/all",
    {

    }).then(res=>{
      console.log(res)
      setposts(res.data)

    }).catch(err=>{
      console.log(err)
      setRequestError(err)
    })
  },[])
  

  const sendQueue = (issue_id,counter_no) => {
    socket.emit('send_queueNow',{ message: 'Be Ready,It is your turn',
    issue_Id:issue_id,counter_No:counter_no });
  };

  

  return (
    
    <div>
          <CNavbar/>
<br/><Row><Col md={{  offset: 10 }}><input type="button" 
                value={"Close"} 
                className="border-0 text-white"
                style={{marginTop:"1%", marginLeft:'1%', backgroundColor:'#d50000', }}
                onClick={()=>{
                  axios.put(`http://localhost:3001/api/cp/counter/close`)
                    .then(response=>{
                      navigate('/')
                    }).catch(error=>{
                      setError("something is wrong");
                    });}}  /></Col></Row><br/><br/><br/>
           {posts.map(posts=>(

<div class="card" style={{width: "75%",marginTop:"0%",marginLeft:"10%",backgroundColor:"#white"}} >

<div class="card-body">
          <div > 
             <Card border="primary" ><Row sm={{ span:8, offset: 10}}>
          <Col><h1 style={{textAlign: "center", color: "red",fontSize: "70px"}}><b>{posts.issue_id}</b></h1></Col>
          <Col><p style={{textAlign: "left",fontSize: "29px"}}><b>{posts.name}</b> </p>
          <p style={{textAlign: "left",fontSize: "19px",color: "blue"}}> <b>{posts.phone_no}</b></p></Col>
          <Col>{<a onClick={()=>{navigate('/vis/${posts.id}',{state:{id:posts.id}});}}   >
                        
                        <input type="button" 
                                                value={ "Call"} 
                                                onClick={() =>sendQueue(posts.issue_id,posts.counter_no)}
                                                class="btn btn-secondary"/>
                                                
                                            </a>}</Col>
        </Row></Card><br/></div></div></div>

          ))}
    </div>
  )
      }
    export default Queue;
