import { render } from '@testing-library/react';
import React from 'react';
import './App.scss';

class Body extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showingNotes: false,
            showingGuide: false
        };
    }
    handleNewShot = () => {
        let logShot = {"Dose":"20", "Time":"30", "Yield":"40"};
        this.props.onNewShot(logShot);
    };


    render(){ 
        const {showingNotes, showingGuide} = this.state;
        return(
            
            <>
            <div id="main">
            <button class="btn p-2 m-2 btn-light shadow mx-auto d-block text-muted ">Quick Start</button>
            
            <form class="mx-auto text-center">
                
            <label for="dose">Dose</label><br />
            <input class="shadow border" type="text" id="dose" name="dose" placeholder="Dose..." /><br />
                
            <label for="time">Time</label><br />
            <input class="shadow border" type="text" id="time" name="time" placeholder="Time..." /><br />
                
            <label for="yield">Yield</label><br />
            <input class="shadow border" type="text" id="yield" name="yield" placeholder="Yield..." /><br />
                
            
            <button class="btn btn-light p-2 m-2 shadow" type="button" onClick={() => this.setState({showingNotes: !showingNotes})}>Click Me!</button>
            
            </form>
            
            <div id="extractionNotes" class="container col-4 mx-auto text-center" style={{display: (showingNotes ? 'block' : 'none')}}>
                <h3 class="text-center">Was it?</h3>
            <div class="btn-group text-center flex-wrap mx-auto d-flex justify-content-center" role="group" aria-label="Basic radio toggle button group">
            <input type="checkbox" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked />
            <label class="btn btn-outline-primary" for="btnradio1">Sour</label>

            <input type="checkbox" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" />
            <label class="btn btn-outline-primary" for="btnradio2">Bitter</label>

            <input type="checkbox" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" />
            <label class="btn btn-outline-primary" for="btnradio3">Bland</label>
                
            <input type="checkbox" class="btn-check" name="btnradio" id="btnradio4" autocomplete="off" />
            <label class="btn btn-outline-primary" for="btnradio4">Balanced</label>
                
            <input type="checkbox" class="btn-check" name="btnradio" id="btnradio5" autocomplete="off" />
            <label class="btn btn-outline-primary" for="btnradio5">Missing?</label>
                
                
            </div>
                <button class="btn btn-light p-2 m-2 shadow" type="button" onClick={() => this.setState({showingGuide: !showingGuide})}>Click Me!</button>
            </div>
            
            
            <div id="suggestionGuides" class="" style={{display: (showingGuide ? 'block': 'none')}}>
            <p class="m-5 display-6 text-center">We Suggest you grind finer to Extract more goodies</p>
            
            <img class="img-fluid w-50 mx-auto d-block" src="https://i.pinimg.com/originals/be/e1/a0/bee1a0b7c2397ea6727c9f96df196dae.png" />
                
            <div class="mx-auto text-center">
            <button class="btn btn-light p-2 m-2 shadow" type="button" onClick={this.handleNewShot}>Log Shot</button>
            <button class="btn btn-light p-2 m-2 shadow" type="button" onClick={() => this.setState({showingGuide: false, showingNotes: false})}>Pull New Shot</button>
            </div>
                
            </div>
            
            
            
        </div>
        </>
        )
    }
}

export default Body;