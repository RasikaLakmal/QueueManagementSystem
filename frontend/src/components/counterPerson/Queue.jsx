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
  const sendMessage = () => {
    socket.emit('send_Message',{ message : 'Be Ready,It is your turn', issue_id: posts.map(post=>post.issue_id),
    counter_no: posts.map(post=>post.counter_no)});
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
                      setError("some thing is wrong");
                    });}}  /></Col></Row>
           {posts.map(posts=>(


          <div > 
            <Form.Group className="mb-3 ">
                    <Col sm={{ span:8, offset: 1}} >
                    <Card border="primary" style={{ width: '109%' }}>
    <div class="card-header"><h1 style={{textAlign: "Left", color: "red"}}>{posts.issue_id}</h1><p style={{textAlign: "Center",fontSize: "25px"}}>{posts.name} : {posts.phone_no}</p></div>
    <Row><Col md={{  offset: 10 }}>{<a onClick={()=>{navigate('/vis/${posts.id}',{state:{id:posts.id}});}}   >
                        
    <input type="button" 
                            value={ "Call"} 
                            onClick={sendMessage}
                            class="btn btn-secondary"/>
                            
                        </a>}
   </Col></Row>
  </Card>
  <br />
  
                    </Col>
                </Form.Group>
            </div>

          ))}
    </div>
  )
      }
    export default Queue;
