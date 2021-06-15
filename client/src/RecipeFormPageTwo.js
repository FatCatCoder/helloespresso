import useShotFormStore from './store.js';
import './ShotFormPageOne.css';

function RecipeFormPageTwo({newShot, handleInputChange, handleSubmit, setStep, nextStep}){
    const formErrors = useShotFormStore(state => state.formError);

    return(
        <>
            <label for="Dose">Dose</label><br />
            <input className="shadow border" value={newShot.Dose} onChange={handleInputChange} type="number" id="Dose" name="Dose" placeholder="Dose..." /><br />
                                
            <label for="Yield">Yield</label><br />
            <input className="shadow border" value={newShot.Yield} onChange={handleInputChange} type="number" id="Yield" name="Yield" placeholder="Yield..." /><br /> 

            <label for="Time">Time</label><br />
            <input className="shadow border" value={newShot.Time} onChange={handleInputChange} type="number" id="Time" name="Time" placeholder="Time..." /><br /> 

            <label for="Grind">Grind</label><br />
            <input className="shadow border" value={newShot.Grind} onChange={handleInputChange} type="number" id="Grind" name="Grind" placeholder="Grind..." /><br /> 

            <button className="btn btn-primary m-2 mx-auto" type="button" onClick={() => setStep(0)}>back</button>
            <button className="btn btn-primary m-2" type="button" onClick={() => nextStep(2)}>next</button>
            {formErrors.keys() !== 0 ? formErrors.map(x => <p className="text-danger fs-6">{x}</p>): null}
        </>
    )
}

export default RecipeFormPageTwo;