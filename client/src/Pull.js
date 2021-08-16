import {useState} from 'react';
import * as yup from 'yup';
import {useShotFormStore, globalStore} from './store.js';

// components 
import ShotForm from './ShotForm.js';
import Footer from './Footer.js';
import './App.scss';


function Pull ({newShot, setNewShot, handleCheckboxChange, handleInputChange, step, setStep}) {

     /*set default list of pulled shots */
     const [shotList, setShotList] = useState([{"dose":"20", "time":"30", "yield":"45", "grind": "10", "roaster": "Buddy Brew", "bean": "Ethiopia", "Bitter": true, "Strong": true, "notes": "too strong and overextracted, no tasting notes present."},
     {"dose":"19", "time":"30", "yield":"45", "grind": "10", "roaster": "Buddy Brew", "bean": "Ethiopia", "Sour": true, "Balanced": true, "Weak": true, "notes": "tastes like sour/sweet fruit, pulled a little watery."}])
 
     const addShotToList = (addShot) => {
         setShotList([...shotList, addShot]);
     };

    const schema = yup.object().shape({
        dose: yup.string().required().matches(/^([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[1-9]\d*)$/, "Dose is not a reasonable number"),
        yield: yup.string().required().matches(/^([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[1-9]\d*)$/, "Yield is not a reasonable number"),
        time: yup.string().required().matches(/^([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[1-9]\d*)$/, "Time is not a reasonable number"),
        grind: yup.string().required().matches(/^([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[1-9]\d*)$/, "Grind is not a reasonable number"),
      })
    
    
      const formErrors = useShotFormStore(state => state.formError);
      const setFormErrors = useShotFormStore(state => state.setFormError);
    
      const pullValidation = () => {
        schema.validate({
          dose: newShot.dose,
          yield: newShot.yield,
          time: newShot.time,
          grind: newShot.grind,
        }, { abortEarly: false }).then(function () {
          setFormErrors([]);
          setStep(1);
        }).catch(function (err) {
          setFormErrors(err.errors);
          //console.log(err.inner.find((x) => {return x.path == "dose"}).type)
          //console.log(err.inner.includes(err.inner.find((x) => {return x.path == "dose" && x.type == "required"})))
        })
      }
    
      const handleSubmit = (event) => {
          event.preventDefault();
          console.log(newShot.dose)
          schema.validate({
            dose: newShot.dose,
            yield: newShot.yield,
            time: newShot.time,
            grind: newShot.grind,
          }, { abortEarly: false }).then(function () {
            console.log('Submitted!')
            addShotToList(newShot);
            setNewShot({});
            setStep(2);
          }).catch(function (err) {
            setFormErrors(err.errors);
            console.log(Object.keys(err), err.name, err.value, err.path, err.type, err.errors, err.inner)
          })      
      }

      

    return (
        <div className="mx-auto text-center">
            <form onSubmit={handleSubmit} className="mx-auto text-center">
                <ShotForm pullValidation={pullValidation} newShot={newShot} handleSubmit={handleSubmit} handleInputChange={handleInputChange} handleCheckboxChange={handleCheckboxChange} setStep={setStep} step={step}/>
            </form>
            <Footer addShotToList={addShotToList} shotList={shotList} setShotList={setShotList} />
        </div>
    )
}

export default Pull;