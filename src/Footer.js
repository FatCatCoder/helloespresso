import React from 'react';
import Shot from './Shot';

class Footer extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return(
            <>
           <p class="display-5 text-center">Your Pulled Shots</p>
           <div class="container p-5 mb-5">
           <div class="accordion">
               <Shot listNum="1"/>
               <Shot listNum="2"/>
               <Shot listNum="3"/>
           </div>
           </div>
           </>
        )
    }
}

export default Footer;