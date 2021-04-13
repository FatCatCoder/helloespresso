// import logo from './logo.svg';
import React from 'react';
import { useState } from 'react';
import {BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
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
  const [shotList, setShotList] = useState([{"Dose":"20", "Time":"30", "Yield":"45", "Grind": "10", "Grinder": "Breville Smart Grinder Pro", "Roaster": "Buddy Brew", "Bean": "Ethiopia", "Method": "Espresso", "Machine": "1998 Gaggia Coffee", "Style": "Espresso", "Creamer": "Black"},{"Dose":"19", "Time":"30", "Yield":"45", "Grind": "10", "Grinder": "Breville Smart Grinder Pro", "Roaster": "Buddy Brew", "Bean": "Ethiopia", "Method": "Espresso", "Machine": "1998 Gaggia Coffee", "Style": "Espresso", "Creamer": "Black"}])

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

    const handleSubmit = (event) => {
        event.preventDefault();
        addShotToList(newShot);
        setNewShot({});
        setStep(3); 
    }


    const [step, setStep] = useState(0);

  return (
    <Router>
      <ScrollToTop />
    <div className="App">
      <Header currPage={currPage} setCurrPage={setCurrPage}/>

      <Switch>
        <Route path="/" exact>
          <Body  onNewShot={addShotToList} newShot={newShot} setNewShot={setNewShot} handleCheckboxChange={handleCheckboxChange} handleInputChange={handleInputChange} handleSubmit={handleSubmit} step={step} setStep={setStep} />
          <Footer shotList={shotList} />
        </Route>

        <Route path="/journal">
          <Journal onNewShot={addShotToList} newShot={newShot} setNewShot={setNewShot} handleCheckboxChange={handleCheckboxChange} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
        </Route>

        <Route path="/recipes">
          <Recipes />
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




/*

class App extends React.Component {

  /* set default list of pulled shots /
    state={
      shotList: [{"Dose":"20", "Time":"30", "Yield":"45", "Grind": "10", "Grinder": "Breville Smart Grinder Pro", "Roaster": "Buddy Brew", "Bean": "Ethiopia", "Method": "Espresso", "Machine": "1998 Gaggia Coffee", "Style": "Espresso", "Creamer": "Black"},{"Dose":"19", "Time":"30", "Yield":"45", "Grind": "10", "Grinder": "Breville Smart Grinder Pro", "Roaster": "Buddy Brew", "Bean": "Ethiopia", "Method": "Espresso", "Machine": "1998 Gaggia Coffee", "Style": "Espresso", "Creamer": "Black"}]
    };

    /* add to list of pulled shots /
    addShotToList = (x) => {
      let shotList = [...this.state.shotList];
      shotList.push(x);
      this.setState({ shotList });
    }

    
  render(){
  return (
    <div className="App">
      <Header />
      <Body onNewShot={this.addShotToList} />
      <Footer shotList={this.state.shotList}/>
    </div>
  );
}
}

*/



export default App;
