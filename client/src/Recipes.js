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

  import LoadingSpinner from './components/LoadingSpinner.js';



function Recipes({newShot, setNewShot, handleCheckboxChange, handleInputChange, onNewShot, isAuth}){
    const history = useHistory();
    let location = useLocation();

    // for pagination
    //const [myRecipes, setMyRecipes] = useState([{"page": 0, "recipes" : []}]);
    const [myRecipes, setMyRecipes] = useState(null);
    const [currPage, setCurrPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(8);
    const [totalRecipes, setTotalRecipes] = useState(8);

    const [isLoading, setIsLoading] = useState(true);

    const paginate = (pageNumber) => setCurrPage(pageNumber);


    // force refresh by state change of refresh.
    const [refresh, setRefresh] = useState(false);

    // sorting and filtering data
    const [sortFilters, setSortFilters] = useState({});

    // RecipeBtnGroup toggle states
    const [togglePost, setTogglePost] = useState(false);
    const [toggleRoast, setToggleRoast] = useState(false);


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
        setIsLoading(false) 
    }, [refresh])

    console.log(myRecipes);  

    // GET total number of recipes
    const fetchRecipesAmount = async () => {
        const res = await fetch('/recipes')
        
        const data = await res.json();
        return data;
    }

    // POST get recipes from server based on page and amount
    const fetchRecipes = async (thisPage = currPage, numOf = recipesPerPage) => {
        console.log(sortFilters?.sortBy);
        if(sortFilters.sortBy == null){
            setSortFilters((filters) => ({...filters, "sortBy": "postdate DESC"}))
        }
        const res = await fetch('/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({"offsetPage": thisPage - 1, "limitAmount": numOf, "sortFilters": sortFilters})
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

    // ugly bad stupid awful code please forgive me until I refactor....
    //
    // checks for initial component render as null and sets state to not display
    // waits until useEffect loads data and on second render returns currRecipes with Recipe data
    // on page change catches null again and returns null so component does not crash on dependent state
    // after page change updates its state and renders currRecipes returns proper slice of recipes
    //
    if(myRecipes){
        try{
        //var currRecipes = myRecipes[currPage - 1]["recipes"]
        var currRecipes = myRecipes.find(x => x["page"] === currPage)["recipes"]
        }
        catch{
            var currRecipes = null;
        }
    }
    else{
        var currRecipes = null;
    }
    

    const displayRecipes = () => {
        console.log(currRecipes);
        console.log(myRecipes);
        return currRecipes.map((x, y) => <RecipeCard key={x.id} number={y} recipe={x}/>)
    }

    console.log(myRecipes)
    
    // <RecipePagination recipesPerPage={recipesPerPage} totalRecipes={myRecipes.length} paginate={paginate} />
    //   {isLoading? displayRecipes(): <LoadingSpinner />}

    return(

        <div className="text-center pb-5">
            <Switch>
                <Route exact path={match.path}>
                    <h1 className="display-2">Recipes</h1>
                    <p>Here for all your espresso brewing needs.</p>
                    <RecipeBtnGrp  goTo={() => history.push(`${match.path}/new`)} refresh={refresh} setRefresh={setRefresh} sortFilters={sortFilters} setSortFilters={setSortFilters} togglePost={togglePost} setTogglePost={setTogglePost} toggleRoast={toggleRoast} setToggleRoast={setToggleRoast} fetchRecipes={fetchRecipes} />

                    <div className="container row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4 mx-auto">
                        {currRecipes && displayRecipes()}
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