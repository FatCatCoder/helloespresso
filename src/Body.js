import ShotForm from './ShotForm.js';
import './App.scss';



function Body ({newShot, setNewShot, handleCheckboxChange, handleInputChange, handleSubmit, step, setStep}) {

    return (
        <div className="mx-auto text-center">
            <form onSubmit={handleSubmit} className="mx-auto text-center">
                <ShotForm newShot={newShot} handleSubmit={handleSubmit} handleInputChange={handleInputChange} handleCheckboxChange={handleCheckboxChange} setStep={setStep} step={step}/>
            </form>
        </div>
    )
}

export default Body;