import JournalItemContent from './JournalItemContent.js';
import {useHistory} from 'react-router-dom';

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

    const handleClick = (e) => {
        e.preventDefault();
        
        history.push(`${match.path}/item`)
    }

    return(

        <div className="text-center pb-5">
            <Switch>
                <Route exact path={match.path}>
                <h1 className="display-2">Journal</h1>
                <div className="container">
                    <div class="list-group">
                        <a href="" onClick={handleClick} class="list-group-item list-group-item-action">
                            <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">Ethiopia (Bedhatu Jibicho) - Kuma</h5>
                            <small class="text-muted">4/19/21</small>
                            </div>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action">
                            <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">Brazil (Cerrado) - Buddy Brew</h5>
                            <small class="text-muted">4/03/21</small>
                            </div>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action" aria-current="true">
                            <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">Ethiopia (Agaro, Duromina) - Buddy Brew</h5>
                            <small class="text-muted">3/28/21</small>
                            </div>
                        </a> 
                    </div>
                </div>
                </Route>

                <Route exact path={`${match.path}/item`}>
                    <JournalItemContent shotList={shotList}/>
                </Route>
            </Switch>
        </div>
    )
}

export default Journal;