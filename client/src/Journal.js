import JournalItemContent from './JournalItemContent.js';
import JournalItem from './JournalItem.js';
import {useHistory, Redirect} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Pagination from './components/Pagination.js';
import axios from 'axios';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

// journal page, displays logged in users entries, or login screen
// unlike recipes, journal returns all of a users entries, no server side pagination support
// any reasonable return amount (which is expected) is negligible on bandwidth and performance

function Journal({isAuth}){
    const history = useHistory();
    let match = useRouteMatch();

    const [myEntries, setMyEntries] = useState([]);

    // for pagination
    const [currPage, setCurrPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(8);

    const jwtDecode = () => {
        const token = localStorage.getItem('Authorization');
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    useEffect(() => {
        const userData = jwtDecode();
        const fetchJournalEntries = async () => { 
            const res = await axios.post('/journals', {user_id: userData.user.id});
            const data = res.data;
            console.log(data);
            setMyEntries(data.map(x => x))
        }
        fetchJournalEntries()
    }, [])

    
    // for pagination
    const indexOfLastPost = currPage * recipesPerPage;
    const indexOfFirstPost = indexOfLastPost - recipesPerPage;
    const currRecipes = myEntries.slice(indexOfFirstPost, indexOfLastPost);

    return(

        <div className="text-center pb-5">
            <Switch>
                <Route exact path={match.path}>
                    <h1 className="display-2">Journal</h1>
                    <div className="container">
                        <div class="list-group">
                            {currRecipes.map((x, y) => <JournalItem key={x.id} id={x.id} Bean={x.bean} Region={x.region} Roaster={x.roaster} postDate={x.postdate} /> )}
                        </div>
                    </div>
                    <Pagination className={"container text-center mx-auto"} itemsPerPage={recipesPerPage} totalItems={myEntries.length} currPage={currPage} setCurrPage={setCurrPage} />
                </Route>

                <Route path={`${match.path}/:id`}>
                    <JournalItemContent myEntries={myEntries}/>
                </Route>
            </Switch>
        </div>
    )
}

export default Journal;