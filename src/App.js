import logo from './logo.svg';
import './App.css';
import CourseList from './components/CourseList';
import Signup from './components/Signup';
import { useState, useEffect } from 'react';
import { Routes, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Profile from './components/Profile';
import MyCourse from './components/MyCourse';

function App() {
  const [isTokenValid, setisTokenValid] = useState(false)
  function clear_token() {
    setisTokenValid(false)
    localStorage.removeItem('token')
  }

  useEffect(() => {
    if (localStorage.getItem('token'))
      {setisTokenValid(true)}
  }, [])

  return (
    <div className="App">
      <Navbar/>
      <div className='container' >
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/login' element={<Signup isTokenValid={isTokenValid} setisTokenValid={setisTokenValid}/>}></Route>
          <Route path='my-course' element={<MyCourse/>}> </Route>
          <Route path='/courses/:id' ></Route>
          
        </Routes>
      </div>
      {/* { isTokenValid && <button style={{float: 'right'}} onClick={clear_token}>sign out</button>}
      <Signup isTokenValid={isTokenValid} setisTokenValid={setisTokenValid}/> */}

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
