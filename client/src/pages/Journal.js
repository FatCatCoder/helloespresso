import {useEffect, useState} from 'react';
import {globalStore} from '../store.js';
import {
    Redirect,
    Switch,
    Route,
    useRouteMatch,
    useHistory
  } from "react-router-dom";

// components
import Pagination from '../components/Pagination.js';
import JournalItemContent from '../components/JournalItemContent.js';
import JournalItem from '../components/JournalItem.js';
import LoadingSpinner from '../components/LoadingSpinner.js';


// Displays loggedin user journals, or redirects to login

function Journal(){
    // auth & routing
    let match = useRouteMatch();
    const history = useHistory();
    const setCurrentPage = globalStore(state => state.setCurrentPage);
    const loadingAuth = globalStore(state => state.loadingAuth);
    const isLoggedIn = globalStore(state => state.isLoggedIn);
    const getUserIdFromJWT = globalStore(state => state.getUserIdFromJWT);
    
    useEffect(() => {
        setCurrentPage(window.location.pathname)
    }, [])


    // for pagination
    const [currPage, setCurrPage] = useState(1);

    // eslint-disable-next-line
    const [recipesPerPage, setRecipesPerPage] = useState(8);
    const [myEntries, setMyEntries] = useState([]);

    const [errors, setErrors] = useState({"message": '', "success": true});
    

    useEffect(() => {
        const abortController = new AbortController();
        let ignore = false;

        try{
            if(!ignore && isLoggedIn){
                const userData = getUserIdFromJWT();
                const fetchJournalEntries = async () => { 
                    const res = await fetch('/api/journals', {
                        method: "POST",
                        headers: {"Content-Type": "application/json", "Authorization": localStorage.getItem('Authorization')},
                        body: JSON.stringify({user_id: userData})
                    })
                    const data = await res.json();
                    console.log(data);
                    setMyEntries(data.map(x => x))
                }
                fetchJournalEntries()
            }
            else if (!ignore && !isLoggedIn && !loadingAuth){
                setCurrentPage('/journal')
                history.push('/login', {going: '/journal'})
            }
        }
        catch(err){
            history.push('/login')
        }
        
        return () => {
            ignore = true;
            abortController.abort();
        }; 
    }, [isLoggedIn])

    const deleteJournal = async (id) => {
        try{   
            const res = await fetch('/api/journals/delete', {
                method: "POST",
                headers: {"Content-Type": "application/json", "Authorization": localStorage.getItem('Authorization')},
                body: JSON.stringify({id})
            })

            const parseRes = await res.json();

            if(parseRes.success){
                const deleteEntry = setMyEntries(prevEntries => prevEntries.filter(x => x.id !== id))
                return history.push('/journal');
            }
            setErrors(parseRes);
        }
        catch(error){
            setErrors({"message": 'coffee got spilled on the server, please wait for it to dry', "success": false})
        }     
    }
    
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
            <Switch>
                <Route exact path={match.path}>
                    <h1 className="display-2">Journal</h1>
                    <div className="container">
                        <div className="list-group">
                            {currRecipes.map((x, y) => <JournalItem key={x.id} id={x.id} Bean={x.bean} Region={x.region} Roaster={x.roaster} postDate={x.postdate} /> )}
                        </div>
                    </div>
                    <Pagination className={"container text-center mt-3 mx-auto"} itemsPerPage={recipesPerPage} totalItems={myEntries.length} currPage={currPage} setCurrPage={setCurrPage} />
                </Route>

                <Route path={`${match.path}/:id`}>
                    <JournalItemContent myEntries={myEntries} deleteJournal={deleteJournal} errors={errors} />
                </Route>
            </Switch>
        </div>
        
    )
}

export default Journal;