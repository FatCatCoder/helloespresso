import { useEffect } from 'react';

// components
import ShotFormPageOne from './ShotFormPageOne.js';
import ShotFormPageTwo from './ShotFormPageTwo.js';
import ShotFormPageFinal from './ShotFormPageFinal.js';
import {useShotFormStore} from '../../store.js';

function ShotForm({newShot, handleInputChange, handleSubmit, setStep, step, handleCheckboxChange, pullValidation, shotList}){
    const setFormErrors = useShotFormStore(state => state.setFormError);

    useEffect(() => {
        setFormErrors([]);
      }, [setFormErrors])

    function renderPage(){
        switch(step){
            case 0:
                return <ShotFormPageOne pullValidation={pullValidation} newShot={newShot} handleSubmit={handleSubmit} handleInputChange={handleInputChange} setStep={setStep} step={step}/>;
            case 1:
                return <ShotFormPageTwo newShot={newShot} handleSubmit={handleSubmit} handleInputChange={handleInputChange} handleCheckboxChange={handleCheckboxChange} setStep={setStep} step={step}/>;
            case 2:
                return <ShotFormPageFinal shotList={shotList} newShot={newShot} handleSubmit={handleSubmit} handleInputChange={handleInputChange} setStep={setStep} step={step}/>;
            default:
                console.log('error on loading wizard form page, step not submitted');
    };
};

    return (
        <div>
            {renderPage()}
        </div>
    )
}

export default ShotForm;