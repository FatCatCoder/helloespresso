import useShotFormStore from './store.js';
import './ShotFormPageOne.css';


function ShotFormPageOne({newShot, handleInputChange, handleSubmit, setStep, pullValidation}){
    const formErrors = useShotFormStore(state => state.formError);
    console.log(formErrors);
    return(
        <>
                
                    <label for="dose">Dose</label><br />
                    <input className="shadow border" value={newShot.dose} onChange={handleInputChange} type="number" id="dose" name="dose" placeholder="Dose..." maxlength="5" /><br />
                    {formErrors?.inner?.errors}
                    <label for="yield">Yield</label><br />
                    <input className="shadow border" value={newShot.yield} onChange={handleInputChange} type="number" id="yield" name="yield" placeholder="Yield..." maxlength="5" /><br /> 

                    <label for="time">Time</label><br />
                    <input className="shadow border" value={newShot.time} onChange={handleInputChange} type="number" id="time" name="time" placeholder="Time..." maxlength="5" /><br />

                    <label for="grind">Grind</label><br />
                    <input className="shadow border" value={newShot.grind} onChange={handleInputChange} type="number" id="grind" name="grind" placeholder="Grind Size..." maxlength="5" /><br /> 

                    <button className="btn btn-primary m-2" type="button" onClick={() => pullValidation()}>next</button>
                    {formErrors.keys() !== 0 ? formErrors.map(x => <p className="text-danger fs-6">{x}</p>): null}
                
                    
                </>
    )
}

export default ShotFormPageOne;