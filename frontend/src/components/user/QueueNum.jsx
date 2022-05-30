import React, { useNavigate,useState,useEffect } from 'react'
import { Stack, Card,Button,Col } from "react-bootstrap";
import UNavBar from "../user/UNavBar";
import axios from "axios";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");




function QueueNum() {
  socket.emit()
    const [posts,setposts] =useState([])
  const [requestError,setRequestError]= useState()

  const userToken = localStorage.getItem('jsonwebtoken')

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

    }).then(res=>{
      console.log(res)
      setposts(res.data)
  
    }).catch(err=>{
      console.log(err)
      setRequestError(err)
    })
  },[])
    
        return (     <div>
          < UNavBar/><br/>
          {posts.map(post=>(
          <><h2 style={{ textAlign: "left", marginLeft: "10%" }}> Ongoing Queue</h2><div class="card" style={{ marginTop: "3%", width: "30%", marginLeft: "35%" }}>
              <div class="card-body">
                <h1 class="card-title">Current Number</h1>
                <h1 style={{ color: "red", fontSize: "150px" }}>{post.ongoing}</h1>
              </div>
            </div><h2 style={{ marginTop: "10px", textAlign: "center" }}> Next: {post.ongoing + 1} </h2><h2 style={{ marginTop: "10px", textAlign: "center" }}> Your No: {post.issue_id} </h2><Col sm={{ span: 5, offset: 8 }}>
                <Button
                  type="submit"
                  variant="danger"
                  className="justify-content-end"
                  value="Send Issue">
                  Close
                </Button>
              </Col></>))}
    
        </div>
        
        )
      }
export default QueueNum;
