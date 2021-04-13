import './RecipeTest.css'

function RecipeTest(props){

    return(
        <div className="container text-center mb-3">
            <div className="my-2">
                <h1 className="display-3">{props.recipe.Bean} - {props.recipe.Roaster}</h1>
                <h2 className="text-muted">Region: Africa{props.recipe.Region}</h2>
                <p className="text-muted fs-6">Roasted: 4/6/21{props.recipe.Date}</p>
            </div>

            <div className="container w-75 my-4">
                <div className="row bg-light border mx-auto justify-content-center">
                    <div className="col-4 col-md-3 col-xl-2 my-3">
                        <p className="btn p-2 shadow">Dose: {props.recipe.Dose}g</p>
                        <p className="btn p-2 shadow">Yield: {props.recipe.Yield}ml</p>
                    </div>
                    <div className="col-4 col-md-3 col-xl-2 my-3">
                        <p className="btn p-2 shadow">Time: {props.recipe.Time}s</p>
                        <p className="btn p-2 shadow">Grind: {props.recipe.Grind}</p>
                    </div>
                    <p><span className="text-primary">Tasting Notes:</span> baked peaches, citrus florals, demerara sugar</p>
                </div>
            </div>
            

            <div className="container" id="infoBlock">
                <div className="row">
                    <div className="card p-0 col-6 col-md-3"><h6 className="card-header">Grind </h6> <p className="card-body">{props.recipe.Grind}</p></div>
                    <div className="card p-0 col-6 col-md-3"><h6 className="card-header">Grinder </h6> <p className="card-body">{props.recipe.Grinder}</p></div>
                    <div className="card p-0 col-6 col-md-3"><h6 className="card-header">Bean </h6> <p className="card-body">{props.recipe.Bean}</p></div>
                    <div className="card p-0 col-6 col-md-3"><h6 className="card-header">Roaster </h6> <p className="card-body">{props.recipe.Roaster}</p></div>
                </div>

                <div className="row">
                    <div className="card p-0 col-6 col-md-3"><h6 className="card-header">Method </h6> <p className="card-body">{props.recipe.Method}</p></div>
                    <div className="card p-0 col-6 col-md-3"><h6 className="card-header">Machine </h6> <p className="card-body">{props.recipe.Machine}</p></div>
                    <div className="card p-0 col-6 col-md-3"><h6 className="card-header">Style </h6> <p className="card-body">{props.recipe.Style}</p></div>
                    <div className="card p-0 col-6 col-md-3"><h6 className="card-header">Creamer </h6> <p className="card-body">{props.recipe.Creamer}</p></div>
                </div>
            </div>

        </div>
    )
}

RecipeTest.defaultProps = {
    "recipe": {
    "Region": 'Africa'
    },
    "Region": 'Africa2'
  };

export default RecipeTest;