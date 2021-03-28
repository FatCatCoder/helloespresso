import React from 'react';
import Body from './Body.js'


class ShotForm extends React.component{
    constructor(props){
        super(props);
        this.state = {};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        /* set new values before submitting here 
        this.setState({}); */
    }
    handleSubmit(event){
        /* submit your data back up here 
        event.preventDefault(); */
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit} class="mx-auto text-center">
                
            <label for="dose">Dose</label><br />
            <input class="shadow border" type="text" id="dose" name="dose" placeholder="Dose..." /><br />
                
            <label for="time">Time</label><br />
            <input class="shadow border" type="text" id="time" name="time" placeholder="Time..." /><br />
                
            <label for="yield">Yield</label><br />
            <input class="shadow border" type="text" id="yield" name="yield" placeholder="Yield..." /><br />
                
            
            <button class="btn btn-light p-2 m-2 shadow" type="button">Click Me!</button>
            
            </form>
        )
    }
}

export default ShotForm;