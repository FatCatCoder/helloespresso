import { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom'; 
import RecipeBtnGrp from './RecipeBtnGrp.js';
import RecipeCard from './RecipeCard.js';
import RecipePage from './RecipePage.js';
import NewRecipe from './NewRecipe.js';
import RecipePagination from './RecipePagination.js';
import {useShotFormStore, globalStore} from './store.js';
import * as yup from 'yup';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useLocation,
    useParams,
    Redirect
  } from "react-router-dom";



function Recipes({newShot, setNewShot, handleCheckboxChange, handleInputChange, onNewShot, isAuth}){
    const history = useHistory();
    let location = useLocation();

    // for pagination
    const [myRecipes, setMyRecipes] = useState([{"page": 0, "recipes" : []}]);
    const [currPage, setCurrPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(8);
    const [totalRecipes, setTotalRecipes] = useState(8);

    const paginate = (pageNumber) => setCurrPage(pageNumber);


    // force refresh by state change of refresh.
    const [refresh, setRefresh] = useState(false);

    const schema = yup.object().shape({
        grinder: yup.string().required(),
        machine: yup.string().required(),
        tastingNotes: yup.string().required(),
        notes: yup.string()
    })

    const schemaData = {
        grinder: newShot.grinder,
        machine: newShot.machine,
        tastingNotes: newShot.tastingNotes,
        notes: newShot.notes
    }

    
    const formErrors = useShotFormStore(state => state.formError);
    const setFormErrors = useShotFormStore(state => state.setFormError);

    
    // before submitting recipe to server, check validation on form and on return redirect back to recipes homepage
    const handleSubmit = (event) => {
        event.preventDefault();
 
        schema.validate(schemaData, { abortEarly: false })
            .then(() => {
                setFormErrors([]); 
                                  
            })
            .then(() => {
                addRecipe(newShot)
                history.push('/recipes');
            })
            .catch(function (err) {
                setFormErrors(err.errors);
                console.log(Object.keys(err), err.name, err.value, err.path, err.type, err.errors, err.inner)
            })
        
    }

    //get userId from state
    const getUserId = globalStore(state => state.getUserIdFromJWT)

    // Add new recipe to server and upload local state with database returned object
    const addRecipe = async (recipe) => {
        recipe["userId"] = await getUserId();
        
        const res = await fetch('/recipes/new', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(recipe)
        })

        const data = await res.json();

        console.log(data);
        setMyRecipes([...myRecipes, data])
        setNewShot({});
    }


    
    // get recipes on load and refresh
    useEffect(() => {
        

        const getRecipes = async () => {

            const recipeAmount = await fetchRecipesAmount();
            setTotalRecipes(recipeAmount);

            const recipesFromServer = await fetchRecipes();
            //setMyRecipes(recipesFromServer.map(x => x));         
            setMyRecipes([{"page": 1, "recipes" : recipesFromServer}]);
        }
        getRecipes(); 
    }, [refresh])

    console.log(myRecipes);  
    // get total number of recipes
    const fetchRecipesAmount = async () => {
        const res = await fetch('/recipes')
        
        const data = await res.json();
        return data;
    }

    // get all recipes from server
    const fetchRecipes = async (thisPage = currPage, numOf = recipesPerPage) => {
        const res = await fetch('/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({"offsetPage": thisPage, "limitAmount": numOf})
        })
        console.log(res);

        const data = await res.json();
        
        console.log('fetchRecipes data', data)
        return data;
    }

    let match = useRouteMatch();

    console.log(myRecipes); 

    // pagination
    const indexOfLastPost = currPage * recipesPerPage;
    const indexOfFirstPost = indexOfLastPost - recipesPerPage;
    
    try{
        
    var currRecipes = myRecipes[currPage - 1]["recipes"]
    }
    catch{
        
        var currRecipes = myRecipes[0]["recipes"];
        //.slice(indexOfFirstPost, indexOfLastPost);
    }
    
    

    const displayRecipes = () => {
        console.log(currRecipes);
        console.log(myRecipes);
        return currRecipes.map((x, y) => <RecipeCard key={x.id} number={y} recipe={x}/>)
    }

    console.log(myRecipes)
    
    // <RecipePagination recipesPerPage={recipesPerPage} totalRecipes={myRecipes.length} paginate={paginate} />

    return(

        <div className="text-center pb-5">
            <Switch>
                <Route exact path={match.path}>
                    <h1 className="display-2">Recipes</h1>
                    <p>Here for all your espresso brewing needs.</p>
                    <RecipeBtnGrp  goTo={() => history.push(`${match.path}/new`)} refresh={refresh} setRefresh={setRefresh} />
                    <div className="container row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4 mx-auto">
                        {displayRecipes()}
                    </div>
                    <RecipePagination recipesPerPage={recipesPerPage} totalRecipes={totalRecipes} paginate={paginate} fetchRecipes={fetchRecipes} myRecipes={myRecipes} setMyRecipes={setMyRecipes} setCurrPage={setCurrPage} />
                </Route>

                <Route exact path={`/recipes/new`} 
                    render={props => isAuth ? 
                        (
                    <form onSubmit={handleSubmit} className="mx-auto text-center">
                        <NewRecipe add={addRecipe} onNewShot={onNewShot} newShot={newShot} setNewShot={setNewShot} handleCheckboxChange={handleCheckboxChange} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
                    </form>
                    )
                     : (<Redirect to={{pathname: "/login", state: {location: "/recipes", going: '/recipes/new'}}} />)} 
                />

                <Route path={`${match.path}/:id`}>
                    <RecipePage recipe={currRecipes}/>
                </Route>
            </Switch>
        </div>
    )
}

export default Recipes;