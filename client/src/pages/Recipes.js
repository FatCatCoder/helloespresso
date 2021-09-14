// modules
import { useState, useEffect  } from 'react';
import {useHistory} from 'react-router-dom'; 
import {globalStore, useRecipesStore} from '../store.js';
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
import ErrorScreen from '../components/ErrorScreen.js';



function Recipes({isAuth}){
    // nav and header
    const history = useHistory();
    let match = useRouteMatch();
    const setCurrentPage = globalStore(state => state.setCurrentPage);

    useEffect(() => {
        setCurrentPage(window.location.pathname)
    }, [])

    // global state for recipes data
    const { 
        myRecipes, setMyRecipes, 
        recipeSlice, setRecipeSlice,
        currPage, setCurrPage, 
        recipesPerPage, setRecipesPerPage,
        totalRecipes, setTotalRecipes,
        refresh, setRefresh,
        isLoading, setIsLoading,
        sortFilters, setSortFilters,
        } = useRecipesStore();

    const getUserId = globalStore(state => state.getUserIdFromJWT)
    const isLoggedIn = globalStore(state => state.isLoggedIn)

    // POST request to get recipes from server based on page and amount, checks for null filter requirements
    const fetchRecipes = async (thisPage = currPage, numOf = recipesPerPage, controller) => {
        try{
        setIsLoading(true);
        console.log(sortFilters);
        console.log(thisPage, currPage);
        
        if(Object.keys(sortFilters) !== 0 && (sortFilters?.sortBy === null || sortFilters?.sortBy == undefined)){
            setSortFilters({...sortFilters, "sortBy": "postdate DESC"})
        }

        console.log(sortFilters);
        const res = await fetch('/recipes', {
            method: 'POST',
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({"offsetPage": thisPage - 1, "limitAmount": numOf, "sortFilters": sortFilters})
        })
        console.log(res);
        const data = await res.json();
        
        console.log('fetchRecipes data', data)
        
        const recipesWithLikes = await getAllLikes(data, controller)

        return await recipesWithLikes;
    }
    catch(err){
        console.log(err);
    }
    }

    const getAllLikes = async (recipes, controller) => {
        try{
        console.log('all likes recipes', recipes);
        const ids = recipes.map(x => x.id);
        console.log(ids);

        const res = await fetch('/recipes/all-likes', {
            method: 'POST',
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(ids)
        })

        const data = await res.json();
        console.log('all likes returned', await data);

        const addLikes = await recipes.map(x => Object.assign(x, data.find(y => y.id === x.id)));
        console.log(addLikes);
        return await addLikes;
    }
    catch(err){
        console.log(err);
        return 
    }
    }

    const getRecipes = async (newOrNext, controller) => {
        if(newOrNext==='new'){
            const recipesFromServer = await fetchRecipes(1, recipesPerPage, controller);
            setMyRecipes([{"page": 1, "recipes" : recipesFromServer}]) // set Recipes array
            setRecipeSlice(recipesFromServer)    
            setTotalRecipes(recipesFromServer[0].count) // set total number of recipes for pagination, count is my defined sql count over() function on the api being returned along side the recipes data
            setCurrPage(1) // push page state back to the first page
        }
        else if(newOrNext==='next'){
            const recipesFromServer = await fetchRecipes(currPage, recipesPerPage, controller);
            setMyRecipes([...myRecipes, {"page": currPage, "recipes" : recipesFromServer}]) // set Recipes array
            setRecipeSlice(recipesFromServer)    
            setTotalRecipes(recipesFromServer[0].count) // set total number of recipes for pagination, count is my defined sql count over() function on the api being returned along side the recipes data
        }
    }
    
    // get recipes on load and refresh, and check for existing pages in memory to avoid api call

    useEffect(() => {
        console.log('useffect 3');
        const abortController = new AbortController();
        let ignore = false;

        const alreadyFetched = () => {
            console.log('already fecthed currpage', currPage);
            return myRecipes.includes(myRecipes.find(x => x["page"] === currPage))
        };
        const checkdata = async() =>{
        // init & refresh
        if(!ignore && (myRecipes.length === 0 || refresh)){
            console.log('initial load 3'); 
            await getRecipes('new', abortController);
            setIsLoading(false);
            setRefresh(false);
            setCurrPage(1);
        }
        // fetch next page
        else if(!ignore && !alreadyFetched()){
            console.log('getting recipes 3');
            await getRecipes('next', abortController);
            setIsLoading(false);
            setRefresh(false);
            return console.log('use EFFECT 3 all good callling new data');  
        }
        // already in memory
        else if(!ignore && alreadyFetched()){
            await setRecipeSlice(myRecipes.find(x => x["page"] === currPage)["recipes"])
            setIsLoading(false);
            return console.log('use EFFECT 3 data instate already');  
        }
    }

    checkdata();

        return () => {
            ignore = true;
            abortController.abort();
            console.log('!!!!!!!!! // --  ABORTED -- // !!!!!!!');
        };
        // eslint-disable-next-line 
    }, [currPage, refresh])

    // set recipes on page
    useEffect(() => {
        let ignore = false;
        console.log('myRecipes slice useEffect', myRecipes);
        console.log(currPage);
        // try{
        if(!ignore && !refresh){ myRecipes.length !== 0? setRecipeSlice(myRecipes.find(x => x["page"] === currPage)["recipes"]) : setRecipeSlice([]); }
        // }
        // catch(err){
        //     console.log(err);
        // }
        return () => { ignore = true; }; 
        // eslint-disable-next-line
    }, [myRecipes]) 


    // On pagination setCurrPage change, checks if page exists in memory, if not then fetch it and update state.
    const changePage = async(number) => {
        console.log(number);
        (function () {
            setCurrPage(number);
            setIsLoading(true);
        } ());
    }
    
     // Recipe data mapped to recipe card components
     const displayRecipes = () => {
        if(recipeSlice[0]?.count === 0){
            return <ErrorScreen errorMessage={'All out of coffee, try a different search?'} />
        }
        if(isLoading){
            const fakeArr = new Array(recipesPerPage).fill({});
            return fakeArr.map((x, y) => <RecipeCard key={y} recipe={x} animation={'skeleton'} />) 
        }
        if(recipeSlice === null || recipeSlice === undefined){
            const fakeArr = new Array(recipesPerPage).fill({});
            return fakeArr.map((x, y) => <RecipeCard key={y} recipe={x} animation={'skeleton'} />) 
        }
        console.log('displayrecipes recipeSlice',recipeSlice, 'displayrecipes myrecipes',myRecipes, sortFilters);
        return recipeSlice.map((x) => <RecipeCard key={x.id} recipe={x} animation={'fadeIn'} />)
    }

    return(

        <div className="text-center pb-5">
            <Switch>
                <Route exact path={match.path}>
                    <h1 className="display-2">Recipes</h1>
                    <p>Here for all your espresso brewing needs.</p>
                    <RecipeBtnGrp  goTo={() => history.push(`${match.path}/new`)} refresh={refresh} setRefresh={setRefresh} sortFilters={sortFilters} setSortFilters={setSortFilters} fetchRecipes={fetchRecipes} getUserId={getUserId} isLoggedIn={isLoggedIn} />

                    <div className="container h-100 row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4 mx-auto">
                        {displayRecipes()}
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