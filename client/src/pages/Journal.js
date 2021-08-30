import {useEffect, useState} from 'react';
import {globalStore} from '../store.js';
import axios from 'axios';
import {
    Redirect,
    Switch,
    Route,
    useRouteMatch,
  } from "react-router-dom";

// components
import Pagination from '../components/Pagination.js';
import JournalItemContent from '../components/JournalItemContent.js';
import JournalItem from '../components/JournalItem.js';
import LoadingSpinner from '../components/LoadingSpinner.js';
import Login from './Login.js';


// journal page, displays logged in users entries, or login screen

function Journal({isAuth}){
    let match = useRouteMatch();
    const setCurrentPage = globalStore(state => state.setCurrentPage);
    const loadingAuth = globalStore(state => state.loadingAuth);
    useEffect(() => {
        setCurrentPage(window.location.pathname)
    }, [])

    const [myEntries, setMyEntries] = useState([]);

    // for pagination
    const [currPage, setCurrPage] = useState(1);
    // eslint-disable-next-line
    const [recipesPerPage, setRecipesPerPage] = useState(8);

    const jwtDecode = () => {
        const token = localStorage.getItem('Authorization');
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    useEffect(() => {
        const abortController = new AbortController();
        let ignore = false;

        if(!ignore && isAuth){
            const userData = jwtDecode();
            const fetchJournalEntries = async () => { 
                const res = await axios.post('/journals', {user_id: userData.user.id});
                const data = res.data;
                console.log(data);
                setMyEntries(data.map(x => x))
            }
            fetchJournalEntries()
        }
        
        return () => {
            ignore = true;
            abortController.abort();
        }; 
    }, [isAuth])

    
    // for pagination
    const indexOfLastPost = currPage * recipesPerPage;
    const indexOfFirstPost = indexOfLastPost - recipesPerPage;
    const currRecipes = myEntries.slice(indexOfFirstPost, indexOfLastPost);

    // wait for app.js to fetch auth from server
    if(loadingAuth){
        return <div className="text-center pb-5"><LoadingSpinner /></div>
    }
    // if auth give page else redirect login 
    return(
        <div className="text-center pb-5">
            {isAuth?
            <Switch>
                <Route exact path={match.path}>
                    <h1 className="display-2">Journal</h1>
                    <div className="container">
                        <div class="list-group">
                            {currRecipes.map((x, y) => <JournalItem key={x.id} id={x.id} Bean={x.bean} Region={x.region} Roaster={x.roaster} postDate={x.postdate} /> )}
                        </div>
                    </div>
                    <Pagination className={"container text-center mt-3 mx-auto"} itemsPerPage={recipesPerPage} totalItems={myEntries.length} currPage={currPage} setCurrPage={setCurrPage} />
                </Route>

                <Route path={`${match.path}/:id`}>
                    <JournalItemContent myEntries={myEntries}/>
                </Route>
            </Switch>
            :
            (<Redirect to={{pathname: "/login", state: {location: "/journal", going: "/journal"}}} />)}
        </div>
        
    )
}

export default Journal;