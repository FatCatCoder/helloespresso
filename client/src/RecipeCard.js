import {Link} from 'react-router-dom';

function RecipeCard({recipe, number}){
    const myDate = new Date(recipe.roastdate).toLocaleDateString();
    console.log(myDate)
 
    return(
        <Link to={`/recipes/${recipe.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="col h-100">
            <div className="card h-100 shadow">

            <div className="container-fluid shadow-sm mt-2 p-2">
                        <h5 className="card-title text-capitalize">{recipe.bean !== undefined ? recipe.bean: 'Bean'} - {recipe.roaster !== undefined ? recipe.roaster: 'Roaster'}</h5>
                        <h6 className="card-subtitle mb-2 text-muted text-capitalize">{recipe.region !== undefined ? recipe.region: 'Region'}</h6>
                    </div>
                <div className="card-body">
                    
                    <p className="container smaller-text card-text text-capitalize">Notes: <span className="text-muted">{recipe.tastingnotes !== undefined ? recipe.tastingnotes: 'Notes'}</span></p>
                    <p className="card-text"><small className="text-muted">Date Roasted: {myDate !== undefined ? myDate: 'Date'}</small></p>
                </div>
                <i class="bi bi-heart-fill text-danger border"></i>
            </div> 
        </div>
        </Link>
    )
}

export default RecipeCard;