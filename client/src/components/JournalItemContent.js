import { useEffect, useState } from 'react';
import { useParams } from "react-router";

// components
import Shot from './Shot.js';

function JournalItemContent({myEntries, deleteJournal}){
    let {id} = useParams();
    
    
    // data
    const [shotLog, setShotLog] = useState([]); 
    const myEntry = myEntries.find(x => x.id === id);
    console.log(myEntry);
    
    useEffect(() => {
        const abortController = new AbortController();
        let ignore = false;

        const fetchShots = async () => {
            const res = await fetch('/api/shots', {
                method: "POST",
                headers: {"Content-Type": "application/json",  "Authorization": localStorage.getItem('Authorization')},
                body: JSON.stringify({journal_id: id})
            })

            const data = await res.json();
            setShotLog(data);
        }

        if(!ignore){
            fetchShots();
        }

        return () => {
            ignore = true;
            abortController.abort();
        }; 
    }, [id])


    var pulls = shotLog.map((pull, index) =>
            <Shot key={index} listNum={index+1} dose={pull.dose} time={pull.time} yield={pull.yield} grind={pull.grind} roaster={pull.roaster} bean={pull.bean} notes={pull.notes} Sour={pull.Sour} Bitter={pull.Bitter} Weak={pull.Weak} Balanced={pull.Balanced} Strong={pull.Strong} /> 
        );

    // delete logic
    const [deleteCount, setDeleteCount] = useState(0);

    return(
        <div className="container text-center pb-5">
            <h1 className="display-4 text-capitalize">{ myEntry?.bean ?? 'bean'} ({myEntry?.region ?? 'region'}) - {myEntry?.roaster ?? 'roaster'}</h1>
            <h3 className="fs-4 fw-light text-muted text-capitalize">logged on: { new Date(myEntry?.postdate).toLocaleDateString()?? 'postdate'}</h3>

            <div className="container pb-3">
                {pulls}
            </div>

            <button className="btn btn-danger" onClick={deleteCount !== 1? () => {setTimeout(() => {setDeleteCount(deleteCount + 1)}, 500);}: () => deleteJournal(myEntry.id) }>{deleteCount === 0? 'Delete Journal': 'Are you sure?'}</button>
        </div>
    )
}

export default JournalItemContent;