import { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom'; 
import RecipeBtnGrp from './RecipeBtnGrp.js';
import RecipeCard from './RecipeCard.js';
import RecipePage from './RecipePage.js';
import NewRecipe from './NewRecipe.js';
import RecipePagination from './RecipePagination.js';
import useShotFormStore from './store.js';
import * as yup from 'yup';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";



function Recipes({newShot, setNewShot, handleCheckboxChange, handleInputChange, onNewShot, todaysDate}){
    const history = useHistory();

    // for pagination
    const [myRecipes, setMyRecipes] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(8);

    const schema = yup.object().shape({
        Grinder: yup.string().required(),
        Machine: yup.string().required(),
        Notes: yup.string().required(),
        UserNotes: yup.date()
    })

    const schemaData = {
        Grinder: newShot.Grinder,
        Machine: newShot.Machine,
        Notes: newShot.Notes,
        UserNotes: newShot.UserNotes
    }

    
    const formErrors = useShotFormStore(state => state.formError);
    const setFormErrors = useShotFormStore(state => state.setFormError);

    const setTodate = () => {
        setNewShot((prevProps) => ({...prevProps, ["DatePosted"]: todaysDate}))
        console.log(newShot.DatePosted)
    }

    

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        await setTodate();

        schema.validate(schemaData, { abortEarly: false })
            .then(() => {
                setFormErrors([]); 
                //var TodaysDate = new Date().toISOString().split('T')[0];
                
                        
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
    
    const addRecipe = async (recipe) => {
        const res = await fetch('/recipes', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(recipe)
        })

        const data = await res.json()

        console.log(res, data);
        setMyRecipes([...myRecipes, data])
    }

    

    useEffect(() => {
        const getRecipes = async () => {
            const recipesFromServer = await fetchRecipes()
            setMyRecipes(recipesFromServer.map(x => x))         
        }
        getRecipes()   
    }, [])


    const fetchRecipes = async () => {
        const res = await fetch('/recipes')
        const data = await res.json()
        console.log('fetchRecipes data', data)
        return data
    }

    let match = useRouteMatch();

    const indexOfLastPost = currPage * recipesPerPage;
    const indexOfFirstPost = indexOfLastPost - recipesPerPage;
    const currRecipes = myRecipes.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrPage(pageNumber);


    return(

        <div className="text-center pb-5">
            <Switch>
                <Route exact path={match.path}>
                    <h1 className="display-2">Recipes</h1>
                    <p>Here for all your espresso brewing needs.</p>
                    <RecipeBtnGrp  goTo={() => history.push(`${match.path}/new`)}/>
                    <div className="container row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4 mx-auto">
                        {currRecipes.map(x => <RecipeCard key={x.id} recipe={x}/>)}
                    </div>
                    <RecipePagination recipesPerPage={recipesPerPage} totalRecipes={myRecipes.length} paginate={paginate} />
                </Route>

                <Route exact path={`${match.path}/new`}>
                    <form onSubmit={handleSubmit} className="mx-auto text-center">
                        <NewRecipe setTodate={setTodate} add={addRecipe} onNewShot={onNewShot} newShot={newShot} setNewShot={setNewShot} handleCheckboxChange={handleCheckboxChange} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
                    </form>
                </Route>

                <Route path={`${match.path}/:id`}>
                    <RecipePage recipe={myRecipes}/>
                </Route>
            </Switch>
        </div>
    )
}

export default Recipes;