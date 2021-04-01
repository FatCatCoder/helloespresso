import React from 'react';
import Shot from './Shot';
import App from './App';

class Footer extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            /*
            shotList: [{"Dose":"20", "Time":"30", "Yield":"45"},
                       {"Dose":"19.98", "Time":"32", "Yield":"41"},
                       {"Dose":"20.22", "Time":"26", "Yield":"39"}]
            */
        }
    }
    

    render(){
        const {shotList} = this.props;
        console.log(shotList);
        const pulls = shotList.map((pull, index) =>
            <Shot key={index} listNum={index+1} Dose={pull.Dose} Time={pull.Time} Yield={pull.Yield} Grind={pull.Grind} Grinder={pull.Grinder} Roaster={pull.Roaster} Bean={pull.Bean} Method={pull.Method} Machine={pull.Machine} Style={pull.Style} Creamer={pull.Creamer} /> 
        );
        

        return(
            <>
           <p class="display-5 text-center">Your Pulled Shots</p>
           <div class="container p-5 mb-5">
           <div class="accordion">
        
               {pulls}

           </div>
           </div>
           </>
        )
    }
}

export default Footer;