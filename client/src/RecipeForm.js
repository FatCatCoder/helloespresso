import RecipeFormPageOne from './RecipeFormPageOne.js';
import RecipeFormPageTwo from './RecipeFormPageTwo.js';
import RecipeFormPageThree from './RecipeFormPageThree.js';
import React, { useState, useEffect } from 'react';
import useShotFormStore from './store.js';
import * as yup from 'yup';
import { regex } from 'badwords-list';
var badwords = require('badwords-list');


function RecipeForm({newShot, handleInputChange, handleSubmit, handleCheckboxChange, setTodate}){
    const [step, setStep] = useState(0);

    const schemaBean = yup.object().shape({
        Bean: yup.string().required(),
        Roaster: yup.string().required(),
        Region: yup.string().required(),
        Date: yup.date()
    })
    const schemaBeanData = {
        Bean: newShot.Bean,
        Roaster: newShot.Roaster,
        Region: newShot.Region,
        Date: newShot.Date
    }

    const schemaDose = yup.object().shape({
        Dose: yup.string().required().matches(/^([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[1-9]\d*)$/, "Dose is not a reasonable number"),
        Yield: yup.string().required().matches(/^([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[1-9]\d*)$/, "Yield is not a reasonable number"),
        Time: yup.string().required().matches(/^([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[1-9]\d*)$/, "Time is not a reasonable number"),
        Grind: yup.string().required().matches(/^([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[1-9]\d*)$/, "Grind is not a reasonable number"),
      })

      const schemaDoseData = {
        Dose: newShot.Dose,
        Yield: newShot.Yield,
        Time: newShot.Time,
        Grind: newShot.Grind
    }

      const schemaOther = yup.object().shape({
        Grinder: yup.string().required(),
        Machine: yup.string().required(),
        Notes: yup.string().required(),
        UserNotes: yup.date()
    })

    const schemaOtherData = {
        Grinder: newShot.Grinder,
        Machine: newShot.Machine,
        Notes: newShot.Notes,
        UserNotes: newShot.UserNotes
    }

    const formErrors = useShotFormStore(state => state.formError);
    const setFormErrors = useShotFormStore(state => state.setFormError);
    

    const nextStep = (stepNum) => {
        var schema = {};
        var schemaData;
        
        if (step === 0){
            schema = schemaBean;
            schemaData = schemaBeanData;
            console.log(schemaData)
        }
        else if (step === 1){
            schema = schemaDose;
            schemaData = schemaDoseData;
            console.log(schemaData)
        }
        else{
            schema = schemaOther;
            schemaData = schemaOtherData;
            console.log(schemaData)
        }
        schema.validate(schemaData, { abortEarly: false })
            .then(function () {
                console.log(stepNum)
                setFormErrors([]);
                setStep(stepNum);
            })
            .catch(function (err) {
                setFormErrors(err.errors);
                console.log(Object.keys(err), err.name, err.value, err.path, err.type, err.errors, err.inner)
            })
      }

      useEffect(() => {
        setFormErrors([]);
      }, [])


    function renderPage(){
        switch(step){
            case 0:
                return <RecipeFormPageOne nextStep={nextStep} newShot={newShot} handleSubmit={handleSubmit} handleInputChange={handleInputChange} setStep={setStep} step={step}/>;
            case 1:
                return <RecipeFormPageTwo nextStep={nextStep} newShot={newShot} handleSubmit={handleSubmit} handleInputChange={handleInputChange} setStep={setStep} step={step}/>;
            case 2:
                return <RecipeFormPageThree setTodate={setTodate} newShot={newShot} handleSubmit={handleSubmit} handleInputChange={handleInputChange} handleCheckboxChange={handleCheckboxChange} setStep={setStep} step={step}/>;
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