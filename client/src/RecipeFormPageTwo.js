import useShotFormStore from './store.js';
import './ShotFormPageOne.css';

function RecipeFormPageTwo({newShot, handleInputChange, handleSubmit, setStep, nextStep}){
    const formErrors = useShotFormStore(state => state.formError);

    return(
        <>
            <label for="dose">Dose</label><br />
            <input className="shadow border placeholder-right" value={newShot.dose} onChange={handleInputChange} type="number" id="dose" name="dose" placeholder="Dose..." /><br />
                                
            <label for="yield">Yield</label><br />
            <input className="shadow border placeholder-right" value={newShot.yield} onChange={handleInputChange} type="number" id="yield" name="yield" placeholder="Yield..." /><br /> 

            <label for="time">Time</label><br />
            <input className="shadow border placeholder-right" value={newShot.time} onChange={handleInputChange} type="number" id="time" name="time" placeholder="Time..." /><br /> 

            <label for="grind">Grind</label><br />
            <input className="shadow border placeholder-right" value={newShot.grind} onChange={handleInputChange} type="number" id="grind" name="grind" placeholder="Grind..." /><br /> 

            <button className="btn btn-primary m-2 mx-auto" type="button" onClick={() => setStep(0)}>back</button>
            <button className="btn btn-primary m-2" type="button" onClick={() => nextStep(2)}>next</button>
            {formErrors.keys() !== 0 ? formErrors.map(x => <p className="text-danger fs-6">{x}</p>): null}
        </>
    )
}

export default RecipeFormPageTwo;