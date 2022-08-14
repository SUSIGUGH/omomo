
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router';
import Home from './Home';
import Users from './Users,js'


const Login = () => {
    const users = Users;
    const navigate = useNavigate();
    const [username,setUsername] = useState('')
    const [userpassword,setUserpassword] = useState('')
    function onChangeUsername(e) {
        setUsername(e.target.value)
    }
    function onChangePassword(e) {
        setUserpassword(e.target.value)
    }
    function verifyUser(e) {
        e.preventDefault()
        localStorage.setItem('username', username);
        localStorage.setItem('userpassword', userpassword);
        localStorage.setItem('status', 'success');
        navigate("/")
        
    }

    
    
    return (
        
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={verifyUser}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="form-group mt-3">
                <label>User Name :{username}</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Enter User Name"
                  required
                  value={username}
                  onChange={onChangeUsername}
                />
              </div>
              <div className="form-group mt-3">
                <label>Password: {userpassword}</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  required
                  value={userpassword}
                  onChange={onChangePassword}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      )
    }

export default Login;
