import {useShotFormStore} from '../../store.js';
import '../../assets/FormStyles.css';

function RecipeFormPageTwo({newShot, handleInputChange, setStep, nextStep}){
    const formErrors = useShotFormStore(state => state.formError);

    return(
        <>
            <div className="col-7 col-md-4 col-lg-4 col-xl-2 mx-auto">
                <div class="row">
                    <label htmlFor="dose">Dose</label><br />
                    <input className={`shadow border placeholder-right form-control ${formErrors.includes('dose is a required field' || 'Dose is not a reasonable number')? 'input-error': ''}`} value={newShot.dose} onChange={handleInputChange} type="number" id="dose" name="dose" placeholder="(g)" /><br />
                </div>
                                    
                <div class="row">
                    <label htmlFor="yield">Yield</label><br />
                    <input className={`shadow border placeholder-right form-control ${formErrors.includes('yield is a required field' || 'Yield is not a reasonable number')? 'input-error': ''}`} value={newShot.yield} onChange={handleInputChange} type="number" id="yield" name="yield" placeholder="(ml)" /><br />
                </div>

                <div class="row">
                    <label htmlFor="time">Time</label><br />
                    <input className={`shadow border placeholder-right form-control ${formErrors.includes('time is a required field' || 'Time is not a reasonable number')? 'input-error': ''}`} value={newShot.time} onChange={handleInputChange} type="number" id="time" name="time" placeholder="(s)" /><br />
                </div>

                <div class="row">
                    <label htmlFor="grind">Grind</label><br />
                    <input className={`shadow border placeholder-right form-control ${formErrors.includes('grind is a required field' || 'Grind is not a reasonable number')? 'input-error': ''}`} value={newShot.grind} onChange={handleInputChange} type="number" id="grind" name="grind" placeholder="#" /><br />
                </div> 
            </div>

            <button className="btn btn-primary m-2 mx-auto" type="button" onClick={() => setStep(0)}>back</button>
            <button className="btn btn-primary m-2" type="button" onClick={() => nextStep(2)}>next</button>
            {/* formErrors.keys() !== 0 ? formErrors.map(x => <p className="text-danger fs-6">{x}</p>): null */}
        </>
    )
}

export default RecipeFormPageTwo;