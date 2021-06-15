import './ShotFormPageFinal.scss';
import React from 'react';
import ExtractionWheel from './ExtractionWheel.js';



function ShotFormPageFinal({newShot, handleInputChange, handleSubmit, setStep}){

    return(
        <>
            <div className="container">
                <p className="m-5 display-6 text-center pb-4">We Suggest you grind finer to Extract more goodies</p>
                {/*<img className="img-fluid w-50 mx-auto d-block" src="https://i.pinimg.com/originals/be/e1/a0/bee1a0b7c2397ea6727c9f96df196dae.png" />*/}

                <ExtractionWheel />
      
                <button className="btn btn-primary m-2" type="button" onClick={() => setStep(0)}>New Shot</button>
            </div>
                    
        </>
    )
}

export default ShotFormPageFinal;