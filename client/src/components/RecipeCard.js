import {Link} from 'react-router-dom';

function RecipeCard({recipe, animation}){
    return(
        <Link to={`/recipes/${recipe.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="col h-100">
            <div className={`card h-100 shadow ${animation}`}>

            <div className="container-fluid shadow-sm mt-2 p-2">
                        <h5 className="card-title text-capitalize">{recipe.bean !== undefined ? recipe.bean: 'Hello'} - {recipe.roaster !== undefined ? recipe.roaster: 'Espresso'}</h5>
                        <h6 className="card-subtitle mb-2 text-muted text-capitalize">{recipe.region !== undefined ? recipe.region: 'Loading...'}</h6>
                    </div>
                <div className="card-body">
                    
                    <p className="container smaller-text card-text text-capitalize">Notes: <span className="text-muted">{recipe.tastingnotes !== undefined ? recipe.tastingnotes: 'Good Vibes & Patience'}</span></p>
                    <p className="card-text"><small className="text-muted">Date Roasted: {recipe.roastdate !== undefined ? new Date(recipe.roastdate).toLocaleDateString(): 'Any time now...'}</small></p>
                </div>
                <i className="bi bi-heart-fill text-danger border"> x {recipe?.likes ?? recipe.popular ?? 0} </i>
            </div> 
        </div>
        </Link>
    )
}

export default RecipeCard;