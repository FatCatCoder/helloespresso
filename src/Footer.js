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
            <Shot key={index} listNum={index+1} Dose={pull.Dose} Time={pull.Time} Yield={pull.Yield} /> 
        );
        

        return(
            <>
           <p class="display-5 text-center">Your Pulled Shots</p>
           <div class="container p-5 mb-5">
           <div class="accordion">
               {/*
               <Shot listNum="1" Dose="20" Time="30" Yield="45"/>
               <Shot listNum="2" Dose="20.14" Time="31" Yield="42"/>
               <Shot listNum="3" Dose="20.11" Time="30" Yield="42"/>
               */}
               {pulls}

           </div>
           </div>
           </>
        )
    }
}

export default Footer;