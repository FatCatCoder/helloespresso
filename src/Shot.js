import {useState} from 'react';
import './App.scss';

function Shot (props){
    const [isCollapsed, toggleCollapsed] = useState(false);
    const toggleShow = () => {
        toggleCollapsed(isCollapsed => !isCollapsed)
    }

    return(
        <div className="accordion-item text-center" id="accordion-shots">
            <h2 className="accordion-header">
                <button className="accordion-button" type="button" onClick={toggleShow}>
                    Shot #{props.listNum}
                    <span className="mx-auto pr-2">Dose: {props.Dose}g</span>
                    <span className="mx-auto pr-2">Yield: {props.Yield}g</span>
                    <span className="mx-auto pr-2">Time: {props.Time}s</span>
                    <span className="mx-auto pr-2">Grind: {props.Grind}</span>
                </button>
            </h2>
            <div id="collapse1" className={`accordion-collapse collapse ${isCollapsed ? 'show':'' }` }>
                <div className="accordion-body">
                    <div className="row">
                        <div className="card p-0 col-12"><h6 className="card-header">Notes</h6><p className="card-body">{props.Notes}</p></div>
                    </div>
                </div>
            </div>
        </div> 
     )
}
    
export default Shot;