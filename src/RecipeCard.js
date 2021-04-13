import {Link} from 'react-router-dom';

function RecipeCard({recipe}){
 
    return(
        <Link to={`/journal/${recipe.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="col h-100">
            <div class="card h-100 shadow">

            <div className="container-fluid shadow-sm mt-2 p-2">
                        <h5 class="card-title">{recipe.Bean !== undefined ? recipe.Bean: 'Bean'} - {recipe.Roaster !== undefined ? recipe.Roaster: 'Roaster'}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{recipe.Region !== undefined ? recipe.Region: 'Region'}</h6>
                    </div>
                <div class="card-body">
                    
                    <p class="container smaller-text card-text">Notes: <span className="text-muted">{recipe.Notes !== undefined ? recipe.Notes: 'Notes'}</span></p>
                    <p class="card-text"><small class="text-muted">Date Roasted: {recipe.Date !== undefined ? recipe.Date: 'Date'}</small></p>
                </div>
            </div>
        </div>
        </Link>
    )
}

export default RecipeCard;