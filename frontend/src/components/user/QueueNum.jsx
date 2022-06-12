import React, { useState,useEffect } from 'react'
import { Col } from "react-bootstrap";
import UNavBar from "../user/UNavBar";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import  io  from "socket.io-client";
import {ToastContainer,toast,Zoom} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const socket =io.connect("http://localhost:3001");




function QueueNum() {

    const [posts,setposts] =useState([])
    const [posts2,setposts2] =useState([])
    const [posts3,setposts3] =useState([])
  const [requestError,setRequestError]= useState()
  const [error,setError]=useState(null);
  const navigater = useNavigate()
  const [recCounter, setRecCounter] = useState()

 

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

 
//   useEffect(() => {
//     socket.on('receive_message',(data) =>{
//       console.log(data)
      
      
     
//     })
// })

// useEffect(() => {
//   socket.on('resdat',(data) =>{
//     setposts3(data)
//     console.log(data)
    
//     alert(data.message)
//   })
// })
// socket.on('receive_queuenumsd',(data) =>{
//   if (data.counter_no == posts.map(post=>post.counter_no)) {
//     setRecCounter(data.ongoing_No)
//   }
// })

useEffect(() => {
  socket.on('receive_queueNow',(data) =>{
    console.log(data)
    setposts3(data)
    if ((data.issue_Id == posts.map(post=>post.issue_id))&&(data.counter_No == posts.map(post=>post.counterNoId))) {
     
      toast.info(data.message)
      window.setTimeout(function() {  window.location.reload() }, 2000);
     
    }
  })
})

useEffect(() => {
  socket.on('receive_queueNext',(data) =>{
    console.log(data)
    
    if ((data.issue_Id == posts.map(post=>post.issue_id))&&(data.counter_No == posts.map(post=>post.counterNoId))) {
      
      toast.info(data.message)
      window.setTimeout(function() {  window.location.reload() }, 2000);

      
    }
  })
})
        return (     <div>
          < UNavBar/><br/>
          {posts.map(post=>(
          <><h2 style={{ textAlign: "left", marginLeft: "10%" }}> Ongoing Queue</h2><div class="card" style={{ marginTop: "3%", width: "30%", marginLeft: "35%" }}>
              <div class="card-body"> <ToastContainer />
                <h1 class="card-title">Current Number</h1>
                <h1 style={{ color: "red", fontSize: "150px" }}>{post.ongoing}</h1>
              </div>
            </div><h2 style={{ marginTop: "10px", textAlign: "center" }}> Next: {post.ongoing + 1} </h2><h2 style={{ marginTop: "10px", textAlign: "center" }}> Your No: {post.issue_id} </h2><Col sm={{ span: 5, offset: 8 }}>
           <div> <input type="button" 
                value={"Cancel"} 
                className="border-0 text-white"
                style={{marginTop:"1%", marginLeft:'1%', backgroundColor:'#0d47a1', }}
                onClick={()=>{
                  axios.put(`http://localhost:3001/api/issue/cancel/${post.issue_id})`)
                    .then(response=>{
                      navigater('/ais')
                    }).catch(error=>{
                      setError("some thing is wrong");
                    });}}  /></div>
              </Col></>))}
    
        </div>
        
        )
      }
export default QueueNum;
