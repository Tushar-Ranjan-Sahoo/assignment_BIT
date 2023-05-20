import React, { useState } from "react";
import './App.css';
const Login = 
    ({ onLogin }) => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
      
        const handleSubmit = (event) => {
          event.preventDefault();
          onLogin(username, password);
        };
      
        return (
          <form className="login" onSubmit={handleSubmit}>
           
             
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            
            
            
              
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            
            
            <input className="button1" type="submit" value="Submit" />
          </form>
        );
      };

export default Login;
