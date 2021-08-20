import { Link } from 'react-router-dom';
import axios from 'axios';
import {globalStore} from './store.js'

function About({setIsAuth}) {
  // nav
  const setCurrentPage = globalStore(state => state.setCurrentPage);
  setCurrentPage(window.location.pathname)

  // auth
  const setIsLoggedIn = globalStore(state => state.setIsLoggedIn);
  const isLoggedIn = globalStore(state => state.isLoggedIn)

  // Del token from storage, blacklist on server, set auth to false
  const logout = async () => {
    const token = localStorage.getItem('Authorization');
    localStorage.removeItem('Authorization');
    const res = await axios.post('/logout', {token: token});
    setIsLoggedIn(false);
    setIsAuth(false);
  }


  return (
    <div className="container text-center">
      <div className="container col-xl-10 border border-2 pb-5">
      <h1 className="display-2">About</h1>
      <p>Here for all your espresso brewing needs.</p>

      <br></br>

        <p>
          An espresso recipe and dialing application to help make brewing a
          simpler experience for all.
        </p>

        <p>Less waste, more coffee.</p>
        
        <div className="mb-2">
        <h4 className="">Lets get brewing</h4>
          <Link to={{pathname: `${isLoggedIn? '/about': '/register'}`, state: {location: "/register", going: "/about"}}}><button className="btn btn-dark m-1" type="button" disabled={isLoggedIn}>Register</button></Link>
          <Link to={{pathname: `${isLoggedIn? '/about': '/login'}`, state: {location: "/login", going: "/about"}}}><button className="btn btn-dark m-1" type="button" disabled={isLoggedIn}>Login</button></Link>
          <button className="btn btn-dark m-1" type="button" onClick={() => logout()}>Logout</button>
      </div>

      </div>
    </div>
  )
}

export default About
