

function RecipeFormPageOne({newShot, handleInputChange, handleSubmit, setStep}){
      

    return(
        <>
            <label for="Bean">Bean</label><br />
            <input className="shadow border" value={newShot.Bean} onChange={handleInputChange} type="text" id="Bean" name="Bean" placeholder="Name/Origin..." /><br />

            <label for="Roaster">Roaster</label><br />
            <input className="shadow border" value={newShot.Roaster} onChange={handleInputChange} type="text" id="Roaster" name="Roaster" placeholder="Roaster..." /><br />

            <label for="Region">Region</label><br />
            <input className="shadow border" value={newShot.Region} onChange={handleInputChange} type="text" id="Region" name="Region" placeholder="Region/Farm..." /><br />

            <label for="Date">Date</label><br />
            <input className="shadow border" value={newShot.Date} onChange={handleInputChange} type="text" id="Date" name="Date" placeholder="dd/mm/yy..." /><br />

                    <button className="btn btn-primary m-2" type="button" onClick={() => setStep(1)}>next</button>

                    
        </>
    )
}

export default RecipeFormPageOne;