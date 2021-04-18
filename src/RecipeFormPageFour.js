

function RecipeFormPageFour({newShot, handleInputChange, handleSubmit, setStep, handleCheckboxChange}){

    return(
        <div className="container col-10 col-xl-6 mx-auto text-center d-block">
            <h3 className="text-center">How was it?</h3>

            <div className="container">
                <div className="row">
                    <label for="Notes" className="form-label">Tasting Notes</label><br />
                    <textarea className="shadow border form-control w-75 mx-auto" value={newShot.Notes} onChange={handleInputChange} type="text" id="Notes" name="Notes" placeholder="Tasting Notes..." /><br />
                </div>

                <div className="row">
                    <label for="UserNotes" className="form-label">Additonal Notes</label><br />
                    <textarea className="shadow border form-control w-75 mx-auto" value={newShot.UserNotes} onChange={handleInputChange} type="text" id="UserNotes" name="UserNotes" placeholder="Your Notes...was milk added, if so what kind? Difficult to dial? Not good for lattes, only espresso?" /><br />
                </div>
            </div>

            <button className="btn btn-primary m-2" type="button" onClick={() => setStep(2)}>back</button>
            <button className="btn btn-primary" type="submit">Add Recipe!</button>
                                
        </div>
    )
}

export default RecipeFormPageFour;