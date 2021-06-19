import useShotFormStore from './store.js';


function RecipeFormPageThree({newShot, handleInputChange, handleSubmit, setStep, setTodate}){
    const formErrors = useShotFormStore(state => state.formError);

    return(
        <>
        
        <label for="grinder">Grinder</label><br />
        <input className="shadow border" value={newShot.grinder} onChange={handleInputChange} type="text" id="grinder" name="grinder" placeholder="Grinder..." /><br />

        <label for="machine">Machine</label><br />
        <input className="shadow border" value={newShot.machine} onChange={handleInputChange} type="text" id="machine" name="machine" placeholder="La Marzocco..." /><br />

        <label for="tastingNotes" className="form-label">Tasting Notes</label><br />
        <input className="shadow border" value={newShot.tastingNotes} onChange={handleInputChange} type="text" id="tastingNotes" name="tastingNotes" placeholder="Tasting Notes..." /><br />

        <div className="container col-8 col-sm-8 col-md-6 col-lg-4 col-xl-3 mx-auto text-center d-block">
            <div className="row">
                <label for="notes" className="form-label">Additonal Notes</label><br />
                <textarea className="shadow border form-control mx-auto" value={newShot.notes} onChange={handleInputChange} type="text" id="notes" name="notes" placeholder="Your Notes...was it difficult to dial? Not good with milk or lattes?" /><br />
            </div>
        </div>

        

        <button className="btn btn-primary m-2" type="button" onClick={() => setStep(1)}>back</button>
        <button className="btn btn-primary" type="submit" onClick={() => setTodate()}>Add Recipe!</button>
        {formErrors.keys() !== 0 ? formErrors.map(x => <p className="text-danger fs-6">{x}</p>): null}
                   
        </>
        
    )
}

export default RecipeFormPageThree;