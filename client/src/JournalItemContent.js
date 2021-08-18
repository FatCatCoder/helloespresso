import { useEffect, useState } from 'react';
import { useParams } from "react-router";
import axios from 'axios';

// components
import Shot from './Shot.js';

function JournalItemContent({myEntries}){
    let {id} = useParams();
    
    // data
    const [shotLog, setShotLog] = useState([]); 
    const myEntry = myEntries.find(x => x.id === id);
    
    const fetchShots = async () => {
        const res = await axios.post('/shots', {journal_id: id});
        const data = res.data;
        setShotLog(data);
    }

    // fetch data on load & refresh
    useEffect(() => {
        const abortController = new AbortController();
        let ignore = false;

        if(!ignore){
            fetchShots();
        }

        return () => {
            ignore = true;
            abortController.abort();
        }; 
    }, [])


    var pulls = shotLog.map((pull, index) =>
            <Shot key={index} listNum={index+1} dose={pull.dose} time={pull.time} yield={pull.yield} grind={pull.grind} roaster={pull.roaster} bean={pull.bean} notes={pull.notes} Sour={pull.Sour} Bitter={pull.Bitter} Weak={pull.Weak} Balanced={pull.Balanced} Strong={pull.Strong} /> 
        );

    return(
        <div className="container text-center pb-5">
            <h1 className="display-4 text-capitalize">{ myEntry?.bean ?? 'bean'} ({myEntry?.region ?? 'region'}) - {myEntry?.roaster ?? 'roaster'}</h1>
            <h3 className="fs-4 fw-light text-muted text-capitalize">logged on: { new Date(myEntry?.postdate).toLocaleDateString()?? 'postdate'}</h3>

            <div className="container">
                {pulls}
            </div>
        </div>
    )
}

export default JournalItemContent;