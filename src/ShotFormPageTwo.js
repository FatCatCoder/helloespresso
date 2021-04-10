

function ShotFormPageTwo({newShot, handleInputChange, handleSubmit, setStep}){

    return(
        <>

                    <label for="Grind">Grind</label><br />
                    <input class="shadow border" value={newShot.Grind} onChange={handleInputChange} type="text" id="Grind" name="Grind" placeholder="Grind Size..." /><br />

                    <label for="Grinder">Grinder</label><br />
                    <input class="shadow border" value={newShot.Grinder} onChange={handleInputChange} type="text" id="Grinder" name="Grinder" placeholder="Grinder..." /><br />

                    <label for="Roaster">Roaster</label><br />
                    <input class="shadow border" value={newShot.Roaster} onChange={handleInputChange} type="text" id="Roaster" name="Roaster" placeholder="Roaster..." /><br />

                    <label for="Bean">Bean</label><br />
                    <input class="shadow border" value={newShot.Bean} onChange={handleInputChange} type="text" id="Bean" name="Bean" placeholder="Name/Origin..." /><br />

                    <label for="Method">Method</label><br />
                    <input class="shadow border" value={newShot.Method} onChange={handleInputChange} type="text" id="Method" name="Method" placeholder="Chemex/shots..." /><br />

                    <label for="Machine">Machine</label><br />
                    <input class="shadow border" value={newShot.Machine} onChange={handleInputChange} type="text" id="Machine" name="Machine" placeholder="La Marzocco..." /><br />

                    <label for="Style">Style</label><br />
                    <input class="shadow border" value={newShot.Style} onChange={handleInputChange} type="text" id="Style" name="Style" placeholder="espresso/latte..." /><br />

                    <label for="Creamer">Creamer</label><br />
                    <input class="shadow border" value={newShot.Creamer} onChange={handleInputChange} type="text" id="Creamer" name="Creamer" placeholder="oat/black..." /><br />

                    <button className="btn btn-primary m-2 mx-auto" type="button" onClick={() => setStep(0)}>back</button>
                    <button className="btn btn-primary m-2" type="button" onClick={() => setStep(2)}>next</button>
                    
                </>
    )
}

export default ShotFormPageTwo;