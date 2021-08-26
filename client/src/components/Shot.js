import {useState} from 'react';


function Shot (props){
    const [isCollapsed, toggleCollapsed] = useState(false);
    const toggleShow = () => {
        toggleCollapsed(isCollapsed => !isCollapsed)
    }
    // look for ["Sour", "Bitter", "Weak", "Balanced", "Strong"] with val of true
    const tasteNotes = Object.keys(props).filter(val => props[val] === true).join(', ');
    
    return(
        <div className="accordion-item text-center" id="accordion-shots">
            <h2 className="accordion-header">
                <button className="accordion-button" type="button" onClick={toggleShow}>
                    Shot #{props.listNum}
                    <span className="mx-auto pr-2">Dose: {props.dose}g</span>
                    <span className="mx-auto pr-2">Yield: {props.yield}g</span>
                    <span className="mx-auto pr-2">Time: {props.time}s</span>
                    <span className="mx-auto pr-2">Grind: {props.grind}</span>
                </button>
            </h2>
            <div id="collapse1" className={`accordion-collapse collapse ${isCollapsed ? 'show':'' }` }>
                <div className="accordion-body">
                    <div className="row">
                        <div className="card p-0 col-12"><h6 className="card-header">Notes</h6><p className="card-body"><span className="row pb-2 text-primary fw-light fs-5 justify-content-center">{tasteNotes}</span>{props.notes}</p></div>
                    </div>
                </div>
            </div>
        </div> 
     )
}
    
export default Shot;