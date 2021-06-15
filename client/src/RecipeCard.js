import {Link} from 'react-router-dom';

function RecipeCard({recipe}){
 
    return(
        <Link to={`/recipes/${recipe.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="col h-100">
            <div className="card h-100 shadow">

            <div className="container-fluid shadow-sm mt-2 p-2">
                        <h5 className="card-title">{recipe.Bean !== undefined ? recipe.Bean: 'Bean'} - {recipe.Roaster !== undefined ? recipe.Roaster: 'Roaster'}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{recipe.Region !== undefined ? recipe.Region: 'Region'}</h6>
                    </div>
                <div className="card-body">
                    
                    <p className="container smaller-text card-text">Notes: <span className="text-muted">{recipe.Notes !== undefined ? recipe.Notes: 'Notes'}</span></p>
                    <p className="card-text"><small className="text-muted">Date Roasted: {recipe.Date !== undefined ? recipe.Date: 'Date'}</small></p>
                </div>
            </div>
        </div>
        </Link>
    )
}

export default RecipeCard;