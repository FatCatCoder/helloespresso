import React from 'react';
import './App.scss';
import { useState } from 'react';
import Navbar from './Navbar.js';
import { Link, useHistory } from 'react-router-dom';


function Header({currPage, setCurrPage}){
  const history = useHistory();

  

    const handleNav = (e) => {
        setCurrPage((prevProps) => ({
            [e.target.name]: true
        }));

        /*
        history.push(e.target.name);
        */
    }


    return(
        <>
        <div id="header" className="border-bottom pb-1">
        <div className="container-xl">
          <Link to={"/"}>
          <img alt="altLogoImg" onClick={handleNav} name={'/'} className="img-fluid d-block mx-auto w-15" src="Logo.png" />
          </Link>
        </div>

        <h1 className="text-center">hello coffee</h1>      
      </div>

      <Navbar currPage={currPage} setCurrPage={setCurrPage} handleNav={handleNav}/>

      </>
    )
}

export default Header;