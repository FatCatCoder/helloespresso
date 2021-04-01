// import logo from './logo.svg';
import React from 'react';
import './App.css';
import './App.scss';
import Header from './Header.js';
import Body from './Body.js';
import Footer from './Footer.js';


class App extends React.Component {

  /* set default list of pulled shots */
    state={
      shotList: [{"Dose":"20", "Time":"30", "Yield":"45", "Grind": "10", "Grinder": "Breville Smart Grinder Pro", "Roaster": "Buddy Brew", "Bean": "Ethiopia", "Method": "Espresso", "Machine": "1998 Gaggia Coffee", "Style": "Espresso", "Creamer": "Black"},{"Dose":"19", "Time":"30", "Yield":"45", "Grind": "10", "Grinder": "Breville Smart Grinder Pro", "Roaster": "Buddy Brew", "Bean": "Ethiopia", "Method": "Espresso", "Machine": "1998 Gaggia Coffee", "Style": "Espresso", "Creamer": "Black"}]
    };

    /* add to list of pulled shots */
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

export default App;
