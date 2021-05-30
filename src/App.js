// import logo from './logo.svg';
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import {BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import useShotFormStore from './store.js';


// components
import './App.css';
import './App.scss';
import Header from './Header.js';
import Body from './Body.js';
import Footer from './Footer.js';
import About from './About.js';
import Journal from './Journal.js';
import Recipes from './Recipes.js';
import RecipeTest from './RecipeTest.js';
import ScrollToTop from './ScrollToTop.js';

function App (){
  let thisPage = window.location.pathname;
  const history = useHistory();
  const [currPage, setCurrPage] = useState({[thisPage]: true});

  

  /*set default list of pulled shots */
  const [shotList, setShotList] = useState([{"Dose":"20", "Time":"30", "Yield":"45", "Grind": "10", "Roaster": "Buddy Brew", "Bean": "Ethiopia", "Bitter": true, "Strong": true, "Notes": "too strong and overextracted, no tasting notes present."},
  {"Dose":"19", "Time":"30", "Yield":"45", "Grind": "10", "Roaster": "Buddy Brew", "Bean": "Ethiopia", "Sour": true, "Balanced": true, "Weak": true, "Notes": "tastes like sour/sweet fruit, pulled a little watery."}])

  const addShotToList = (addShot) => {
    setShotList([...shotList, addShot]);
  };


  const [newShot, setNewShot] = useState({});

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
    Dose: yup.string().required().matches(/^([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[1-9]\d*)$/, "Dose is not a reasonable number"),
    Yield: yup.string().required().matches(/^([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[1-9]\d*)$/, "Yield is not a reasonable number"),
    Time: yup.string().required().matches(/^([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[1-9]\d*)$/, "Time is not a reasonable number"),
    Grind: yup.string().required().matches(/^([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[1-9]\d*)$/, "Grind is not a reasonable number"),
  })


  const formErrors = useShotFormStore(state => state.formError);
  const setFormErrors = useShotFormStore(state => state.setFormError);

  const pullValidation = () => {
    schema.validate({
      Dose: newShot.Dose,
      Yield: newShot.Yield,
      Time: newShot.Time,
      Grind: newShot.Grind,
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
      console.log(newShot.Dose)
      schema.validate({
        Dose: newShot.Dose,
        Yield: newShot.Yield,
        Time: newShot.Time,
        Grind: newShot.Grind,
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
    const todaysDate = new Date().toLocaleDateString();
    const [journalEntry, setJournalEntry] = useState({"Date": todaysDate});
    

    const handleModalSubmit = (event) => {
        event.preventDefault();
        addEntryToJournal(journalEntry);
        setJournalEntry({"Date": todaysDate})
    }

    const handleModalInputChange = (e) => {
        setJournalEntry((prevProps) => ({
            ...prevProps,
            [e.target.name]: e.target.value
        }));
    };

    // add new entry to journal
    const addEntryToJournal = (entry) => {
      axios({
          method: 'POST',
          url: '/journal?_sort=id&_order=desc',
          data: {...entry, "ShotLog": shotList}
      })
  }


  
  

  return (
    
    <Router>
      <ScrollToTop />
    <div className="App">
      <Header currPage={currPage} setCurrPage={setCurrPage}/>

      <Switch>
        <Route path="/" exact>
          <Body  pullValidation={pullValidation} onNewShot={addShotToList} newShot={newShot} setNewShot={setNewShot} handleCheckboxChange={handleCheckboxChange} handleInputChange={handleInputChange} handleSubmit={handleSubmit} step={step} setStep={setStep} />
          <Footer shotList={shotList} setShotList={setShotList} handleModalSubmit={handleModalSubmit} handleModalInputChange={handleModalInputChange} journalEntry={journalEntry}  />
        </Route>

        <Route path="/journal">
          <Journal shotList={shotList}/>
        </Route>

        <Route path="/recipes">
          <Recipes onNewShot={addShotToList} newShot={newShot} setNewShot={setNewShot} handleCheckboxChange={handleCheckboxChange} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
        </Route>

        <Route path="/about">
          <About />
        </Route>

        <Route path="/test">
          <RecipeTest recipe={shotList[0]}/>
        </Route>
      </Switch>
      
      
    </div>
    </Router>
    
  );
}


export default App;
