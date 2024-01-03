// Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Navbar.css'
import { useState, useEffect } from 'react';

function Navbar(props) {
  // const [isTokenValid, setisTokenValid] = useState(false)
  // const navigate = useNavigate();
  // function clear_token() {
  //   setisTokenValid(false)
  //   localStorage.removeItem('token')
  //   navigate('/');
  // }

  // useEffect(() => {
  //   console.log(isTokenValid)
  //   if (localStorage.getItem('token'))
  //     {setisTokenValid(true)}
  // }, [])

  return(
    <nav className='nav'>
    <Link to='/' className='site-title'>Home</Link>
    <ul>
      {props.isTokenValid ? (
        <>
          <li>
            <Link to='my-course'> My course</Link>
          </li>
          <li>
            <Link to='profile'>Profile</Link>
          </li>
          <li>
            <Link to='/' onClick={props.clear_token}>Sign out</Link>
          </li>
          
        </>
      ) : (
        <li>
          <Link to='login'>Sign In</Link>
        </li>
      )}
    </ul>
  </nav>
  )
};

export default Navbar;
