import React, { useState } from 'react'
import {
  Link,
} from "react-router-dom";

import MenuImg from "../images/menu.svg";
import CloseImg from "../images/close.svg";
import TodosImg from "../images/checklist.svg";
import AboutImg from "../images/help.svg";
import GithubImg from "../images/github.svg";
import LoginImg from "../images/login.svg";
import RegisterImg from "../images/add.svg";

const Sidebars = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className={"sidebar " + (toggle ? "active" : "closed")}>
      <div className="sidebar-container">
        <div className="sidebar-btn-container">
          <button 
            className="sidebar-btn" 
            onClick={() => setToggle(!toggle)} 
          >
            <img alt="" src={toggle ? CloseImg : MenuImg} />
          </button>
        </div>
        <div className="nav-items">
          {/* <div className="brand nav-item"><Link to="/">Todox</Link></div> */}
          <div className="norm login-nav-item nav-item">
            
            <a href="https://github.com"><img className="nav-item-img" alt="" src={LoginImg} /><span>Login</span></a>
          </div>
          <div className="norm register-nav-item nav-item">
            
            <a href="https://github.com"><img className="nav-item-img" alt="" src={RegisterImg} /><span>Register</span></a>
          </div>
          <div className="norm nav-item">
            
            <Link to="/"><img className="nav-item-img" alt="" src={TodosImg} /><span>Todos</span></Link>
          </div>
          <div className="norm nav-item">
            
            <Link to="/about"><img className="nav-item-img" alt="" src={AboutImg} /><span>About</span></Link>
          </div>
          <div className="norm nav-item">
            
            <a href="https://github.com"><img className="nav-item-img" alt="" src={GithubImg} /><span>Github</span></a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebars
