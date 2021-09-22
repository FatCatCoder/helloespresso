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
import PasswordReset from './pages/PasswordReset.js';

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
          parseRes.verified === true ? setIsLoggedIn(true): setIsLoggedIn(false);
          setLoadingAuth(false);

        } catch (error) {
            console.log(error.message)
            setIsLoggedIn(false);
            setLoadingAuth(false);
        }
      }
      // call
      startAuth();
    }
    
    return () => {
            ignore = true;
            abortController.abort();
        }; 
  }, [setIsLoggedIn, isLoggedIn])

  const globalRecipes = useRecipesStore(state => state.myRecipes);
  const recipenumber = useRecipesStore(state => state.currPage);
  const recipeslice = useRecipesStore(state => state.recipeSlice);
  console.log('recipes store check',globalRecipes, recipenumber, recipeslice);
 
  // Main router for app, checks for auth in token before load
  return (
    <>
    { /* isAuth !== null ? */
    
      <div className="App">
      <Header />

      <Switch>
        <Route exact path="/">
          <Pull />
        </Route>

        <Route path="/journal"
          render={() => isLoggedIn ? (<Journal />) : (<Redirect to={{pathname: "/login", state: {location: "/journal", going: "/journal"}}} />)}
          />

        <Route path="/recipes">
          <Recipes />
        </Route>

        <Route path="/about">
          <About />
        </Route>

        <Route path="/login"
          render={(props) => isLoggedIn ? (<Redirect to={{pathname: "/", state: {location: "/", going: '/'}}} />) : (<Login {...props} />)} 
        />

        <Route path="/register"
          render={(...props) => isLoggedIn ? (null) : (<Register props={props} />)}
        />

        <Route path="/password-reset"
          render={({location}) => isLoggedIn ? (<Redirect to={{pathname: "/", state: {location: "/"}}} />) : (<PasswordReset />)} 
        />

        <Route path="*" render={() => <ErrorScreen errorMessage={'404 - No coffee here :('} />} />

      </Switch>
      
    </div>
    
    /*:
    
    <div className="position-absolute top-50 start-50">
        <LoadingSpinner />
    </div>
    */}
    </>
  );
}


export default App;
