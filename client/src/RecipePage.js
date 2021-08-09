import { useParams } from "react-router";
import {useEffect, useState} from 'react';
import {globalStore} from './store';
import './RecipePage.scss';
// .split('-').reverse().join('/')


function RecipePage(props){
    let {id} = useParams();
    
    const [liked, setLiked] = useState(false);
    //const [recipe, setRecipe] = useState(props.recipe? props.recipe.find(obj => obj.id == id): null);
    const [recipe, setRecipe] = useState(null);
    var recipeOBJ = '';
    var recipeUserId = recipe?.userId;
   
 
    // const fetchRecipe = async () => {
    //     const res = await fetch(`/recipes/${id}`)
    //     const data = await res.json()
    //     console.log('fetchRecipes data', data[0])
    //     return data[0];
    // }
    

    
   
        
        // convert ISO date to Locale Date
        var dateRoasted = () => {
            if (recipe !== null){
                return new Date(recipe.roastdate).toLocaleDateString();
            }
            return null;
        }

        var datePosted = () => {
            if (recipe !== null){
                return new Date(recipe.postdate).toLocaleDateString();
            }
            return null;
        }

        //var datePosted = new Date(recipe.postdate).toLocaleDateString();

        console.log(recipe)


    const user_id = globalStore(state => state.getUserIdFromJWT);
    


    // get initial isLiked from server
    const fetchLiked = async () => {
        const res = await fetch('/recipes/liked', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"recipe_id" : id, "user_id": user_id() })
        })
        const data = await res.json()
        console.log(data, res)
        
        setLiked(data.bool)
    }

    // check if logged and token is valid for grabbing user id
    const isValid = globalStore(state => state.checkValidToken); 
    const isLoggedIn = globalStore(state => state.isLoggedIn);

    // toggle like/ unlike on server and updates with json returned bool
    const bussinButton = async () => {
        const validity = await isValid();
        

        if(validity){
            
            const res = await fetch('/recipes/like', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"recipe_id" : id, "user_id": user_id() })
            })

            const data = await res.json()
            console.log(data, res)
            
            setLiked(data.bool)
        }
        else{
            alert('You Need To Be logged in to like!')
        }
    }

    

    useEffect(async () => {
        if (props.recipe === null) {
            const fetchRecipe = async () => {
                const res = await fetch(`/recipes/${id}`)
                const data = await res.json()
                console.log('fetchRecipes data', data[0])
                //await setRecipe(data[0])
                recipeUserId = data[0].userId
                return data[0];
            }
            setRecipe(await fetchRecipe()); 
            //var recipeOBJ = await fetchRecipe();
            console.log('NO data in state BAD')
            
        }
        else{
            setRecipe(props.recipe.find(obj => obj.id == id));
            console.log('data logged in from state OKAY')
        }
    }, [])

    



    // checks if is liked
    useEffect(async() => {
        fetchLiked();
    }, []);
    
    
    console.log(liked, isValid(), isLoggedIn, recipeUserId, recipeOBJ.userId);
    console.log((recipe !== null && user_id === recipe.userId) && isLoggedIn);
    
    //recipe !== null ? recipe.bean :recipeOBJ !== null ? recipeOBJ: ''
    
    return(
        <div className="container text-center mb-3">
            <div className="my-2">
                <h1 className="display-3 text-capitalize">{recipe !== null ? recipe.bean : '' } - {recipe !== null && recipe.roaster}</h1>
                <h2 className="text-muted text-capitalize">Region: {recipe !== null && recipe.region}</h2>
                
            </div>
            
            
            <div className="container col-xl-4">
                <div className="row">
                    <p className="text-muted col-6 fs-6">Roast: {recipe !== null && recipe.roast}</p>
                    <p className="text-muted col-6 fs-6">Process: {recipe !== null && recipe.process}</p>
                </div>

                <div className="row">
                    <p className="text-muted col-6 fs-6">Roasted: {recipe !== null && dateRoasted()}</p>
                    <p className="text-muted col-6 fs-6">Posted: {recipe !== null && datePosted()}</p>
                </div>
            </div>

            <button type="button" class={`btn btn-outline-danger ${liked === true ? 'active': ''}`} onClick={() => bussinButton()} aria-pressed="false">
                <i class="bi bi-heart-fill">Bussin' Button</i>     
            </button> 
            

            <div className="container col-xl-8 my-4">
                <div className="row bg-light border mx-auto justify-content-center">
                    <div className="col-4 col-sm-4 col-md-3 col-lg-3 col-xl-3 my-3">
                        <p className="bg-white p-2 py-2 shadow">Dose: {recipe !== null && recipe.dose}g</p>
                        <p className="bg-white p-2 py-2 shadow">Yield: {recipe !== null && recipe.yield}ml</p>
                    </div>
                    <div className="col-4 col-sm-4 col-md-3 col-lg-3 col-xl-3 my-3">
                        <p className="bg-white p-2 py-2 shadow">Time: {recipe !== null && recipe.time}s</p>
                        <p className="bg-white p-2 py-2 shadow">Grind: <span className="p-1">#{recipe !== null && recipe.grind}</span></p>
                    </div>
                    <p><span className="text-primary text-capitalize">Tasting Notes:</span> {recipe !== null && recipe.tastingnotes}</p>
                </div>
            </div>
            

            <div className="container col-xl-8 mx-auto" id="infoBlock">
                <div className="row">
                    <div className="card p-0 col-6 col-md-6"><h6 className="card-header">Machine </h6> <p className="card-body text-capitalize">{recipe !== null && recipe.machine}</p></div>
                    <div className="card p-0 col-6 col-md-6"><h6 className="card-header">Grinder </h6> <p className="card-body text-capitalize">{recipe !== null && recipe.grinder}</p></div>                  
                </div>

                <div className="row">
                    <div className="card p-0 col-12 col-md-12"><h6 className="card-header">Notes </h6> <p className="card-body">{recipe !== null && recipe.notes}</p></div>
                </div>
            </div>

        {(recipe !== null && user_id === recipe.userId) && isLoggedIn? 
        <button className="btn btn-danger mt-2">
            <span class="main-text">Delete Recipe</span>
            <span class="hover-text">Are You Sure?</span>
            </button>
        : null}
        </div>
    )
}

export default RecipePage;