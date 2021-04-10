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
                    Espresso Shot #{props.listNum}
                    <span className="mx-auto pr-2">Dose: {props.Dose}g</span>
                    <span className="mx-auto pr-2">Time: {props.Time}s</span>
                    <span className="mx-auto pr-2">Yield: {props.Yield}ml</span>
                </button>
            </h2>
            <div id="collapse1" className={`accordion-collapse collapse ${isCollapsed ? 'show':'' }` }>
                <div className="accordion-body">

                <div className="row">
                         <div className="card p-0 col-3"><h6 className="card-header">Grind </h6> <p className="card-body">{props.Grind}</p></div>
                         <div className="card p-0 col-3"><h6 className="card-header">Grinder </h6> <p className="card-body">{props.Grinder}</p></div>
                         <div className="card p-0 col-3"><h6 className="card-header">Bean </h6> <p className="card-body">{props.Bean}</p></div>
                         <div className="card p-0 col-3"><h6 className="card-header">Roaster </h6> <p className="card-body">{props.Roaster}</p></div>
                    </div>
                    <div className="row">
                         <div className="card p-0 col-3"><h6 className="card-header">Method </h6> <p className="card-body">{props.Method}</p></div>
                         <div className="card p-0 col-3"><h6 className="card-header">Machine </h6> <p className="card-body">{props.Machine}</p></div>
                         <div className="card p-0 col-3"><h6 className="card-header">Style </h6> <p className="card-body">{props.Style}</p></div>
                         <div className="card p-0 col-3"><h6 className="card-header">Creamer </h6> <p className="card-body">{props.Creamer}</p></div>
                    </div>
                </div>
            </div>
        </div> 
     )
}
    
export default Shot;