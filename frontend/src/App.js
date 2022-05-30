import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLogin from './components/user/UserLogin'
import UserRegister from './components/user/UserRegister'
import QueueNum from './components/user/QueueNum'
import CpLogin from './components/counterPerson/CpLogin'
import CpRegister from './components/counterPerson/CpRegister'
import Queue from './components/counterPerson/Queue'
import ViewIssue from './components/counterPerson/ViewIssue'
import AddIssues from './components/user/issues/AddIssues'
import Home from './components/Home.jsx'
import Notifications from './components/user/Notifications';


function App() {
 
  return (
    <div className="App">
      
    <Router>
       
        <Routes>
          <Route path="/ureg" element= {<UserRegister/>} />
          <Route path="/ulog" element= {<UserLogin/>} />
          <Route path="/cplog" element= {<CpLogin/>} />
          <Route path="/cpreg" element= {<CpRegister/>} />
          <Route path="/vis" element= {<ViewIssue/>} />
          <Route path="/ais" element= {<AddIssues/>} />
          <Route path="/qn" element= {<QueueNum/>} />
          <Route path="/q" element= {<Queue/>} />
          <Route path="/" element= {<Home/>} />
          <Route path="/nf" element= {<Notifications/>} />

        </Routes>

  </Router>
    </div>
    
  );
}

export default App;
