import useShotFormStore from './store.js';
import './ShotFormPageOne.css';


function ShotFormPageOne({newShot, handleInputChange, handleSubmit, setStep, pullValidation}){
    const formErrors = useShotFormStore(state => state.formError);
    console.log(formErrors);
    return(
        <>
                
                    <label for="Dose">Dose</label><br />
                    <input className="shadow border" value={newShot.Dose} onChange={handleInputChange} type="number" id="Dose" name="Dose" placeholder="Dose..." maxlength="5" /><br />
                    {formErrors?.inner?.errors}
                    <label for="Yield">Yield</label><br />
                    <input className="shadow border" value={newShot.Yield} onChange={handleInputChange} type="number" id="Yield" name="Yield" placeholder="Yield..." maxlength="5" /><br /> 

                    <label for="Time">Time</label><br />
                    <input className="shadow border" value={newShot.Time} onChange={handleInputChange} type="number" id="Time" name="Time" placeholder="Time..." maxlength="5" /><br />

                    <label for="Grind">Grind</label><br />
                    <input className="shadow border" value={newShot.Grind} onChange={handleInputChange} type="number" id="Grind" name="Grind" placeholder="Grind Size..." maxlength="5" /><br /> 

                    <button className="btn btn-primary m-2" type="button" onClick={() => pullValidation()}>next</button>
                    {formErrors.keys() !== 0 ? formErrors.map(x => <p className="text-danger fs-6">{x}</p>): null}
                
                    
                </>
    )
}

export default ShotFormPageOne;