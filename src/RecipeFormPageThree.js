

function RecipeFormPageThree({newShot, handleInputChange, handleSubmit, setStep}){

    return(
        <>
        <label for="Grinder">Grinder</label><br />
        <input className="shadow border" value={newShot.Grinder} onChange={handleInputChange} type="text" id="Grinder" name="Grinder" placeholder="Grinder..." /><br />

        <label for="Method">Method</label><br />
        <input className="shadow border" value={newShot.Method} onChange={handleInputChange} type="text" id="Method" name="Method" placeholder="Chemex/shots..." /><br />

        <label for="Machine">Machine</label><br />
        <input className="shadow border" value={newShot.Machine} onChange={handleInputChange} type="text" id="Machine" name="Machine" placeholder="La Marzocco..." /><br />

        <label for="Style">Style</label><br />
        <input className="shadow border" value={newShot.Style} onChange={handleInputChange} type="text" id="Style" name="Style" placeholder="espresso/latte..." /><br />


                    <button className="btn btn-primary m-2 mx-auto" type="button" onClick={() => setStep(1)}>back</button>
                    <button className="btn btn-primary m-2" type="button" onClick={() => setStep(3)}>next</button>
                    
        </>
    )
}

export default RecipeFormPageThree;