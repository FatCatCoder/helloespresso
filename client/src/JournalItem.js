import {Link} from 'react-router-dom';

// link to journal entry, display basic information, used for journal fetched data array map()

function JournalItem({id, Bean, Region, Roaster, postDate}){

    return(
        <Link to={`/journal/${id}`} class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1 text-capitalize">{Bean} ({Region}) - {Roaster}</h5>
            <small class="text-muted"> {new Date(postDate).toLocaleDateString() }</small>
            </div>
        </Link>
    )
}

export default JournalItem;