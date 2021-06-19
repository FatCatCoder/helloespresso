import Shot from './Shot.js';
import { useParams } from "react-router";

function JournalItemContent({myEntries}){
    let {id} = useParams();
    id -= 1;


    const pulls = myEntries[id].ShotLog.map((pull, index) =>
            <Shot key={index} listNum={index+1} dose={pull.dose} time={pull.time} yield={pull.yield} grind={pull.grind} roaster={pull.roaster} bean={pull.bean} notes={pull.notes} Sour={pull.Sour} Bitter={pull.Bitter} Weak={pull.Weak} Balanced={pull.Balanced} Strong={pull.Strong} /> 
        );

    return(
        <div className="container text-center pb-5">
            <h1 className="display-4">{myEntries[id].bean} ({myEntries[id].region}) - {myEntries[id].roaster}</h1>
            <h3 className="fs-4 fw-light text-muted">logged on: {myEntries[id].postDate}</h3>
            <div className="container">
                {pulls}
            </div>
        </div>
    )
}

export default JournalItemContent;