import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";




function Home() {
    return (<div className="App">
    <div class="card" style={{width: "75%",marginTop:"13%",marginLeft:"15%",backgroundColor:"#white"}} >

<div class="card-body">
        
          <h1>Home</h1>
          <br/><br/> <br/><br/> <br/><br/> <br/><br/>
          <Link to="/ulog"> <Button variant="primary">User Login</Button></Link>
          <Link to="/cplog"> <Button variant="warning">Counter Login</Button></Link>
    
          <br/><br/> <br/><br/> <br/><br/>
      </div></div>
    </div>)
}
export default Home;