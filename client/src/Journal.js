import JournalItemContent from './JournalItemContent.js';
import JournalItem from './JournalItem.js';
import {useHistory} from 'react-router-dom';
import {useEffect, useState} from 'react';
import RecipePagination from './RecipePagination.js';
import axios from 'axios';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";


function Journal({shotList}){
    const history = useHistory();
    let match = useRouteMatch();

    const [myEntries, setMyEntries] = useState([]);

    // for pagination
    const [currPage, setCurrPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(8);



    useEffect(() => {
        const fetchJournalEntries = () => { axios.get('/journal?_sort=id&_order=desc')
            .then(res =>{
                const data = res.data;
                setMyEntries(data.map(x => x))
            })}
        fetchJournalEntries()
    }, [])

    

    const indexOfLastPost = currPage * recipesPerPage;
    const indexOfFirstPost = indexOfLastPost - recipesPerPage;
    const currRecipes = myEntries.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrPage(pageNumber);



    return(

        <div className="text-center pb-5">
            <Switch>
                <Route exact path={match.path}>
                    <h1 className="display-2">Journal</h1>
                    <div className="container">
                        <div class="list-group">
                            {currRecipes.map((x, y) => <JournalItem key={x.id} id={y+1} Bean={x.bean} Region={x.region} Roaster={x.roaster} Date={x.postDate} /> )}
                        </div>
                    </div>
                    <RecipePagination recipesPerPage={recipesPerPage} totalRecipes={myEntries.length} paginate={paginate} />
                </Route>


                <Route exact path={`${match.path}/:id`}>
                    <JournalItemContent myEntries={myEntries}/>
                </Route>
            </Switch>
        </div>
    )
}

export default Journal;