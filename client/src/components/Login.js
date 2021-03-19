import React, { useState } from "react";
import axios from 'axios'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { useParams, useHistory } from 'react-router-dom'


const initialCredentials = {
  username: "",
  password: ""
}




const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const { push } = useHistory()

  

  const [credentials, setCredentials] = useState(initialCredentials)
  
  const changeHandler = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = e => {
    e.preventDefault()
    axios.post('http://localhost:5000/api/login', credentials)
    .then(req => {
      console.log(req)
      localStorage.setItem('token', req.data.payload)
      push('/api/colors')
    })
    .catch(err => console.log(err))
  }
  
  
  return (
    
    <div>
      <h1>Welcome to the Bubble App!</h1>

      <form onSubmit={submitHandler}>
        <input 
          type="text"
          name="username"
          value={credentials.username}
          placeholder="username"
          onChange={changeHandler} 
          />

        <input 
          type="text"
          name="password"
          value={credentials.password}
          placeholder="password"
          onChange={changeHandler} 
          />
        <button>Sign in</button>
      </form>
    </div>
  );
};

export default Login;
