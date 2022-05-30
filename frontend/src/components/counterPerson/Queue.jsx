import React, { useEffect ,useState} from 'react'
import {Card ,Row,Col,Button,Form} from "react-bootstrap";
import CNavbar from "../counterPerson/CNavBar"
import {Link,useNavigate} from 'react-router-dom'
import axios from "axios";


function Queue() {
  const [posts,setposts] =useState([])
  const [posts1,setposts1] =useState([])
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
  return (
    <div>
          <CNavbar/>
<br/><Row><Col md={{  offset: 10 }}><Button variant="danger" >Close Counter</Button></Col></Row>
           {posts.map(posts=>(


          <div > 
            <Form.Group className="mb-3 ">
                    <Col sm={{ span:8, offset: 1}} >
                    <Card border="primary" style={{ width: '109%' }}>
    <div class="card-header"><h1 style={{textAlign: "Left", color: "red"}}>{posts.issue_id}</h1><p style={{textAlign: "Center",fontSize: "25px"}}>{posts.name} : {posts.phone_no}</p></div>
    <Row><Col md={{  offset: 10 }}>{<Button onClick={()=>{navigate('/vis/${posts.id}',{state:{id:posts.id}});}}>
                        
                          
                            
                        Call</Button>}
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
