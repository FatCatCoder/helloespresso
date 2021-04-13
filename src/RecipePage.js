import { useParams } from "react-router";

function RecipePage(props){
    let {id} = useParams();
    id -= 1;
    console.log('id:', id);
    console.log('prop data: ', props.recipe[id], 'name:', props.recipe[id].Bean, 'id:', props.recipe[id].id, 'typeof:', typeof(props.recipe));
    
    return(
        <div className="container text-center mb-3">
            <div className="my-2">
                <h1 className="display-3">{props.recipe[id].Bean} - {props.recipe[id].Roaster}</h1>
                <h2 className="text-muted">Region: {props.recipe[id].Region}</h2>
                <p className="text-muted fs-6">Roasted: {props.recipe[id].Date}</p>
            </div>

            <div className="container w-75 my-4">
                <div className="row bg-light border mx-auto justify-content-center">
                    <div className="col-4 col-md-3 col-xl-2 my-3">
                        <p className="btn p-2 shadow">Dose: {props.recipe[id].Dose}g</p>
                        <p className="btn p-2 shadow">Yield: {props.recipe[id].Yield}ml</p>
                    </div>
                    <div className="col-4 col-md-3 col-xl-2 my-3">
                        <p className="btn p-2 shadow">Time: {props.recipe[id].Time}s</p>
                        <p className="btn p-2 shadow">Grind: {props.recipe[id].Grind}</p>
                    </div>
                    <p><span className="text-primary">Tasting Notes:</span> {props.recipe[id].Notes}</p>
                </div>
            </div>
            

            <div className="container" id="infoBlock">
                <div className="row">
                    <div className="card p-0 col-6 col-md-3"><h6 className="card-header">Grind </h6> <p className="card-body">{props.recipe[id].Grind}</p></div>
                    <div className="card p-0 col-6 col-md-3"><h6 className="card-header">Grinder </h6> <p className="card-body">{props.recipe[id].Grinder}</p></div>
                    <div className="card p-0 col-6 col-md-3"><h6 className="card-header">Bean </h6> <p className="card-body">{props.recipe[id].Bean}</p></div>
                    <div className="card p-0 col-6 col-md-3"><h6 className="card-header">Roaster </h6> <p className="card-body">{props.recipe[id].Roaster}</p></div>
                </div>

                <div className="row">
                    <div className="card p-0 col-6 col-md-3"><h6 className="card-header">Method </h6> <p className="card-body">{props.recipe[id].Method}</p></div>
                    <div className="card p-0 col-6 col-md-3"><h6 className="card-header">Machine </h6> <p className="card-body">{props.recipe[id].Machine}</p></div>
                    <div className="card p-0 col-6 col-md-3"><h6 className="card-header">Style </h6> <p className="card-body">{props.recipe[id].Style}</p></div>
                    <div className="card p-0 col-6 col-md-3"><h6 className="card-header">Notes </h6> <p className="card-body">{props.recipe[id].UserNotes}</p></div>
                </div>
            </div>

        </div>
    )
}

export default RecipePage;