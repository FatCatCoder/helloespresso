import JournalItemContent from './JournalItemContent.js';
import JournalItem from './JournalItem.js';
import {useHistory} from 'react-router-dom';
import {useEffect, useState} from 'react';
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


    useEffect(() => {
        const fetchJournalEntries = () => { axios.get('http://10.0.0.41:5000/journal?_sort=id&_order=desc')
            .then(res =>{
                const data = res.data;
                setMyEntries(data.map(x => x))
            })}
        fetchJournalEntries()
    }, [])



    return(

        <div className="text-center pb-5">
            <Switch>
                <Route exact path={match.path}>
                    <h1 className="display-2">Journal</h1>
                    <div className="container">
                        <div class="list-group">
                            {myEntries.map((x, y) => <JournalItem key={x.id} id={y+1} Bean={x.Bean} Region={x.Region} Roaster={x.Roaster} Date={x.Date} /> )}
                        </div>
                    </div>
                </Route>


                <Route exact path={`${match.path}/:id`}>
                    <JournalItemContent myEntries={myEntries}/>
                </Route>
            </Switch>
        </div>
    )
}

export default Journal;