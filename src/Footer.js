import React from 'react';
import Shot from './Shot';
import AddToJournalModal from './AddToJournalModal.js';

import {useState} from 'react';
import './App.scss';

function Footer ({shotList, setShotList, handleModalSubmit, handleModalInputChange, journalEntry, setJournalEntry, todaysDate}){



    const pulls = shotList.map((pull, index) =>
            <Shot key={index} listNum={index+1} Dose={pull.Dose} Time={pull.Time} Yield={pull.Yield} Grind={pull.Grind} Grinder={pull.Grinder} Roaster={pull.Roaster} Bean={pull.Bean} Method={pull.Method} Machine={pull.Machine} Style={pull.Style} Creamer={pull.Creamer} Notes={pull.Notes} Sour={pull.Sour} Bitter={pull.Bitter} Weak={pull.Weak} Balanced={pull.Balanced} Strong={pull.Strong} /> 
        );

        
    

    return(
        <div id="Footer" className="text-center mx-auto">

            <div className="btn p-2 bi bi-chevron-compact-up" data-bs-toggle="offcanvas" data-bs-target="#shotlist" aria-controls="shotlist">
                <span className="row display-6 p-2" data-bs-toggle="offcanvas" data-bs-target="#shotlist" aria-controls="shotlist">Shot List</span>
            </div>
            

            <div className="offcanvas offcanvas-bottom container" tabindex="-1" id="shotlist" data-bs-backdrop="false" data-bs-scroll="false" aria-labelledby="shotlist">

                <div className="offcanvas-header pb-0">
                    <h5 className="offcanvas-title mx-auto col-12" id="shotlist">Shot List</h5>
                    <button type="button" className="btn-close text-reset my-auto" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>

            <div className="container row mx-auto col-5 col-sm-4 col-md-3 col-lg-3 col-xl-3">
                <div className="col-6">
                    <AddToJournalModal buttonLabel={'Log'} handleModalSubmit={handleModalSubmit} handleModalInputChange={handleModalInputChange} journalEntry={journalEntry} />
                    
                </div>
                <div className="col-6">
                    <button onClick={() => setShotList([])} className="mx-auto pe-1 ps-1 col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 btn btn-danger">clear</button>
                </div>
            </div>

                <div className="offcanvas-body small">
                    {pulls}
                </div>
                
            </div>
        </div>

 
        
        

    )
}

export default Footer;