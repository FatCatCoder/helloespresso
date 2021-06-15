

function ShotFormPageThree({newShot, handleInputChange, handleSubmit, setStep, handleCheckboxChange}){

    return(
        <div className="container col-10 col-xl-6 mx-auto text-center d-block">
            <h3 className="text-center">Was it?</h3>

            <div className="btn-group col-10 col-xl-6 text-center flex-wrap mx-auto d-flex justify-content-center" role="group" aria-label="Basic radio toggle button group">
                <input type="checkbox" value={'true'} onChange={handleCheckboxChange} className="btn-check" name="Sour" id="btnradio1" autocomplete="off" />
                <label className="btn btn-outline-primary" for="btnradio1">Sour</label>

                <input type="checkbox" value={'true'} onChange={handleCheckboxChange} className="btn-check" name="Bitter" id="btnradio2" autocomplete="off" />
                <label className="btn btn-outline-primary" for="btnradio2">Bitter / Ashy</label>

                <input type="checkbox" value={'true'} onChange={handleCheckboxChange} className="btn-check" name="Weak" id="btnradio3" autocomplete="off" />
                <label className="btn btn-outline-primary" for="btnradio3">Bland / Weak</label>
                    
                <input type="checkbox" value={'true'} onChange={handleCheckboxChange} className="btn-check" name="Balanced" id="btnradio4" autocomplete="off" />
                <label className="btn btn-outline-primary" for="btnradio4">Balanced</label>
                    
                <input type="checkbox" value={'true'} onChange={handleCheckboxChange} className="btn-check" name="Missing" id="btnradio5" autocomplete="off" />
                <label className="btn btn-outline-primary" for="btnradio5">Missing?</label>

                <div className="row">
                    <label for="Notes" className="form-label">Notes</label><br />
                    <textarea className="shadow border form-control" value={newShot.Notes} onChange={handleInputChange} type="text" id="Notes" name="Notes" placeholder="Notes..." /><br />
                </div>
            </div>

            <button className="btn btn-primary m-2" type="button" onClick={() => setStep(0)}>back</button>
            <button className="btn btn-primary" type="submit">Pull Shot!</button>
                                
        </div>
    )
}

export default ShotFormPageThree;