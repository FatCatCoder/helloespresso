import Shot from './Shot.js';

function JournalItemContent({shotList}){
    const pulls = shotList.map((pull, index) =>
            <Shot key={index} listNum={index+1} Dose={pull.Dose} Time={pull.Time} Yield={pull.Yield} Grind={pull.Grind} Grinder={pull.Grinder} Roaster={pull.Roaster} Bean={pull.Bean} Method={pull.Method} Machine={pull.Machine} Style={pull.Style} Creamer={pull.Creamer} Notes={pull.Notes} /> 
        );

    return(
        <div className="text-center pb-5">
            <h1>Ethiopia - Kuma</h1>
            <h3>logged on: 4/19/21</h3>
            <ul>
                {pulls}
            </ul>
        </div>
    )
}

export default JournalItemContent;