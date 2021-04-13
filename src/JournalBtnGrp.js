function JournalBtnGrp(props){
    return(
        <div className="container border mx-auto mb-3">
                <button onClick={props.goTo} className="btn btn-primary m-2">New</button>

                <div class="btn-group">
                <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Sort
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#"><i class="bi bi-arrow-up"></i>Recipe Date</a></li>
                    <li><a class="dropdown-item" href="#"><i class="bi bi-arrow-down"></i>Recipe Date</a></li>
                    <li><a class="dropdown-item" href="#">Origin</a></li>
                    <li><hr class="dropdown-divider" /></li>
                    <li><a class="dropdown-item" href="#">Default</a></li>
                </ul>
                </div>

            </div>
    )
}

export default JournalBtnGrp;