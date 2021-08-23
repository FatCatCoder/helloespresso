import {useShotFormStore} from '../../store.js';


function RecipeFormPageOne({newShot, handleInputChange, nextStep}){
    const formErrors = useShotFormStore(state => state.formError);

    return(
        <>
            <label for="bean">Bean</label><br />
            <input className="shadow border" value={newShot.bean} onChange={handleInputChange} type="text" id="bean" name="bean" placeholder="Name/Origin..." /><br />

            <label for="roaster">Roaster</label><br />
            <input className="shadow border" value={newShot.roaster} onChange={handleInputChange} type="text" id="roaster" name="roaster" placeholder="Roaster..." /><br />

            <label for="region">Region</label><br />
            <input className="shadow border" value={newShot.region} onChange={handleInputChange} type="text" id="region" name="region" placeholder="Region/Farm..." /><br />

            <label for="roastDate">Roasted</label><br />
            <input className="shadow border p-1" value={newShot.roastDate} onChange={handleInputChange} type="date" id="roastDate" name="roastDate" placeholder="dd/mm/yy..." /><br />

            <div className="container col-10 col-md-6 col-xl-3 mx-auto row">
                <div className="col-6">
                    <label className="" for="roast">Roast</label>
                    <select className="shadow border" id="roast" name="roast" value={newShot.roast} onChange={handleInputChange}>
                        <option value="" selected></option>
                        <option value="Light">Light</option>
                        <option value="Medium">Medium</option>
                        <option value="Dark">Dark</option>
                    </select><br/>
                </div>

                <div className="col-6">
                    <label className="" for="process">Process</label>
                    <select className="shadow border" id="process" name="process" value={newShot.process} onChange={handleInputChange}>
                        <option value="" selected></option>
                        <option value="Washed">Washed</option>
                        <option value="Natural">Natural</option>
                        <option value="Honey">Honey</option>
                    </select><br/>
                </div>
            </div>

            <button className="btn btn-primary m-2" type="button" onClick={() => nextStep(1)}>next</button>
            {formErrors.keys() !== 0 ? formErrors.map(x => <p className="text-danger fs-6">{x}</p>): null}
                    
        </>
    )
}

export default RecipeFormPageOne;