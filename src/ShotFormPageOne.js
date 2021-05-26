

function ShotFormPageOne({newShot, handleInputChange, handleSubmit, setStep}){
      

    return(
        <>
                
                    <label for="Dose">Dose</label><br />
                    <input className="shadow border" value={newShot.Dose} onChange={handleInputChange} type="text" id="Dose" name="Dose" placeholder="Dose..." required="required" maxlength="5" pattern="/^[+-]?\d+(\.\d+)?$/" /><br />
                    
                    <label for="Yield">Yield</label><br />
                    <input className="shadow border" value={newShot.Yield} onChange={handleInputChange} type="text" id="Yield" name="Yield" placeholder="Yield..." required="required" maxlength="5" /><br /> 

                    <label for="Time">Time</label><br />
                    <input className="shadow border" value={newShot.Time} onChange={handleInputChange} type="text" id="Time" name="Time" placeholder="Time..." required="required" maxlength="5" /><br />

                    <label for="Grind">Grind</label><br />
                    <input className="shadow border" value={newShot.Grind} onChange={handleInputChange} type="text" id="Grind" name="Grind" placeholder="Grind Size..." required="required" maxlength="5" /><br /> 

                    <button className="btn btn-primary m-2" type="button" onClick={() => setStep(1)}>next</button>
                
                    
                </>
    )
}

export default ShotFormPageOne;