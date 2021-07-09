import {useState} from 'react';
function RecipeBtnGrp(props){
    
    return(
        <div className="container border mx-auto mb-3">
                <button onClick={props.goTo} className="btn btn-primary m-2">New</button>

                <div className="btn-group m-2">
                <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Sort
                </button>
                <ul className="dropdown-menu">
                    {props.togglePost?
                    <li><a className="dropdown-item" onClick={() => {props.setSortFilters((filters) => ({...filters, "sortBy": "postdate ASC"})); props.setTogglePost(!props.togglePost);}}><i className="bi bi-arrow-up"></i> Oldest Recipe</a></li>
                    : <li><a className="dropdown-item" onClick={() => {props.setSortFilters((filters) => ({...filters, "sortBy": "postdate DESC"})); props.setTogglePost(!props.togglePost);}}><i className="bi bi-arrow-down"></i> Newest Recipe</a></li>
                    }
                    {props.toggleRoast?
                    <li><a className="dropdown-item" onClick={() => {props.setSortFilters((filters) => ({...filters, "sortBy": "roastdate ASC"})); props.setToggleRoast(!props.toggleRoast);}}><i className="bi bi-arrow-up"></i> Oldest Roast</a></li>
                    : <li><a className="dropdown-item" onClick={() => {props.setSortFilters((filters) => ({...filters, "sortBy": "roastdate DESC"})); props.setToggleRoast(!props.toggleRoast);}}><i className="bi bi-arrow-down"></i> Fresh Roast</a></li>
                    }                
                    <li><a className="dropdown-item" onClick={() => {props.setSortFilters((filters) => ({...filters, "sortBy": "popular DESC"})); props.setToggleRoast(!props.toggleRoast);}}><i class="bi bi-heart"></i> Popular</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Default</a></li>
                </ul>
                </div>

                <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    Filter <i class="bi bi-chevron-expand"></i>
                </button>

                <button className="btn btn-primary m-2 float-right" onClick={() => props.setRefresh(!props.refresh)} >
                    <i class="bi bi-arrow-repeat"></i>
                </button>

                <div class="collapse" id="collapseExample">
                    <div class="card card-body">
                        <form>

                        </form>
                    </div>
                </div>

            </div>
    )
}

export default RecipeBtnGrp;