import Shot from './Shot.js';
import { useEffect, useState } from 'react';
import { useParams } from "react-router";
import axios from 'axios';

function JournalItemContent({myEntries}){
    let {id} = useParams();
   
    const [shotLog, setShotLog] = useState([]); 
    const myEntry = myEntries.find(x => x.id === id);

    useEffect(() => {
        fetchShots();
    }, [])

    const fetchShots = async () => {
        console.log('fetchshots', id) 
        const res = await axios.post('/shots', {journal_id: id});
        console.log('res', res)
        const data = res.data;
        console.log(data);
        //setMyEntries(data.map(x => x))
        setShotLog(data);
    }

    var pulls = shotLog.map((pull, index) =>
            <Shot key={index} listNum={index+1} dose={pull.dose} time={pull.time} yield={pull.yield} grind={pull.grind} roaster={pull.roaster} bean={pull.bean} notes={pull.notes} Sour={pull.Sour} Bitter={pull.Bitter} Weak={pull.Weak} Balanced={pull.Balanced} Strong={pull.Strong} /> 
        );

    return(
        <div className="container text-center pb-5">
            <h1 className="display-4">{myEntry.bean} ({myEntry.region}) - {myEntry.roaster}</h1>
            <h3 className="fs-4 fw-light text-muted">logged on: {myEntry.postDate}</h3>
            <div className="container">
                {pulls}
            </div>
        </div>
    )
}

export default JournalItemContent;