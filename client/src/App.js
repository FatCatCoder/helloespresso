import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { globalStore, useRecipesStore} from './store.js';

// pages
import Pull from './pages/Pull.js';
import About from './pages/About.js';
import Journal from './pages/Journal.js';
import Recipes from './pages/Recipes.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';

// components
import Header from './components/Header.js';
import ScrollToTop from './components/ScrollToTop.js';
import ErrorScreen from './components/ErrorScreen.js';
import Test from './Test.js';

function App (){
  const setIsLoggedIn = globalStore(state => state.setIsLoggedIn)
  const isLoggedIn = globalStore(state => state.isLoggedIn)
  const setLoadingAuth = globalStore(state => state.setLoadingAuth);
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    let ignore = false;

    const timer = setTimeout(() => {
    if(!ignore){
      const startAuth = async () => {
        try {
          const response = await fetch('/verify-auth', {
            method: "GET",
            headers: {Authorization: localStorage.Authorization}
          })
    
          if(response.status === 401 || response.status === 500){
            setIsAuth(false);
          }
    
          const parseRes = await response.json();
          parseRes.verified === true ? setIsAuth(true): setIsAuth(false);
          parseRes.verified === true ? setIsLoggedIn(true): setIsLoggedIn(false);
          setLoadingAuth(false);

        } catch (error) {
            console.log(error.message)
            setIsAuth(false);
            setIsLoggedIn(false);
            setLoadingAuth(false);
        }
      }
      // call
      startAuth();
    }}, 5000);
    
    return () => {
            ignore = true;
            abortController.abort();
            clearTimeout(timer);
        }; 
  }, [setIsLoggedIn, isLoggedIn])

  const globalRecipes = useRecipesStore(state => state.recipes);
  console.log(globalRecipes);
 
  // Main router for app, checks for auth in token before load
  return (
    <>
    { /* isAuth !== null ? */
    <Router>
      <ScrollToTop />
      <div className="App">
      <Header />

      <Switch>
        <Route exact path="/">
          <Pull />
        </Route>

        <Route path="/journal">
          <Journal isAuth={isAuth} />  
        </Route>

        <Route path="/recipes">
          <Recipes isAuth={isAuth} />
        </Route>

        <Route path="/about">
          <About setIsAuth={setIsAuth}/>
        </Route>

        <Route path="/login"
          render={({location}) => isAuth ? (<Redirect to={{pathname: "/", state: {location: "/"}}} />) : (<Login setIsAuth={setIsAuth} />)} 
        />

        <Route path="/register"
          render={props => isAuth ? (null) : (<Register setIsAuth={setIsAuth} />)}
        />

        <Route path="/test">
          <Test />
        </Route>

        <Route path="*" render={() => <ErrorScreen errorMessage={'404 - No coffee here :('} />} />

      </Switch>
      
    </div>
    </Router>
    /*:
    
    <div className="position-absolute top-50 start-50">
        <LoadingSpinner />
    </div>
    */}
    </>
  );
}


export default App;
