import JournalFormPageOne from './JournalFormPageOne.js';
import JournalFormPageTwo from './JournalFormPageTwo.js';
import JournalFormPageThree from './JournalFormPageThree.js';
import JournalFormPageFour from './JournalFormPageFour.js';
import React, { useState } from 'react';

function JournalRecipeForm({newShot, handleInputChange, handleSubmit, handleCheckboxChange}){
    const [step, setStep] = useState(0);


    function renderPage(){
        switch(step){
            case 0:
                return <JournalFormPageOne newShot={newShot} handleSubmit={handleSubmit} handleInputChange={handleInputChange} setStep={setStep} step={step}/>;
            case 1:
                return <JournalFormPageTwo newShot={newShot} handleSubmit={handleSubmit} handleInputChange={handleInputChange} setStep={setStep} step={step}/>;
            case 2:
                return <JournalFormPageThree newShot={newShot} handleSubmit={handleSubmit} handleInputChange={handleInputChange} handleCheckboxChange={handleCheckboxChange} setStep={setStep} step={step}/>;
            case 3:
                return <JournalFormPageFour newShot={newShot} handleSubmit={handleSubmit} handleInputChange={handleInputChange} setStep={setStep} step={step}/>;
            default:
                console.log('error on loading wizrd form page, step not submitted');
    };
};

    
    return (
        <div>
            {renderPage()}
        </div>
    )
}

export default JournalRecipeForm;