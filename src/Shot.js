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
        const { isCollapsed } = this.state;
        
        return(
           <div class="accordion-item text-center" id="accordion-shots">
               <h2 class="accordion-header">
                   <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target='#collapse1'>
                       Espresso Shot #{this.props.listNum}
                   </button>
               </h2>
               <div id="collapse1" class="accordion-collapse collapse" data-bs-parent="accordion-shots">
                   <div class="accordion-body">
                       Dose: 20g ---- Time: 32s ---- Yield: 41.2g
                   </div>
               </div>
           </div> 
        )
    }
}

export default Shot;