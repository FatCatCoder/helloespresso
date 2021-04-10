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

function App (){
  const history = useHistory ();

  /*set default list of pulled shots */
  const [shotList, setShotList] = useState([{"Dose":"20", "Time":"30", "Yield":"45", "Grind": "10", "Grinder": "Breville Smart Grinder Pro", "Roaster": "Buddy Brew", "Bean": "Ethiopia", "Method": "Espresso", "Machine": "1998 Gaggia Coffee", "Style": "Espresso", "Creamer": "Black"},{"Dose":"19", "Time":"30", "Yield":"45", "Grind": "10", "Grinder": "Breville Smart Grinder Pro", "Roaster": "Buddy Brew", "Bean": "Ethiopia", "Method": "Espresso", "Machine": "1998 Gaggia Coffee", "Style": "Espresso", "Creamer": "Black"}])

  const addShotToList = (addShot) => {
    setShotList([...shotList, addShot]);
  };

  return (
    <Router>
    <div className="App">
      <Header />

      <Switch>
        <Route path="/" exact>
          <Body  onNewShot={addShotToList} />
          <Footer shotList={shotList} />
        </Route>

        <Route path="/journal">
          <Journal />
        </Route>

        <Route path="/recipes">
          <Recipes />
        </Route>

        <Route path="/about">
          <About />
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
