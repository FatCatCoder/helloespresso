import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {globalStore} from '../store.js'
import Fade from 'react-reveal/Fade';

function About() {
  // nav
  const setCurrentPage = globalStore(state => state.setCurrentPage);
  useEffect(() => {
    setCurrentPage(window.location.pathname)
    // eslint-disable-next-line
}, [])

  // auth
  const setIsLoggedIn = globalStore(state => state.setIsLoggedIn);
  const isLoggedIn = globalStore(state => state.isLoggedIn)

  // secret sections
  // eslint-disable-next-line
  const [show, setShow] = useState(false);
  const [showSecret, setShowSecret] = useState(false); 
  // const [showSobSection, setShowSobSection] = useState(false);
  
  // global toast message system, butter & jam on the side
  const globalToast = globalStore(state => state.globalToast);

  // Del token from storage, blacklist on server, set auth to false
  const logout = async () => {
    if(isLoggedIn){
      const token = localStorage.getItem('Authorization');
      localStorage.removeItem('Authorization');

      const res = await fetch('/api/logout', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({token: token})
      })

      const parseRes = await res.json();

      if(parseRes.success){
        setShow(true)
        setIsLoggedIn(false);
        globalToast("You've been logged out!")
      }
    }
  }

  return (
     <div className="container h-100 text-center">
      <div className="container col-xl-10 border border-1 pb-5 pe-3 ps-3">
        <h1 className="display-2">About</h1>
        <p><em>Less waste, more coffee.</em></p>
          
        <p className="container">
          An espresso recipe and dialing application to help make brewing a
          simpler experience.
        </p>

        <div className="mb-2">
          <h4>Lets get brewing</h4>
          <Link to={{pathname: `${isLoggedIn? '/about': '/register'}`, state: {location: "/register", going: "/about"}}}><button className="btn btn-dark m-1" type="button" disabled={isLoggedIn}>Register</button></Link>
          <Link to={{pathname: `${isLoggedIn? '/about': '/login'}`, state: {location: "/login", going: "/about"}}}><button className="btn btn-dark m-1" type="button" disabled={isLoggedIn}>Login</button></Link>
          <button className="btn btn-dark m-1" type="button" onClick={() => logout()} disabled={!isLoggedIn}>Logout</button>
        </div>
      </div>

      <button className="bg-transparent border-0 text-muted fs-6" type="button" onClick={() => setShowSecret(!showSecret)} data-bs-target="#secret" aria-expanded="false" aria-controls="secret text">
        wizards only, fools.
      </button>

      <div className="vh-100 position-relative" id="secret">
      <Fade cascade when={showSecret}>
        <div className="container col-12 col-md-8">
          <h1 className="display-3">@About 2.0</h1>
          <p className="lead fs-2">I Got Plans</p>
          <ul className="list-group list-group-flush text-center">
            <li className="list-group-item"><i className="bi bi-emoji-sunglasses float-start"></i> Support for other brewing methods (Kalita Wave, Chemex, Kyoto, French Press... More)</li>
            <li className="list-group-item"><i className="bi bi-emoji-sunglasses float-start"></i> Extraction analysis charts for journals</li>
            <li className="list-group-item"><i className="bi bi-emoji-sunglasses float-start"></i> Advanced extraction algorithm</li>
            <li className="list-group-item"><i className="bi bi-emoji-sunglasses float-start"></i> Best results tracking for main equipment setup</li>
            <li className="list-group-item"><i className="bi bi-emoji-sunglasses float-start"></i> Autofill for roasters, bean types, machines, etc...</li>
            <li className="list-group-item"><i className="bi bi-emoji-sunglasses float-start"></i> A Blog riddled with industry secrets and guru advice?</li>
            <li className="list-group-item"><i className="bi bi-emoji-sunglasses float-start"></i> User profiles</li>
            <li className="list-group-item"><i className="bi bi-emoji-sunglasses float-start"></i> Comments?</li>
            <li className="list-group-item"><i className="bi bi-emoji-sunglasses float-start"></i> Dark Mode</li>
            <li className="list-group-item"><i className="bi bi-emoji-sunglasses float-start"></i> More!</li>
          </ul>
          <h1 className="display-4">Whats up.</h1>
          <p>I want to hear from you. Send any requests for new features or bug fixes to one of my handles <span class="row"><strong><i class="bi bi-envelope-fill"></i> helloespresso.coffee@gmail.com</strong> <a href="https://twitter.com/hello__espresso"><i class="bi bi-twitter"></i> @hello__espresso</a></span> <a href="https://github.com/fatcatcoder"><i class="bi bi-github"></i> @FatCatCoder</a></p>
          <p className="lead fs-2">Hello Developers</p>
          <p className="p-2">looking to help out? Contact me on github and lets see what we can build together</p>

          {/* <button className="bg-transparent border-0 text-muted fs-6" type="button" onClick={() => setShowSobSection(!showSobSection)} data-bs-target="#secret" aria-expanded="false" aria-controls="secret text">
            pssst...
          </button>

          <Fade cascade when={showSobSection}>
            <div className="pt-5 mt-5 pb-3">
              <h1 className="display-5">Hey...</h1>
              <p className="lead">
              <em>This place aint'cheap </em>
                Sob section. if you love this app and want to see it grow, gain more performance, 
                or stay alive then a little donation would help with maintenance costs and keeping this platform free.
              </p>
              <p>@helloespresso payment vendor</p>
            </div>
            </Fade> */}
        </div>
        </Fade>
      </div>
    </div>
  )
}

export default About;
