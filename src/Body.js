import { render } from '@testing-library/react';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Overlay from 'react-bootstrap/Overlay';
import ShotForm from './ShotForm.js';
import { useState } from 'react';
import './App.scss';



function Body (props) {
    const emptyShot = {
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
        props.onNewShot(newShot);
        setNewShot({});
        setStep(3); 
    }
    const [step, setStep] = useState(0);
    console.log(step);


/* onChange={(e) => setNewShot({Dose : e.target.value})} */

    return (
        <div className="mx-auto text-center">
            <form onSubmit={handleSubmit} className="mx-auto text-center">
                <ShotForm newShot={newShot} handleSubmit={handleSubmit} handleInputChange={handleInputChange} handleCheckboxChange={handleCheckboxChange} setStep={setStep} step={step}/>
            </form>
            {/*
            <form onSubmit={handleSubmit} className="mx-auto text-center">
                <label for="Dose">Dose</label><br />
                <input class="shadow border" value={newShot.Dose} onChange={handleInputChange} type="text" id="Dose" name="Dose" placeholder="Dose..." /><br />
                 
                <label for="Yield">Yield</label><br />
                <input class="shadow border" value={newShot.Yield} onChange={handleInputChange} type="text" id="Yield" name="Yield" placeholder="Yield..." /><br /> 

                <label for="Time">Time</label><br />
                <input class="shadow border" value={newShot.Time} onChange={handleInputChange} type="text" id="Time" name="Time" placeholder="Time..." /><br /> 
                <button className="btn btn-primary m-3" type="submit">Click to add!</button>
            </form>
            */}
            
        </div>
    )
}

export default Body;