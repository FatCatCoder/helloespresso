import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { globalStore} from './store.js';
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'

// pages
import Pull from './pages/Pull.js';
import About from './pages/About.js';
import Journal from './pages/Journal.js';
import Recipes from './pages/Recipes.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import PasswordReset from './pages/PasswordReset.js';
import LoadingSpinner from './components/LoadingSpinner.js';

// components
import Header from './components/Header.js';
import ErrorScreen from './components/ErrorScreen.js';


function App (){
  // auth
  const setIsLoggedIn = globalStore(state => state.setIsLoggedIn)
  const isLoggedIn = globalStore(state => state.isLoggedIn)
  const setLoadingAuth = globalStore(state => state.setLoadingAuth);
  const loadingAuth = globalStore(state => state.loadingAuth);

  // global toast message system, butter & jam on the side
  const setShowGlobalToast = globalStore(state => state.setShowGlobalToast);
  const showGlobalToast = globalStore(state => state.showGlobalToast);
  const globalToastBody = globalStore(state => state.globalToastBody);
  
  useEffect(() => {
    console.log('app.js useeffect');
    
    const abortController = new AbortController();
    let ignore = false;

    if(!ignore){
      const startAuth = async () => {
        try { 
          const response = await fetch('/api/verify-auth', {
            method: "GET",
            headers: {Authorization: localStorage.Authorization}
          })
    
          if(response.status === 401 || response.status === 500){
            setIsLoggedIn(false)
          }
    
          const parseRes = await response.json();
          console.log(parseRes);
          
          parseRes.verified === true ? setIsLoggedIn(true): setIsLoggedIn(false);
          setLoadingAuth(false);

        } catch (error) {
            console.log(error.message)
            setIsLoggedIn(false);
            setLoadingAuth(false);
        }
      }
      startAuth();
    }
    
    return () => {
            ignore = true;
            abortController.abort();
        }; 
  }, [setIsLoggedIn, isLoggedIn, loadingAuth, setLoadingAuth])
 
  console.log(window.location.pathname);

  return (
    <>
      <div className="App">
      <Header />

      <Switch>
        <Route exact path="/">
          <Pull />
        </Route>

        <Route path="/journal"
          render={() => isLoggedIn ? (<Journal />) : loadingAuth? <LoadingSpinner /> : (<Redirect to={{pathname: "/login", state: {going: "/journal"}}} />) }
        />

        <Route path="/recipes">
          <Recipes />
        </Route>

        <Route path="/about">
          <About />
        </Route>

        <Route path="/login"
          render={(props) => isLoggedIn ? (<Redirect to={props?.location || '/'} />) : (<Login {...props} />)} 
        />

        <Route path="/register"
          render={(...props) => isLoggedIn ? (null) : (<Register props={props} />)}
        />

        <Route path="/password-reset"
          render={({location}) => isLoggedIn ? (<Redirect to={{pathname: "/", state: {location: "/"}}} />) : (<PasswordReset />)} 
        />

        <Route path="*" render={() => <ErrorScreen errorMessage={'404 - No coffee here :('} />} />

      </Switch>

      <ToastContainer position='bottom-center'>
        <Toast className="p-1 mb-2" onClose={() => setShowGlobalToast(false)} show={showGlobalToast} animation={true} delay={1750} autohide>
          <Toast.Header>
            <div className="mx-auto text-center">
              <i class="bi bi-bell"></i>
              <div dangerouslySetInnerHTML={{__html: globalToastBody}} />
            </div>
          </Toast.Header>
        </Toast>
      </ToastContainer>

      {/* const globalToast = globalStore(state => state.globalToast); <button onClick={() => globalToast('hello there!')} className="btn btn-warning mx-auto text-center">Gimme Toast</button> */}
      
    </div>
    </>
  );
}


export default App;
