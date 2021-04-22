import Shot from './Shot.js';
import { useParams } from "react-router";

function JournalItemContent({myEntries}){
    let {id} = useParams();
    id -= 1;


    const pulls = myEntries[id].ShotLog.map((pull, index) =>
            <Shot key={index} listNum={index+1} Dose={pull.Dose} Time={pull.Time} Yield={pull.Yield} Grind={pull.Grind} Grinder={pull.Grinder} Roaster={pull.Roaster} Bean={pull.Bean} Method={pull.Method} Machine={pull.Machine} Style={pull.Style} Creamer={pull.Creamer} Notes={pull.Notes} Sour={pull.Sour} Bitter={pull.Bitter} Weak={pull.Weak} Balanced={pull.Balanced} Strong={pull.Strong} /> 
        );

    return(
        <div className="text-center pb-5">
            <h1 className="display-4">{myEntries[id].Bean} ({myEntries[id].Region}) - {myEntries[id].Roaster}</h1>
            <h3 className="fs-4 fw-light text-muted">logged on: {myEntries[id].Date}</h3>
            <div className="container">
                {pulls}
            </div>
        </div>
    )
}

export default JournalItemContent;