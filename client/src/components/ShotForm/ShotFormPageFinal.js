import '../../assets/ShotFormPageFinal.scss';
import ExtractionWheel from './ExtractionWheel.js';


function ShotFormPageFinal({setStep, shotList}){
    const attribute = shotList[(shotList.length - 1)]?.attribute;
    const helpText = "Need help?";

    /*
    var helpText;
    var segment;

    if(attribute === 'sour'){
        helpText = 'We Suggest you grind finer to Extract more goodies';
    }
    else if(attribute === 'bitter'){
        helpText = 'We Suggest you grind coarser to Extract more goodies';
    }
    else if(attribute === 'weak'){
        helpText = 'We Suggest you increase dose to Extract more goodies';
    }
    else if(attribute === 'balanced'){
        helpText = 'We Suggest you grind finer to Extract more goodies';
    }
    else if(attribute === 'missing'){
        helpText = 'We Suggest you grind finer to Extract more goodies';
    }
    */

    return(
        <div className="container">
            <p className="display-6 text-center pb-4">{helpText}</p>

            <ExtractionWheel attribute={attribute} />
    
            <button className="btn btn-primary m-2" type="button" onClick={() => setStep(0)}>New Shot</button>
        </div>
    )
}

export default ShotFormPageFinal;