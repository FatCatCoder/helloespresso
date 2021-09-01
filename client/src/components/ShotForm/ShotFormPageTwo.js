

function ShotFormPageTwo({newShot, handleInputChange, setStep, handleCheckboxChange}){

    return(
        <div className="container col-10 col-xl-6 mx-auto text-center d-block">
            <h3 className="text-center">Was it?</h3>

            <div className="btn-group col-10 col-sm-8 col-md-4 col-lg-4 col-xl-4 text-center flex-wrap mx-auto d-flex justify-content-center" role="group" aria-label="Basic radio toggle button group">
                <input type="radio" checked={newShot.attribute === 'sour'} value={'sour'} onChange={handleCheckboxChange} className="btn-check" name="sour" id="btnradio1" autocomplete="off" />
                <label className="btn btn-outline-primary" for="btnradio1">Sour</label>

                <input type="radio" checked={newShot.attribute === 'bitter'} value={'bitter'} onChange={handleCheckboxChange} className="btn-check" name="bitter" id="btnradio2" autocomplete="off" />
                <label className="btn btn-outline-primary" for="btnradio2">Bitter / Ashy</label>

                <input type="radio" checked={newShot.attribute === 'weak'} value={'weak'} onChange={handleCheckboxChange} className="btn-check" name="weak" id="btnradio3" autocomplete="off" />
                <label className="btn btn-outline-primary" for="btnradio3">Bland / Weak</label>
                    
                <input type="radio" checked={newShot.attribute === 'balanced'} value={'balanced'} onChange={handleCheckboxChange} className="btn-check" name="balanced" id="btnradio4" autocomplete="off" />
                <label className="btn btn-outline-primary" for="btnradio4">Balanced</label>
                    
                <input type="radio" checked={newShot.attribute === 'missing'} value={'missing'} onChange={handleCheckboxChange} className="btn-check" name="missing" id="btnradio5" autocomplete="off" />
                <label className="btn btn-outline-primary" for="btnradio5">Missing?</label>

                <div className="row">
                    <label for="notes" className="form-label">Notes</label><br />
                    <textarea className="shadow border form-control" value={newShot.notes} onChange={handleInputChange} type="text" id="notes" name="notes" placeholder="Notes..." /><br />
                </div>
            </div>

            <button className="btn btn-primary m-2" type="button" onClick={() => setStep(0)}>back</button>
            <button className="btn btn-primary" type="submit">Pull Shot!</button>
                                
        </div>
    )
}

export default ShotFormPageTwo;