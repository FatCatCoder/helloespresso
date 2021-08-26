import {useShotFormStore} from '../../store.js';
import '../../assets/FormStyles.css';


function ShotFormPageOne({newShot, handleInputChange, handleSubmit, setStep, pullValidation}){
    const formErrors = useShotFormStore(state => state.formError);
    return(
        <>
                    
                    <div class="col-6 col-md-4 col-lg-2 col-xl-2 mx-auto">
                        <div class="row col-xl-8 mx-auto">
                            <label htmlFor="dose">Dose</label><br />
                            <input className={` shadow border form-control placeholder-right ${formErrors.includes('dose is a required field' || 'Dose is not a reasonable number')? 'input-error': ''}`} value={newShot.dose} onChange={handleInputChange} type="number" id="dose" name="dose" placeholder="(g)" maxLength="5" /><br />
                        </div>
        
                        <div class="row col-xl-8 mx-auto">
                            <label htmlFor="yield">Yield</label><br />
                            <input className={` shadow border form-control placeholder-right ${formErrors.includes('yield is a required field' || 'Yield is not a reasonable number')? 'input-error': ''}`} value={newShot.yield} onChange={handleInputChange} type="number" id="yield" name="yield" placeholder="(ml)" maxLength="5" /><br />
                        </div>

                        <div class="row col-xl-8 mx-auto">
                            <label htmlFor="time">Time</label><br />
                            <input className={` shadow border form-control placeholder-right ${formErrors.includes('time is a required field' || 'Time is not a reasonable number')? 'input-error': ''}`} value={newShot.time} onChange={handleInputChange} type="number" id="time" name="time" placeholder="(s)" maxLength="5" /><br />
                        </div>

                        <div class="row col-xl-8 mx-auto">
                            <label htmlFor="grind">Grind</label><br />
                            <input className={` shadow border form-control placeholder-right ${formErrors.includes('grind is a required field' || 'Grind is not a reasonable number')? 'input-error': ''}`} value={newShot.grind} onChange={handleInputChange} type="number" id="grind" name="grind" placeholder="#" maxLength="5" /><br />
                        </div>
                    </div>
                            

                    <button className="btn btn-primary m-2" type="button" onClick={() => pullValidation()}>next</button>        
                </>
    )
}

export default ShotFormPageOne;