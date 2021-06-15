import useShotFormStore from './store.js';

function RecipeFormPageThree({newShot, handleInputChange, handleSubmit, setStep, setTodate}){
    const formErrors = useShotFormStore(state => state.formError);

    return(
        <>
        
        <label for="Grinder">Grinder</label><br />
        <input className="shadow border" value={newShot.Grinder} onChange={handleInputChange} type="text" id="Grinder" name="Grinder" placeholder="Grinder..." /><br />

        <label for="Machine">Machine</label><br />
        <input className="shadow border" value={newShot.Machine} onChange={handleInputChange} type="text" id="Machine" name="Machine" placeholder="La Marzocco..." /><br />

        <label for="Notes" className="form-label">Tasting Notes</label><br />
        <input className="shadow border" value={newShot.Notes} onChange={handleInputChange} type="text" id="Notes" name="Notes" placeholder="Tasting Notes..." /><br />

        <div className="container col-8 col-sm-8 col-md-6 col-lg- 4 col-xl-2 mx-auto text-center d-block">
            <div className="row">
                <label for="UserNotes" className="form-label">Additonal Notes</label><br />
                <textarea className="shadow border form-control mx-auto" value={newShot.UserNotes} onChange={handleInputChange} type="text" id="UserNotes" name="UserNotes" placeholder="Your Notes...was it difficult to dial? Not good with milk or lattes?" /><br />
            </div>
        </div>

        <button className="btn btn-primary m-2" type="button" onClick={() => setStep(1)}>back</button>
        <button className="btn btn-primary" type="submit" onClick={() => setTodate()}>Add Recipe!</button>
        {formErrors.keys() !== 0 ? formErrors.map(x => <p className="text-danger fs-6">{x}</p>): null}
                   
        </>
        
    )
}

export default RecipeFormPageThree;