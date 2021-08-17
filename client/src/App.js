// import logo from './logo.svg';
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch, useHistory, Redirect, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import {useShotFormStore, globalStore} from './store.js';


// components
import './App.css';
import './App.scss';
import Header from './components/Header.js';
import Pull from './Pull.js';
import About from './About.js';
import Journal from './Journal.js';
import Recipes from './Recipes.js';
import Login from './Login.js';
import Register from './Register.js';
import ScrollToTop from './ScrollToTop.js';
import Test from './Test.js';
import ErrorScreen from './components/ErrorScreen.js';

function App (){
  let thisPage = window.location.pathname;
  const history = useHistory();
  const [currPage, setCurrPage] = useState({[thisPage]: true});
  const setIsLoggedIn = globalStore(state => state.setIsLoggedIn)
  //const tokenCheck = localStorage.getItem('Authorization') ? true : false;

  const startAuth = async () => {
    try {
      const response = await fetch('/verify-auth', {
        method: "GET",
        headers: {Authorization: localStorage.Authorization}
      })
      if(response.status === 401 || response.status === 500){
        setIsAuth(false);
      }

      console.log(response)
      const parseRes = await response.json();
      console.log(parseRes.verified);
      parseRes.verified === true ? setIsAuth(true): setIsAuth(false);
      parseRes.verified === true ? setIsLoggedIn(true): setIsLoggedIn(false);
      //return parseRes.verified;
    } catch (error) {
        console.log(error.message)
        setIsAuth(false);
        setIsLoggedIn(false);
    }
  }

  const [isAuth, setIsAuth] = useState(null);
  console.log(isAuth)


  useEffect(() => {
    startAuth();
  }, [])
 
  console.log(isAuth)
  
  const setAuth = (boolean) => {
    setIsAuth(boolean);
  }

  // global states shared by RecipeForm and (Pull - ShotForm)

  const [newShot, setNewShot] = useState({"dose":"", "time":"", "yield":"", "grind": "", "roaster": "", "bean": "", "notes": ""});

  const handleCheckboxChange = (e) => {
      if(e.target.checked){
          setNewShot((prevProps) => ({
              ...prevProps,
              [e.target.name]: true
          }));
      }
      if(e.target.checked === false){
          setNewShot((prevProps) => (delete prevProps[e.target.name], { 
              ...prevProps
          }));
      }
  };

  const handleInputChange = (e) => {
      setNewShot((prevProps) => ({
          ...prevProps,
          [e.target.name]: e.target.value
      }));
  };

  // Main router for app, checks for auth in token before load
  return (
    <>
    {isAuth !== null ?
    <Router>
      <ScrollToTop />
    <div className="App">
      <Header currPage={currPage} setCurrPage={setCurrPage}/>

      <Switch>
        <Route exact path="/">
          <Pull newShot={newShot} setNewShot={setNewShot} handleCheckboxChange={handleCheckboxChange} handleInputChange={handleInputChange} />
        </Route>

        <Route path="/journal"
          render={props => isAuth ? (<Journal isAuth={isAuth}/>) : (<Redirect to={{pathname: "/login", state: {location: "/journal", going: "/journal"}}} />)}  
        />

        <Route path="/recipes">
          <Recipes isAuth={isAuth} newShot={newShot} setNewShot={setNewShot} handleCheckboxChange={handleCheckboxChange} handleInputChange={handleInputChange} />
        </Route>

        <Route path="/about">
          <About setIsAuth={setIsAuth}/>
        </Route>

        <Route path="/login"
          render={({location}) => isAuth ? (<Redirect to={{pathname: "/", state: {location: "/"}}} />) : (<Login setAuth={setAuth} setCurrPage={setCurrPage} currPage={currPage} />)} 
        />

        <Route path="/register"
          render={props => isAuth ? (null) : (<Register setAuth={setAuth} />)}
        />

        <Route path="/loading" render={() => 
          <div class="spinner-grow position-absolute top-50 start-50" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          } 
        />
        <Route path="/test">
          <Test />
        </Route>

        <Route path="*" render={() => <ErrorScreen errorMessage={'404 - No coffee here :('} />} />

      </Switch>
      
    </div>
    </Router>
    :
    <div class="spinner-grow position-absolute top-50 start-50" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
    }
    </>
  );
}


export default App;
