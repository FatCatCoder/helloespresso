import { useState } from 'react';
import JournalRecipeForm from './JournalRecipeForm.js';

function NewRecipe(props){

    return(
        <div className="container text-center">
            <h1 className="display-2">New Recipe</h1>
            <div>
            <JournalRecipeForm newShot={props.newShot} handleSubmit={props.handleSubmit} handleInputChange={props.handleInputChange}
            handleCheckboxChange={props.handleCheckboxChange} setStep={props.setStep} step={props.step} />
            </div>
        </div>
    )
}

export default NewRecipe;