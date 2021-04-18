import RecipeFormPageOne from './RecipeFormPageOne.js';
import RecipeFormPageTwo from './RecipeFormPageTwo.js';
import RecipeFormPageThree from './RecipeFormPageThree.js';
import RecipeFormPageFour from './RecipeFormPageFour.js';
import React, { useState } from 'react';

function RecipeForm({newShot, handleInputChange, handleSubmit, handleCheckboxChange}){
    const [step, setStep] = useState(0);


    function renderPage(){
        switch(step){
            case 0:
                return <RecipeFormPageOne newShot={newShot} handleSubmit={handleSubmit} handleInputChange={handleInputChange} setStep={setStep} step={step}/>;
            case 1:
                return <RecipeFormPageTwo newShot={newShot} handleSubmit={handleSubmit} handleInputChange={handleInputChange} setStep={setStep} step={step}/>;
            case 2:
                return <RecipeFormPageThree newShot={newShot} handleSubmit={handleSubmit} handleInputChange={handleInputChange} handleCheckboxChange={handleCheckboxChange} setStep={setStep} step={step}/>;
            case 3:
                return <RecipeFormPageFour newShot={newShot} handleSubmit={handleSubmit} handleInputChange={handleInputChange} setStep={setStep} step={step}/>;
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

export default RecipeForm;