import {useShotFormStore} from './store.js';
import './ShotFormPageOne.css';
import ToolsBox from './components/ToolsBox.js';

// {formErrors.keys() !== 0 ? formErrors.map(x => <p className="text-danger fs-6">{x}</p>): null}

function ShotFormPageOne({newShot, handleInputChange, handleSubmit, setStep, pullValidation}){
    const formErrors = useShotFormStore(state => state.formError);
    console.log(formErrors);
    return(
        <>
                    
                    <label for="dose">Dose</label><br />
                    <input className={` shadow border placeholder-right ${formErrors.includes('dose is a required field' || 'Dose is not a reasonable number')? 'input-error': ''}`} value={newShot.dose} onChange={handleInputChange} type="number" id="dose" name="dose" placeholder="(g)" maxlength="5" /><br />
                    {null}
                    <label for="yield">Yield</label><br />
                    <input className={` shadow border placeholder-right ${formErrors.includes('yield is a required field' || 'Yield is not a reasonable number')? 'input-error': ''}`} value={newShot.yield} onChange={handleInputChange} type="number" id="yield" name="yield" placeholder="(ml)" maxlength="5" /><br /> 

                    <label for="time">Time</label><br />
                    <input className={` shadow border placeholder-right ${formErrors.includes('time is a required field' || 'Time is not a reasonable number')? 'input-error': ''}`} value={newShot.time} onChange={handleInputChange} type="number" id="time" name="time" placeholder="(s)" maxlength="5" /><br />

                    <label for="grind">Grind</label><br />
                    <input className={` shadow border placeholder-right ${formErrors.includes('grind is a required field' || 'Grind is not a reasonable number')? 'input-error': ''}`} value={newShot.grind} onChange={handleInputChange} type="number" id="grind" name="grind" placeholder="#" maxlength="5" /><br /> 
                            

                    <button className="btn btn-primary m-2" type="button" onClick={() => pullValidation()}>next</button>
                    <ToolsBox />         
                </>
    )
}

export default ShotFormPageOne;