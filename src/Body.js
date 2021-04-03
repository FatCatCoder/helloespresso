import { render } from '@testing-library/react';
import React from 'react';
import './App.scss';


class Body extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showingNotes: false,
            showingGuide: false,
            Dose: '',
            Time: '',
            Yield: '',
            Grind: '',
            Grinder: '',
            Roaster: '',
            Bean: '',
            Method: '',
            Machine: '',
            Style: '',
            Creamer: ''
        };   
    }

    /* when first form submits, if valid, send inputs to new object {logShot} then send back up via props onNewShot to the App.js addToShotList function */
    handleSubmitShot = (ev) => {
        ev.preventDefault();
        var conditionalResult = [this.state.Dose, this.state.Time, this.state.Yield].some((x) => {return x == '';});
        if(conditionalResult){
            //alert('no inputs');
            <div data-bs-toggle="popover" data-bs-content="You need to input something first!"></div>
        }

        else{
            /* send up via props to global shot list */
            let logShot = {"Dose": this.state.Dose, "Time": this.state.Time, "Yield":this.state.Yield, "Grind": this.state.Grind, "Grinder": this.state.Grinder, "Machine":this.state.Machine,
            "Method": this.state.Method, "Roaster": this.state.Roaster, "Style":this.state.Style, "Bean": this.state.Bean, "Creamer": this.state.Creamer};
            this.props.onNewShot(logShot);
        }
    };

    


    render(){ 
        const {showingNotes, showingGuide} = this.state;

        return(
            <>
            {/* form for Dose, Time, Yield and Etc.... on submit sends to handleSubmitShot() */}

            <div id="main">
            
            <button class="btn p-2 m-2 btn-light shadow mx-auto d-block text-muted ">Quick Start</button>
            
            
            <form onSubmit={this.handleSubmitShot} class="mx-auto text-center">
                
            <label for="dose">Dose</label><br />
            <input class="shadow border" value={this.state.Dose} onChange={(e) => this.setState({Dose : e.target.value })} type="text" id="dose" name="dose" placeholder="Dose..." /><br />
                
            <label for="time">Time</label><br />
            <input class="shadow border" value={this.state.Time} onChange={(e) => this.setState({Time : e.target.value })} type="text" id="time" name="time" placeholder="Time..." /><br />
                
            <label for="yield">Yield</label><br />
            <input class="shadow border" value={this.state.Yield} onChange={(e) => this.setState({Yield : e.target.value })} type="text" id="yield" name="yield" placeholder="Yield..." /><br />

            {/* Extra form field options (ie Bean, Roaster, Grind...) via collapse */}

            <button id="extraOptionsBtn" className="btn btn-light shadow" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                <i class="bi bi-grip-horizontal"></i>
            </button>
            <div id="extraOptionsInputs" className="collapse" id="collapseExample">
                <div className="container col-4 border p-3">
                    <label for="Grind">Grind</label><br />
                    <input class="shadow border" value={this.state.Grind} onChange={(e) => this.setState({Grind : e.target.value })} type="text" id="Grind" name="Grind" placeholder="Grind Size..." /><br />

                    <label for="Grinder">Grinder</label><br />
                    <input class="shadow border" value={this.state.Grinder} onChange={(e) => this.setState({Grinder : e.target.value })} type="text" id="Grinder" name="Grinder" placeholder="Grinder..." /><br />

                    <label for="Roaster">Roaster</label><br />
                    <input class="shadow border" value={this.state.Roaster} onChange={(e) => this.setState({Roaster : e.target.value })} type="text" id="Roaster" name="Roaster" placeholder="Roaster..." /><br />

                    <label for="Bean">Bean</label><br />
                    <input class="shadow border" value={this.state.Bean} onChange={(e) => this.setState({Bean : e.target.value })} type="text" id="Bean" name="Bean" placeholder="Name/Origin..." /><br />

                    <label for="Method">Method</label><br />
                    <input class="shadow border" value={this.state.Method} onChange={(e) => this.setState({Method : e.target.value })} type="text" id="Method" name="Method" placeholder="Chemex/shots..." /><br />

                    <label for="Machine">Machine</label><br />
                    <input class="shadow border" value={this.state.Machine} onChange={(e) => this.setState({Machine : e.target.value })} type="text" id="Machine" name="Machine" placeholder="La Marzocco..." /><br />

                    <label for="Style">Style</label><br />
                    <input class="shadow border" value={this.state.Style} onChange={(e) => this.setState({Style : e.target.value })} type="text" id="Style" name="Style" placeholder="espresso/latte..." /><br />

                    <label for="Creamer">Creamer</label><br />
                    <input class="shadow border" value={this.state.Creamer} onChange={(e) => this.setState({Creamer : e.target.value })} type="text" id="Creamer" name="Creamer" placeholder="oat/black..." /><br />
                </div>
            </div>    
            
            {/* form submit and show notes */}
            <button id="submitForm" data-bs-toggle="popover" data-bs-toggle="popover" data-bs-content="You need to input something first!" data-bs-content="You need to input something first!" class="btn btn-light p-2 m-2 shadow" role="button" type="button" onClick={() => this.setState({showingNotes: !showingNotes})}>Submit</button>
            
            </form>
            
            



            {/* form for Extraction notes checkboxes */}
            <div id="extractionNotes" class="container col-4 mx-auto text-center" style={{display: (showingNotes ? 'block' : 'none')}}>
                <h3 class="text-center">Was it?</h3>
            <div class="btn-group text-center flex-wrap mx-auto d-flex justify-content-center" role="group" aria-label="Basic radio toggle button group">
            <input type="checkbox" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" />
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
                {/* Toggle the extraction chart and guide section */}
                <button class="btn btn-light p-2 m-2 shadow" type="button" onClick={() => this.setState({showingGuide: !showingGuide})}>Click Me!</button>
            </div>
            
            

            {/* Extraction Suggestion Guide Section */}
            <div id="suggestionGuides" class="" style={{display: (showingGuide ? 'block': 'none')}}>
            <p class="m-5 display-6 text-center">We Suggest you grind finer to Extract more goodies</p>
            
            <img class="img-fluid w-50 mx-auto d-block" src="https://i.pinimg.com/originals/be/e1/a0/bee1a0b7c2397ea6727c9f96df196dae.png" />
                
            <div class="mx-auto text-center">
            {/* logShot */}
            <button class="btn btn-light p-2 m-2 shadow" type="button" onClick={this.handleNewShot}>Log Shot</button>
            {/* Reset form and close all collapses */}
            <button class="btn btn-light p-2 m-2 shadow" type="button" onClick={() => this.setState({showingGuide: false, showingNotes: false})}>Pull New Shot</button>
            </div>
                
            </div>
            
            
            
        </div>
        </>
        )
    }
}

export default Body;