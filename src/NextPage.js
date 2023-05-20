import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './App.css';
import { useContext } from 'react';
import { UserContext } from './App';
import { useNavigate } from 'react-router-dom';


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
const options = {
  responsive: true, // Enable responsiveness
  maintainAspectRatio: false, // Disable aspect ratio preservation
  // You can further customize the options here
  
    name: 'Enable both scrolling & backdrop',
    scroll: true,
    backdrop: true,
  
};

const NextPage = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    user.setUser(null);
    

  }
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        const newdata = data.map((e,idx) => {
          if (idx%getRandomInt(4)===0){
            return{ ...e,gender: 'male',
                    ...e,employment:'fulltime'
          };
          }
          return{ ...e,gender: 'female',
                  ...e,employment:'parttime',
                  ...e,employment:'dailywage'
          };
          
        })
        setUsers(newdata);
      }  );
  },[] );

  const genderData = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        data: [users.filter(user => user.gender === 'male').length+2, users.filter(user => user.gender === 'female').length+3],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB']
      }
    ]
  };

  const employmentData = {
    labels: ['FULL TIME', 'PART TIME','DAILY WAGE'],
    datasets: [
      {
        data: [users.filter(user => user.employment === 'fulltime').length, 
        users.filter(user => user.employment === 'parttime').length+4,
        users.filter(user => user.employment === 'dailywage').length+1],
        backgroundColor: ['#FFCE56', '#4BC0C0','#fdg123'],
        hoverBackgroundColor: ['#FFCE56', '#4BC0C0','#fdg123']
      }
    ]
  };
  return (
    <div>
      <Navbar  bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">LOGO</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <Navbar.Text><span >
          HI! {user.user.username}😊
        </span>

        
        
            
          </Navbar.Text>
        <Button onClick= {handleLogout}  as="a" variant="primary">
          
                  LOGOUT
        </Button>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className="cont">
   
  
  <div className="side-bar">
    <span>DASHBOARD</span>
  </div>
  <h1 className="main-heading">Key Performance Indicator</h1>
  <div className="chart-container">
    <h2>Gender Chat</h2>
    <div className="chart">
      <Pie data={genderData} style={{ width: '100%', height: '100%' }} />
    </div>
    <div className="chart-info">
      <h3>Total Users: {users.length}</h3>
      <p>Male: {users.filter(user => user.gender === 'male').length}</p>
      <p>Female: {users.filter(user => user.gender === 'female').length}</p>
    </div>
  </div>
  <div className="chart-container">
    <h2>Employment Type</h2>
    <div className="chart">
      <Pie data={employmentData} style={{ width: '100%', height: '100%' }} />
    </div>
    <div className="chart-info">
      <h3>Total Users: {users.filter(user => user.employment === 'fulltime').length + users.filter(user => user.employment === 'parttime').length + 4 + users.filter(user => user.employment === 'dailywage').length + 1}</h3>
      <p>Full Time: {users.filter(user => user.employment === 'fulltime').length}</p>
      <p>Part Time: {users.filter(user => user.employment === 'parttime').length + 4}</p>
      <p>Daily Wage: {users.filter(user => user.employment === 'dailywage').length + 1}</p>
    </div>
  </div>
</div>
</div>
  );
};

export default NextPage;