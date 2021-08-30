import {useShotFormStore} from '../../store.js';


function RecipeFormPageThree({newShot, handleInputChange, setStep}){
    const formErrors = useShotFormStore(state => state.formError);

    return(
        <>
        
        <div className="col-7 col-md-4 col-lg-4 col-xl-2 mx-auto">
            <div className="row col-xl-8 mx-auto">
                <label htmlFor="grinder">Grinder</label><br />
                <input className={` shadow border form-control ${formErrors.includes('grinder is a required field')? 'input-error rounded': ''}`} value={newShot.grinder} onChange={handleInputChange} type="text" id="grinder" name="grinder" placeholder="Grinder..." /><br />
            </div>

            <div className="row col-xl-8 mx-auto">
                <label htmlFor="machine">Machine</label><br />
                <input className={` shadow border form-control ${formErrors.includes('machine is a required field')? 'input-error rounded': ''}`} value={newShot.machine} onChange={handleInputChange} type="text" id="machine" name="machine" placeholder="La Marzocco..." /><br />
            </div>

            <div className="row col-xl-8 mx-auto">
                <label htmlFor="tastingNotes" className="form-label">Tasting Notes</label><br />
                <input className={` shadow border form-control ${formErrors.includes('tastingNotes is a required field')? 'input-error rounded': ''}`} value={newShot.tastingNotes} onChange={handleInputChange} type="text" id="tastingNotes" name="tastingNotes" placeholder="Tasting Notes..." /><br />
            </div>
        </div>

        <div className="container col-8 col-sm-8 col-md-5 col-lg-4 col-xl-3 mx-auto text-center d-block">
            <div className="row">
                <label htmlFor="notes" className="form-label">Additional Notes</label><br />
                <textarea className="shadow border form-control mx-auto" value={newShot.notes} onChange={handleInputChange} type="text" id="notes" name="notes" placeholder="This is the freestyle section" /><br />
            </div>
        </div>

        

        <button className="btn btn-primary m-2" type="button" onClick={() => setStep(1)}>back</button>
        <button className="btn btn-primary" type="submit">Add Recipe!</button>
        
        {/* formErrors.keys() !== 0 ? formErrors.map(x => <p className="text-danger fs-6">{x}</p>): null */}
                   
        </>
        
    )
}

export default RecipeFormPageThree;