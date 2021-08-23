import {useShotFormStore} from '../../store.js';
import '../../assets/ShotFormPageOne.css';
import ToolsBox from './ToolsBox.js';


function ShotFormPageOne({newShot, handleInputChange, handleSubmit, setStep, pullValidation}){
    const formErrors = useShotFormStore(state => state.formError);
    return(
        <>
                    
                    <label htmlFor="dose">Dose</label><br />
                    <input className={` shadow border placeholder-right ${formErrors.includes('dose is a required field' || 'Dose is not a reasonable number')? 'input-error': ''}`} value={newShot.dose} onChange={handleInputChange} type="number" id="dose" name="dose" placeholder="(g)" maxLength="5" /><br />
                    {null}
                    <label htmlFor="yield">Yield</label><br />
                    <input className={` shadow border placeholder-right ${formErrors.includes('yield is a required field' || 'Yield is not a reasonable number')? 'input-error': ''}`} value={newShot.yield} onChange={handleInputChange} type="number" id="yield" name="yield" placeholder="(ml)" maxLength="5" /><br /> 

                    <label htmlFor="time">Time</label><br />
                    <input className={` shadow border placeholder-right ${formErrors.includes('time is a required field' || 'Time is not a reasonable number')? 'input-error': ''}`} value={newShot.time} onChange={handleInputChange} type="number" id="time" name="time" placeholder="(s)" maxLength="5" /><br />

                    <label htmlFor="grind">Grind</label><br />
                    <input className={` shadow border placeholder-right ${formErrors.includes('grind is a required field' || 'Grind is not a reasonable number')? 'input-error': ''}`} value={newShot.grind} onChange={handleInputChange} type="number" id="grind" name="grind" placeholder="#" maxLength="5" /><br /> 
                            

                    <button className="btn btn-primary m-2" type="button" onClick={() => pullValidation()}>next</button>
                    
                    <ToolsBox />         
                </>
    )
}

export default ShotFormPageOne;