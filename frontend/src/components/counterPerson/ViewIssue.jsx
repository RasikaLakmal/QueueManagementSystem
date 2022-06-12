import React, { useState, useEffect } from 'react'
import axios from "axios";
import InputGroup from 'react-bootstrap/InputGroup'
import { Col, Row } from "react-bootstrap";
import {useNavigate, useLocation } from 'react-router-dom'
import CNavBar from '../counterPerson/CNavBar';
import  io  from "socket.io-client";

const socket =io.connect("http://localhost:3001");

function ViewIssue() {
  
  const location = useLocation();
  const [posts,setposts] =useState([])
  const [putOne,setPutOne] =useState([])
  const [error,setError]=useState(null);
  const [loading,setLoading]=useState(false);
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
    axios.get(`http://localhost:3001/api/issue/get/${location.state.id}`)
      .then(respose=>{
        console.log(respose)
        setposts(respose.data)
      }).catch(err=>{
        console.log(err)
      })
      },[])

      const sendQueue = (issue_id,counter_no) => {
        socket.emit('send_queueNow',{ message: 'Be Ready,It is your turn',
        issue_Id:(issue_id)+1,counter_No:counter_no });
      };

  return (
    <div>
        <CNavBar/>
        {posts.map(post=>(<>
        <div 
            className="block-example border border-dark "
            style={{marginTop:"6%", marginLeft:'10%', marginRight:'10%' }}>
            <div >
              <InputGroup >
                <InputGroup.Text  
                    className='text-danger rounded-circle secondary bg-body'
                    style={{marginTop:"1%", marginLeft:'1%', fontSize:'30px'}}>
                       <h1 style={{textAlign: "center", color: "red",fontSize: "50px"}}><b>{post.issue_id}</b></h1>
                </InputGroup.Text>
                <InputGroup.Text  
                    className=" text-body border-0 bg-body"
                    style={{marginTop:"1%", marginLeft:'1%', fontSize:'30px'}}>
                      <p style={{textAlign: "left",fontSize: "25px"}}><b>{post.name}</b> </p>
                </InputGroup.Text>
              </InputGroup>
              <InputGroup>
                <InputGroup.Text  
                    className=" border-0 text-primary bg-body"
                    style={{ marginLeft:'5%', fontSize:'15px'}}>
                        {post.tpno}
                </InputGroup.Text>
                <InputGroup >
                <InputGroup.Text  
                    className='text-body bg-body border-0'
                    style={{marginTop:"1%", marginLeft:'3%', fontSize:'30px'}}>
                        <p style={{textAlign: "left",fontSize: "25px"}}><b>Issue </b></p>
                </InputGroup.Text>
              </InputGroup>
              <InputGroup>
                <InputGroup.Text  
                    className=" text-body border-0 bg-body"
                    style={{marginTop:"0%", marginLeft:'4%', fontSize:'20px'}}>
                        {post.issue}
                </InputGroup.Text>
              </InputGroup>
              </InputGroup>
            </div>

            &nbsp;&nbsp;&nbsp;&nbsp;
        </div>
        <div><Row><Col md={{  offset: 8 }}>
            <input type="button" 
                value={"Done"} 
                className="border-0 text-white"
                style={{marginTop:"1%", marginLeft:'1%', backgroundColor:'#0d47a1', }}
                onClick={()=>{
                  axios.put(`http://localhost:3001/api/cp/doneissue/${post.id}`)
                    .then(response=>{
                      navigate('/q')
                      localStorage.removeItem('notifications')
                      window.location.reload()
                    }).catch(error=>{
                      setError("some thing is wrong");
                    });}}  />

<input type="button"
                value={"Done and Next"} 
                disabled={loading}
                className="border-0 text-white"
                style={{marginTop:"1%", marginLeft:'1%', backgroundColor:'#d50000', }}
                onClick={()=>{
                  axios.get(`http://localhost:3001/api/cp/doneandnxt/${post.id}`)
                  .then(response=>{
                    navigate('/vis/${(post.id)+1}',{state:{id:(post.id)+1}})
                    localStorage.removeItem('notifications')
                    localStorage.removeItem('notifications2')
                      sendQueue(post.issue_id,post.counter_no)
                      window.location.reload()
                  }).catch(error=>{
                    setError("some thing is wrong");
                  })}}  />
            </Col></Row></div>
        </>))}
    </div>
  )
}
      export default ViewIssue
  