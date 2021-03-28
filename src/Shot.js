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
           <div class="accordion-item text-center" id="accordion-shots">
               <h2 class="accordion-header">
                   <button class="accordion-button" type="button" onClick={() => this.setState({isCollapsed: !isCollapsed})} data-bs-toggle="collapse" data-bs-target='#collapse1'>
                       Espresso Shot #{this.props.listNum}
                   </button>
               </h2>
               <div id="collapse1" className={`accordion-collapse collapse ${this.state.isCollapsed ? 'show':'' }` } data-bs-parent="accordion-shots">
                   <div class="accordion-body row">
                       <p className="col-4">Dose: <span class="col-4">{this.props.Dose}g</span></p>
                       <p className="col-4">Time: <span class="col-4">{this.props.Time}s</span></p>
                       <p className="col-4">Yield: <span class="col-4">{this.props.Yield}ml</span></p>
                   </div>
               </div>
           </div> 
        )
    }
}

export default Shot;