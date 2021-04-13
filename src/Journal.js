import { useState, useEffect } from 'react';
import JournalBtnGrp from './JournalBtnGrp.js';
import RecipeCard from './RecipeCard.js';
import RecipePage from './RecipePage.js';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";


function Journal(){

    const [myRecipes, setMyRecipes] = useState([]);
    
    
    
    const addRecipe = async () => {
        const res = await fetch('http://10.0.0.41:5000/recipes', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({Bean: "Test POST"})
        })

        const data = await res.json()

        console.log(res, data);
        setMyRecipes([...myRecipes, data])
    }

    

    useEffect(() => {
        const getRecipes = async () => {
            const recipesFromServer = await fetchRecipes()
            setMyRecipes(recipesFromServer.map(x => x))
            console.log('useEffect after fetch precall', myRecipes)
            
        }
        getRecipes()
        console.log('useEffect after fetch postcall', myRecipes)
        
    }, [])


    const fetchRecipes = async () => {
        const res = await fetch('http://10.0.0.41:5000/recipes')
        const data = await res.json()
        console.log('fetchRecipes data', data)
        return data
    }

    let match = useRouteMatch();


    return(

        <div className="text-center pb-5">
            

            <Switch>
            <Route exact path={match.path}>
            <h1 className="display-2">Journal</h1>
            <p>Here for all your espresso brewing needs.</p>
                <JournalBtnGrp add={addRecipe} />
                

                <div className="container row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4 mx-auto">
                    {myRecipes.map(x => <RecipeCard key={x.id} recipe={x}/>)}
                </div>
            </Route>

            <Route path={`${match.path}/:id`}>
                <RecipePage recipe={myRecipes}/>
            </Route>

            </Switch>


            <nav aria-label="Page navigation">
                <ul class="pagination justify-content-center m-3">
                    <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                    </li>
                </ul>
            </nav>


        </div>
    )
}

export default Journal;