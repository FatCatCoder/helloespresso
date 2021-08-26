import {useShotFormStore} from '../../store.js';
import '../../assets/FormStyles.css'


function RecipeFormPageOne({newShot, handleInputChange, nextStep}){
    const formErrors = useShotFormStore(state => state.formError);
    console.log(formErrors);

    return(
        <>
            <div className="col-7 col-md-4 col-lg-4 col-xl-2 mx-auto">
                <div className="row col-xl-8 mx-auto">
                    <label htmlFor="bean" className="">Bean</label><br />
                    <input className={` shadow border form-control ${formErrors.includes('bean is a required field')? 'input-error rounded': ''}`} value={newShot.bean} onChange={handleInputChange} type="text" id="bean" name="bean" placeholder="Name/Origin..." /><br />
                </div>

                <div className="row col-xl-8 mx-auto">
                    <label htmlFor="roaster" className="">Roaster</label><br />
                    <input className={` shadow border form-control ${formErrors.includes('roaster is a required field')? 'input-error rounded': ''}`} value={newShot.roaster} onChange={handleInputChange} type="text" id="roaster" name="roaster" placeholder="Roaster..." /><br />
                </div>

                <div className="row col-xl-8 mx-auto">
                    <label htmlFor="region" className="">Region</label><br />
                    <input className={` shadow border form-control ${formErrors.includes('region is a required field')? 'input-error rounded': ''}`} value={newShot.region} onChange={handleInputChange} type="text" id="region" name="region" placeholder="Region/Farm..." /><br />
                </div>

                <div className="row col-xl-8 mx-auto">
                    <label htmlFor="roastDate" className="">Roast date</label><br />
                    <input className={` shadow border p-1 w-100 mx-auto form-control  ${formErrors.includes('roastDate is a required field')? 'input-error rounded': ''}`} value={newShot.roastDate} onChange={handleInputChange} type="date" id="roastDate" name="roastDate" /><br />
                </div>
            </div>

            <div className="row container col-10 col-md-6 col-lg-5 col-xl-3 mx-auto">
                <div className="col-6">
                    <label className="" htmlFor="roast">Roast</label>
                    <select className={` shadow border form-select ${formErrors.includes('roast is a required field')? 'input-error rounded': ''}`} id="roast" name="roast" value={newShot.roast} onChange={handleInputChange}>
                        <option value="" selected></option>
                        <option value="Light">Light</option>
                        <option value="Medium">Medium</option>
                        <option value="Dark">Dark</option>
                    </select><br/>
                </div>

                <div className="col-6">
                    <label className="" htmlFor="process">Process</label>
                    <select className={` shadow border form-select ${formErrors.includes('process is a required field')? 'input-error rounded': ''}`} id="process" name="process" value={newShot.process} onChange={handleInputChange}>
                        <option value="" selected></option>
                        <option value="Washed">Washed</option>
                        <option value="Natural">Natural</option>
                        <option value="Honey">Honey</option>
                    </select><br/>
                </div>
            </div>

            <button className="btn btn-primary m-2" type="button" onClick={() => nextStep(1)}>next</button>
            {/* formErrors.keys() !== 0 ? formErrors.map(x => <p className="text-danger fs-6">{x}</p>): null */}
                   
        </>
    )
}

export default RecipeFormPageOne;