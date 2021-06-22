import React from 'react';
import './App.scss';
import { useState } from 'react';
import Navbar from './Navbar.js';
import './Header.css';
import { Link, useHistory } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import tamper from './img/tamper_fix.png';
import portafilter from './img/portafilter_fix.png';
import drip from './img/drip_fix.png';


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
        <div className="container-xl img-box">
          <Link to={"/"}>
          <img alt="altLogoImg" onClick={handleNav} name={'/'} className="img-fluid d-block mx-auto w-15 portafilter" src={portafilter} />
          <Fade top delay={500}>
            <img alt="altLogoImg" onClick={handleNav} name={'/'} className="img-fluid d-block mx-auto w-15" src={tamper} />
          </Fade>
          <Fade delay={1500}>
            <img alt="altLogoImg" onClick={handleNav} name={'/'} className="img-fluid d-block mx-auto w-15 drip" src={drip} />
          </Fade>
          </Link>
        </div>

        
        <h1 className="text-center">hello coffee</h1>

        
      </div>

      <Navbar currPage={currPage} setCurrPage={setCurrPage} handleNav={handleNav}/>

      </>
    )
}

export default Header;