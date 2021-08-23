// modules
import { useState, useEffect, useCallback  } from 'react';
import {useHistory} from 'react-router-dom'; 
import {globalStore} from '../store.js';
import {
    Switch,
    Route,
    useRouteMatch,
    Redirect
  } from "react-router-dom";

// components
import RecipeBtnGrp from '../components/RecipeBtnGrp.js';
import RecipeCard from '../components/RecipeCard.js';
import RecipePage from '../components/RecipePage.js';
import RecipeForm from '../components/RecipeForm/RecipeForm.js';
import Pagination from '../components/Pagination.js';
import LoadingSpinner from '../components/LoadingSpinner.js';
import ErrorScreen from '../components/ErrorScreen.js';



function Recipes({isAuth}){
    // nav and header
    const history = useHistory();
    let match = useRouteMatch();
    const setCurrentPage = globalStore(state => state.setCurrentPage);
    setCurrentPage(window.location.pathname)

    // all recipes data in pages, and current selection of recipes for page display
    const [myRecipes, setMyRecipes] = useState(null);
    const [recipeSlice, setRecipeSlice] = useState([]);

    // for pagination
    const [currPage, setCurrPage] = useState(1);
    // eslint-disable-next-line
    const [recipesPerPage, setRecipesPerPage] = useState(8);
    const [totalRecipes, setTotalRecipes] = useState(8);

    // ui controllers, force refresh by state change of refresh or for async data use loading.
    const [refresh, setRefresh] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // sorting and filtering data
    const [sortFilters, setSortFilters] = useState({});

    //get userId and logged in status from global state store
    const getUserId = globalStore(state => state.getUserIdFromJWT)
    const isLoggedIn = globalStore(state => state.isLoggedIn)


    // POST request to get recipes from server based on page and amount, checks for null filter requirements
    const fetchRecipes = useCallback((thisPage) => {
        const fetchRecipesInner = async (thisPage = currPage, numOf = recipesPerPage) => {
            setIsLoading(true);
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
    return fetchRecipesInner();
}, [currPage, recipesPerPage, sortFilters])
    
    // get recipes on load and refresh
    useEffect(() => {
        const abortController = new AbortController();
        let ignore = false;

        const getRecipes = async () => {
            const recipesFromServer = await fetchRecipes(1); 
            setMyRecipes([{"page": 1, "recipes" : recipesFromServer}]) // set Recipes array    
            setTotalRecipes(recipesFromServer[0].count) // set total number of recipes for pagination, count is my defined sql count over() function on the api being returned along side the recipes data
            setCurrPage(1) // push page state back to the first page
        }
        if(!ignore){
            getRecipes();
            setIsLoading(false)
        }
        return () => {
            ignore = true;
            abortController.abort();
        }; 
    }, [refresh, fetchRecipes])

    // set recipes on page
    useEffect(() => {
        let ignore = false;
        if(!ignore){ myRecipes? setRecipeSlice(myRecipes.find(x => x["page"] === currPage)["recipes"]) : setRecipeSlice([]); }
        return () => { ignore = true; }; 
    }, [myRecipes, currPage]) 


    // On pagination setCurrPage change, checks if page exists in memory, if not then fetch it and update state.
    const changePage = async(number) => {
        (function () {
            setCurrPage(number);
            setIsLoading(true);
        } ());
        
        // returns bool
        const alreadyFetched = () => {
            return myRecipes.includes(myRecipes.find(x => x["page"] === number))
        };

        // fetch new data or useState data
        if(!alreadyFetched()){
            const data = await fetchRecipes(number);
            setMyRecipes([...myRecipes, {"page": number, "recipes" : data}]);
        }
        else{
            setRecipeSlice(myRecipes.find(x => x["page"] === number)["recipes"])
        }

        setIsLoading(false);
    }
    
     // Recipe data mapped to recipe card components
     const displayRecipes = () => {
        if(recipeSlice[0]?.count === 0){
            return <ErrorScreen errorMessage={'All out of coffee, try a different search?'} />
        }

        return recipeSlice.map((x) => <RecipeCard key={x.id} recipe={x}/>)
    }



    return(

        <div className="text-center pb-5">
            <Switch>
                <Route exact path={match.path}>
                    <h1 className="display-2">Recipes</h1>
                    <p>Here for all your espresso brewing needs.</p>
                    <RecipeBtnGrp  goTo={() => history.push(`${match.path}/new`)} refresh={refresh} setRefresh={setRefresh} sortFilters={sortFilters} setSortFilters={setSortFilters} fetchRecipes={fetchRecipes} getUserId={getUserId} isLoggedIn={isLoggedIn} />

                    <div className="container row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4 mx-auto">
                        {!isLoading? displayRecipes() : <LoadingSpinner /> }
                    </div>

                    <Pagination className={"container text-center mx-auto p-3"} itemsPerPage={recipesPerPage} totalItems={totalRecipes} currPage={currPage} setCurrPage={changePage} />
                </Route>

                <Route exact path={`/recipes/new`} 
                    render={props => isAuth ? 
                        (
                    
                        <RecipeForm getUserId={getUserId} refresh={refresh} setRefresh={setRefresh} />
                    )
                     : (<Redirect to={{pathname: "/login", state: {location: "/recipes", going: '/recipes/new'}}} />)} 
                />

                <Route path={`${match.path}/:id`}>
                    <RecipePage recipe={recipeSlice} />
                </Route>
            </Switch>
        </div>
    )
}

export default Recipes;