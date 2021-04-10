import React from 'react';
import './App.scss';
import Navbar from './Navbar.js';


function Header(props){
    return(
        <>
        <div id="header" className="border-bottom pb-1">
        <div className="container-xl">
          <img alt="altLogoImg" className="img-fluid d-block mx-auto w-25" src="https://icons-for-free.com/iconfiles/png/512/coffee+espresso+machine+portafilter+tamper+icon-1320086035176622247.png" />
        </div>

        <h1 className="text-center">hello coffee</h1>      
      </div>

      <Navbar />

      </>
    )
}

export default Header;