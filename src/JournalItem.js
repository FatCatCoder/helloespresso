function JournalItem({id, Bean, Region, Roaster, Date, route}){
    return(
        <a href="" onClick={route} class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{Bean} ({Region}) - {Roaster}</h5>
            <small class="text-muted">{Date}</small>
            </div>
        </a>
    )
}

export default JournalItem;