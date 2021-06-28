import RecipeFormPageOne from './RecipeFormPageOne.js';
import RecipeFormPageTwo from './RecipeFormPageTwo.js';
import RecipeFormPageThree from './RecipeFormPageThree.js';
import React, { useState, useEffect } from 'react';
import {useShotFormStore} from './store.js';
import * as yup from 'yup';
import { regex } from 'badwords-list';
var badwords = require('badwords-list');


function RecipeForm({newShot, handleInputChange, handleSubmit, handleCheckboxChange}){
    const [step, setStep] = useState(0);

    const schemaBean = yup.object().shape({
        bean: yup.string().required(),
        roaster: yup.string().required(),
        region: yup.string().required(),
        roastDate: yup.date()
    })
    const schemaBeanData = {
        bean: newShot.bean,
        roaster: newShot.roaster,
        region: newShot.region,
        roastDate: newShot.roastDate
    }

    const schemaDose = yup.object().shape({
        dose: yup.string().required().matches(/^([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[1-9]\d*)$/, "Dose is not a reasonable number"),
        yield: yup.string().required().matches(/^([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[1-9]\d*)$/, "Yield is not a reasonable number"),
        time: yup.string().required().matches(/^([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[1-9]\d*)$/, "Time is not a reasonable number"),
        grind: yup.string().required().matches(/^([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[1-9]\d*)$/, "Grind is not a reasonable number"),
      })

      const schemaDoseData = {
        dose: newShot.dose,
        yield: newShot.yield,
        time: newShot.time,
        grind: newShot.grind
    }

      const schemaOther = yup.object().shape({
        grinder: yup.string().required(),
        machine: yup.string().required(),
        tastingNotes: yup.string().required(),
        notes: yup.string()
    })

    const schemaOtherData = {
        grinder: newShot.grinder,
        machine: newShot.machine,
        tastingNotes: newShot.tastingNotes,
        notes: newShot.notes
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
                return <RecipeFormPageThree newShot={newShot} handleSubmit={handleSubmit} handleInputChange={handleInputChange} handleCheckboxChange={handleCheckboxChange} setStep={setStep} step={step}/>;
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