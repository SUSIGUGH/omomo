import React, { useState } from 'react'
import Header from './Header';

function RegisterUser() {
    const [username,setUsername] = useState('');
    const [useremail,setUseremail] = useState('');
    const [userpassword,setUserpassword] = useState('');
    const handleUsername = (e) => {
        setUsername(e.target.value)
    }
    const handleUseremail = (e) => {
        setUseremail(e.target.value)

    }
    const handlePassword = (e) => {
        setUserpassword(e.target.value)
    }
    const handleSubmit = () => {

    }
    return (
        <div>
            <Header />
        <div>
          <h1>User Registration</h1>
        </div>
   
        {/* Calling to the methods */}
   
        <form>
          {/* Labels and inputs for form data */}
          <label className="label">User Name</label>
          <input onChange={handleUsername} className="input"
            value={username} type="text" />
   
          <label className="label">Email</label>
          <input onChange={handleUseremail} className="input"
            value={useremail} type="email" />
   
          <label className="label">Password</label>
          <input onChange={handlePassword} className="input"
            value={userpassword} type="password" />
   
          <button onClick={handleSubmit} className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    ); 
}

export default RegisterUser
