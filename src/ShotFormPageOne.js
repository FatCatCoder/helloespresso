import useShotFormStore from './store.js';


function ShotFormPageOne({newShot, handleInputChange, handleSubmit, setStep}){
    const formErrors = useShotFormStore(state => state.formError);

    return(
        <>
                
                    <label for="Dose">Dose</label><br />
                    <input className="shadow border" value={newShot.Dose} onChange={handleInputChange} type="text" id="Dose" name="Dose" placeholder="Dose..." maxlength="5" /><br />
                    {formErrors?.inner?.errors}
                    <label for="Yield">Yield</label><br />
                    <input className="shadow border" value={newShot.Yield} onChange={handleInputChange} type="text" id="Yield" name="Yield" placeholder="Yield..." maxlength="5" /><br /> 

                    <label for="Time">Time</label><br />
                    <input className="shadow border" value={newShot.Time} onChange={handleInputChange} type="text" id="Time" name="Time" placeholder="Time..." maxlength="5" /><br />

                    <label for="Grind">Grind</label><br />
                    <input className="shadow border" value={newShot.Grind} onChange={handleInputChange} type="text" id="Grind" name="Grind" placeholder="Grind Size..." maxlength="5" /><br /> 

                    <button className="btn btn-primary m-2" type="button" onClick={() => setStep(1)}>next</button>
                    <button className="btn btn-primary" type="submit">Pull Shot!</button>
                    {formErrors.keys() !== 0 ? formErrors.map(x => <p className="text-danger fs-6">{x}</p>): null}
                
                    
                </>
    )
}

export default ShotFormPageOne;