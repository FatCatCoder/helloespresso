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
import Header from './Header.js';
import Body from './Body.js';
import Footer from './Footer.js';
import About from './About.js';
import Journal from './Journal.js';
import Recipes from './Recipes.js';
import Login from './Login.js';
import Register from './Register.js';
import ScrollToTop from './ScrollToTop.js';
import Test from './Test.js';

function App (){
  let thisPage = window.location.pathname;
  const history = useHistory();
  const [currPage, setCurrPage] = useState({[thisPage]: true});
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
      //return parseRes.verified;
    } catch (error) {
      console.log(error.message)
    }
  }

 


  //const [isAuth, setIsAuth] = useState(tokenCheck);
  const [isAuth, setIsAuth] = useState(null);
  console.log(isAuth)


  useEffect(() => {
    startAuth();
  }, [])
 
  console.log(isAuth)
  

  /*
  const isAlreadyAuth = async () => {
    try {
      
      const response = await fetch('/verify-auth', {
        method: "GET",
        headers: {Authorization: localStorage.Authorization}
      })

      console.log(response)
      const parseRes = await response.json();
      parseRes.verified === true ? setIsAuth(true): setIsAuth(false);
      console.log(isAuth)

    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    isAlreadyAuth();
  }, [])
  */
  

  const setAuth = (boolean) => {
    setIsAuth(boolean);
  }
  

  /*set default list of pulled shots */
  const [shotList, setShotList] = useState([{"dose":"20", "time":"30", "yield":"45", "grind": "10", "roaster": "Buddy Brew", "bean": "Ethiopia", "Bitter": true, "Strong": true, "notes": "too strong and overextracted, no tasting notes present."},
  {"dose":"19", "time":"30", "yield":"45", "grind": "10", "roaster": "Buddy Brew", "bean": "Ethiopia", "Sour": true, "Balanced": true, "Weak": true, "notes": "tastes like sour/sweet fruit, pulled a little watery."}])

  const addShotToList = (addShot) => {
    setShotList([...shotList, addShot]);
  };


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



  const schema = yup.object().shape({
    dose: yup.string().required().matches(/^([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[1-9]\d*)$/, "Dose is not a reasonable number"),
    yield: yup.string().required().matches(/^([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[1-9]\d*)$/, "Yield is not a reasonable number"),
    time: yup.string().required().matches(/^([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[1-9]\d*)$/, "Time is not a reasonable number"),
    grind: yup.string().required().matches(/^([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[1-9]\d*)$/, "Grind is not a reasonable number"),
  })


  const formErrors = useShotFormStore(state => state.formError);
  const setFormErrors = useShotFormStore(state => state.setFormError);

  const pullValidation = () => {
    schema.validate({
      dose: newShot.dose,
      yield: newShot.yield,
      time: newShot.time,
      grind: newShot.grind,
    }, { abortEarly: false }).then(function () {
      setFormErrors([]);
      setStep(1);
    }).catch(function (err) {
      setFormErrors(err.errors);
      console.log(Object.keys(err), err.name, err.value, err.path, err.type, err.errors, err.inner)
    })
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      console.log(newShot.dose)
      schema.validate({
        dose: newShot.dose,
        yield: newShot.yield,
        time: newShot.time,
        grind: newShot.grind,
      }, { abortEarly: false }).then(function () {
        console.log('Submitted!')
        addShotToList(newShot);
        setNewShot({});
        setStep(2);
      }).catch(function (err) {
        setFormErrors(err.errors);
        console.log(Object.keys(err), err.name, err.value, err.path, err.type, err.errors, err.inner)
      })

         
  }

    const [step, setStep] = useState(0);

    // Footer modal form shot logging to journal 
    const todaysDate = new Date().toISOString().split('T')[0];
    const [journalEntry, setJournalEntry] = useState({"postDate": todaysDate});
    
    // get user id
    const getUserId = globalStore(state => state.getUserIdFromJWT)

    const handleModalSubmit = (event) => {
        event.preventDefault();
        addEntryToJournal(journalEntry);
        //setJournalEntry({"postDate": todaysDate})
    }

    const handleModalInputChange = (e) => {
        setJournalEntry((prevProps) => ({
            ...prevProps,
            [e.target.name]: e.target.value
        }));
    };

    // add new entry to journal
    const addEntryToJournal = async(entry) => {
      const userId = await getUserId();
      axios({
          method: 'POST',
          url: '/journals/new',
          data: {"journalData": entry, "ShotLog": shotList, "user_id": userId}
      })
  }


  
  
 const [currPage1, setCurrPage1] = useState(1);

  return (
    <>
    {isAuth !== null ?
    <Router>
      <ScrollToTop />
    <div className="App">
      <Header currPage={currPage} setCurrPage={setCurrPage}/>

      <Switch>
        <Route exact path="/">
          <Body pullValidation={pullValidation} onNewShot={addShotToList} newShot={newShot} setNewShot={setNewShot} handleCheckboxChange={handleCheckboxChange} handleInputChange={handleInputChange} handleSubmit={handleSubmit} step={step} setStep={setStep} />
          <Footer shotList={shotList} setShotList={setShotList} handleModalSubmit={handleModalSubmit} handleModalInputChange={handleModalInputChange} journalEntry={journalEntry}  />
        </Route>

        <Route path="/journal"
          render={props => isAuth ? (<Journal shotList={shotList} isAuth={isAuth}/>) : (<Redirect to={{pathname: "/login", state: {location: "/journal", going: "/journal"}}} />)}  
        />
        
        {/*
        <Route path="/journal">
          <Journal shotList={shotList} isAuth={isAuth}/>
        </Route>
        */}

        <Route path="/recipes">
          <Recipes isAuth={isAuth} onNewShot={addShotToList} newShot={newShot} setNewShot={setNewShot} handleCheckboxChange={handleCheckboxChange} handleInputChange={handleInputChange} handleSubmit={handleSubmit} todaysDate={todaysDate} />
        </Route>

        <Route path="/about">
          <About setIsAuth={setIsAuth}/>
        </Route>

        <Route path="/login"
          render={({location}) => isAuth ? (<Redirect to={{pathname: "/", state: {location: thisPage}}} />) : (<Login setAuth={setAuth} setCurrPage={setCurrPage} currPage={currPage} />)} 
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
          <Test currPage={currPage1} setCurrPage={setCurrPage1} />
        </Route>
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
