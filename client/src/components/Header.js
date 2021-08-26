import { Link } from 'react-router-dom';
import {useState} from 'react';
import Fade from 'react-reveal/Fade';

// components
import Navbar from './Navbar.js';
import '../assets/Header.css';

// imgs 
import tamper from '../assets/img/tamper_fix.png';
import portafilter from '../assets/img/portafilter_fix.png';
import drip from '../assets/img/drip_fix.png';


function Header(){
  const [currPage, setCurrPage] = useState({[window.location.pathname]: true});

    const handleNav = (e) => {
        setCurrPage(() => ({
            [e.target.name]: true
        }));
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