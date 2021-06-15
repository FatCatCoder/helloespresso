import ShotForm from './ShotForm.js';
import './App.scss';



function Body ({newShot, setNewShot, handleCheckboxChange, handleInputChange, handleSubmit, step, setStep, pullValidation}) {

    return (
        <div className="mx-auto text-center">
            <form onSubmit={handleSubmit} className="mx-auto text-center">
                <ShotForm pullValidation={pullValidation} newShot={newShot} handleSubmit={handleSubmit} handleInputChange={handleInputChange} handleCheckboxChange={handleCheckboxChange} setStep={setStep} step={step}/>
            </form>
        </div>
    )
}

export default Body;