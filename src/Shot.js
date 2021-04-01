import React from 'react';
import './App.scss';

class Shot extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isCollapsed: false
        }
    }
    render(){
        const { isCollapsed} = this.state;
        
        return(
           <div className="accordion-item text-center" id="accordion-shots">
               <h2 className="accordion-header">
                   <button className="accordion-button" type="button" onClick={() => this.setState({isCollapsed: !isCollapsed})}>
                       Espresso Shot #{this.props.listNum}
                       <span className="mx-auto pr-2">Dose: {this.props.Dose}g</span>
                       <span className="mx-auto pr-2">Time: {this.props.Time}s</span>
                       <span className="mx-auto pr-2">Yield: {this.props.Yield}ml</span>
                   </button>
               </h2>
               <div id="collapse1" className={`accordion-collapse collapse ${this.state.isCollapsed ? 'show':'' }` }>
                   <div className="accordion-body">
                       <div className="row">
                            <p className="col-3">Grind: <span className="col-3">{this.props.Grind}</span></p>
                            <p className="col-3">Grinder: <span className="col-3">{this.props.Grinder}</span></p>
                            <p className="col-3">Bean: <span className="col-3">{this.props.Bean}</span></p>
                            <p className="col-3">Roaster: <span className="col-3">{this.props.Roaster}</span></p>
                       </div>
                       <div className="row">
                            <p className="col-3">Method: <span className="col-3">{this.props.Method}</span></p>
                            <p className="col-3">Machine: <span className="col-3">{this.props.Machine}</span></p>
                            <p className="col-3">Style: <span className="col-3">{this.props.Style}</span></p>
                            <p className="col-3">Creamer: <span className="col-3">{this.props.Creamer}</span></p>
                       </div>
                       
                   </div>
               </div>
           </div> 
        )
    }
}

export default Shot;