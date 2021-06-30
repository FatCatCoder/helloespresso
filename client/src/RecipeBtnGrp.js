function RecipeBtnGrp(props){
    return(
        <div className="container border mx-auto mb-3">
                <button onClick={props.goTo} className="btn btn-primary m-2">New</button>

                <div className="btn-group">
                <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Sort
                </button>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#"><i className="bi bi-arrow-up"></i>Recipe Date</a></li>
                    <li><a className="dropdown-item" href="#"><i className="bi bi-arrow-down"></i>Recipe Date</a></li>
                    <li><a className="dropdown-item" href="#">Origin</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Default</a></li>
                </ul>
                </div>
                <button className="btn btn-primary m-2 float-right" onClick={() => props.setRefresh(!props.refresh)} >
                    <i class="bi bi-arrow-repeat"></i>
                </button>

            </div>
    )
}

export default RecipeBtnGrp;