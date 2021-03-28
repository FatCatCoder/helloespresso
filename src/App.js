// import logo from './logo.svg';
import React from 'react';
import './App.css';
import './App.scss';
import Header from './Header.js';
import Body from './Body.js';
import Footer from './Footer.js';

class App extends React.Component {

    state={
      shotList: [{"Dose":"20", "Time":"30", "Yield":"45"},{"Dose":"19", "Time":"30", "Yield":"45"}]
    };

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
