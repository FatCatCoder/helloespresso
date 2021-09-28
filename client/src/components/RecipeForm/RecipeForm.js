import RecipeFormPageOne from './RecipeFormPageOne.js';
import RecipeFormPageTwo from './RecipeFormPageTwo.js';
import RecipeFormPageThree from './RecipeFormPageThree.js';
import { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom'; 
import {useShotFormStore} from '../../store.js';
import * as yup from 'yup';


function RecipeForm({getUserId, refresh, setRefresh}){
    // form data
    const [newShot, setNewShot] = useState({"dose":"", "time":"", "yield":"", "grind": "", "roaster": "", "bean": "", "notes": ""});
    const setFormErrors = useShotFormStore(state => state.setFormError);
    const Filter = require("badwords-filter");
    const filter = new Filter();


    // useEffect(() => {
    //     setFormErrors([]);
    //   }, [setFormErrors])

    // form onChange utils
    const handleCheckboxChange = (e) => {
        if(e.target.checked){
            setNewShot((prevProps) => ({
                ...prevProps,
                [e.target.name]: true
            }));
        }
        if(e.target.checked === false){
            // eslint-disable-next-line
            setNewShot((prevProps) => (delete prevProps[e.target.name], { 
                ...prevProps
            }));
        }
    };
    const handleInputChange = (e) => {
        setNewShot((prevProps) => ({
            ...prevProps,
            [e.target.name]: e.target.value
        }));
    };

    // routing and wizard form step number
    const history = useHistory();
    const [step, setStep] = useState(0);

    // Recipe Form validation schemas

    yup.addMethod(yup.string, 'noBadWords', function(x) {
        return this.test('bad-words-test', x ?? 'Invaild Word', function(value) {
            const { path, createError } = this;
            console.log(value, filter.isUnclean(value));
            
            return !filter.isUnclean(value) || createError({message: x, "value": value, path: path});
        });
    });

        // page one
    const schemaBean = yup.object().shape({
        bean: yup.string().ensure().noBadWords('Invaild word for bean').required(),
        roaster: yup.string().ensure().noBadWords('Invaild word for roaster').required(),
        region: yup.string().ensure().noBadWords('Invaild word for region').required(),
        roastDate: yup.date().required(),
        roast: yup.string().required(),
        process: yup.string().required(),
    })
    const schemaBeanData = {
        bean: newShot.bean,
        roaster: newShot.roaster,
        region: newShot.region,
        roastDate: newShot.roastDate,
        roast: newShot.roast,
        process: newShot.process
    }
        // page two
    const schemaDose = yup.object().shape({
        dose: yup.string().required().matches(/^([1-9]\d*(\.)\d*|0?(\.)\d*[1-9]\d*|[1-9]\d*)$/, "Dose is not a reasonable number"),
        yield: yup.string().required().matches(/^([1-9]\d*(\.)\d*|0?(\.)\d*[1-9]\d*|[1-9]\d*)$/, "Yield is not a reasonable number"),
        time: yup.string().required().matches(/^([1-9]\d*(\.)\d*|0?(\.)\d*[1-9]\d*|[1-9]\d*)$/, "Time is not a reasonable number"),
        grind: yup.string().required().matches(/^([1-9]\d*(\.)\d*|0?(\.)\d*[1-9]\d*|[1-9]\d*)$/, "Grind is not a reasonable number"),
      })
      const schemaDoseData = {
        dose: newShot.dose,
        yield: newShot.yield,
        time: newShot.time,
        grind: newShot.grind
    }
        // page three
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

    // before submitting recipe to server, check validation on form and on return redirect back to recipes homepage
    const handleSubmit = (event) => {
        event.preventDefault();
 
        schemaOther.validate(schemaOtherData, { abortEarly: false })
            .then(() => {
                setFormErrors([]);                 
            })
            .then(() => {
                addRecipe(newShot);
                setRefresh(!refresh);
                history.push('/recipes');
            })
            .catch(function (err) {
                setFormErrors(err.errors);
            })
        
    }


    // Add new recipe to server and upload local state with database returned object
    const addRecipe = async (recipe) => {
        recipe["userId"] = await getUserId();
        
        const res = await fetch('/api/recipes/new', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': localStorage.getItem('Authorization')
            },
            body: JSON.stringify(recipe)
        })

        const data = await res.json();
        setNewShot({});
    }

    const nextStep = (stepNum) => {
        let schema = {};
        let schemaData;
        
        if (step === 0){
            schema = schemaBean;
            schemaData = schemaBeanData;
        }
        else if (step === 1){
            schema = schemaDose;
            schemaData = schemaDoseData;
        }
        else{
            schema = schemaOther;
            schemaData = schemaOtherData;
        }
        schema.validate(schemaData, { abortEarly: false })
            .then(function () {
                console.log(stepNum)
                setFormErrors([]);
                setStep(stepNum);
            })
            .catch(function (err) {
                // console.log(err, err.name, err.errors, err.inner)
                console.log(Object.keys(err), err.name, err.value, err.path, err.type, err.errors, err.inner)
                setFormErrors(err.errors);
                
            })
      }

      useEffect(() => {
        setFormErrors([]);
        setNewShot({});
      }, [setFormErrors, setNewShot])


    function renderPage(){
        switch(step){
            case 0:
                return <RecipeFormPageOne nextStep={nextStep} newShot={newShot} handleSubmit={handleSubmit} handleInputChange={handleInputChange} />;
            case 1:
                return <RecipeFormPageTwo nextStep={nextStep} newShot={newShot} handleSubmit={handleSubmit} handleInputChange={handleInputChange} setStep={setStep} />;
            case 2:
                return <RecipeFormPageThree newShot={newShot} handleSubmit={handleSubmit} handleInputChange={handleInputChange} handleCheckboxChange={handleCheckboxChange} setStep={setStep} />;
            default:
                console.log('error on loading wizard form page, step not submitted');
    };
};

    
    return (
        <div className="container text-center">
            <h1 className="display-2 mb-0">New Recipe</h1>
            <div>
                <form onSubmit={handleSubmit} className="mx-auto">
                    {renderPage()}
                </form>
            </div>
        </div>
    )
}

export default RecipeForm;