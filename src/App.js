import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from './Login';
import NextPage from './NextPage';

export const UserContext = createContext();

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (username, password) => {
    // Perform login logic here (e.g. send request to server)
    // For simplicity, we'll assume the login is always successful
    setUser({ username });
  };

  return (
    <UserContext.Provider value={{user,setUser}}>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={<Login onLogin={handleLogin}/> }/>
          
          <Route
            path="/"
            element={user ? <Navigate to="/second-page" /> : <Login onLogin={handleLogin} />}
          />
          <Route path="/second-page" element={user ? <NextPage /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
