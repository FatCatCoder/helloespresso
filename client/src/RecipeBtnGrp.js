import {useState} from 'react';
function RecipeBtnGrp(props){

    const [sortUsed, setSortUsed] = useState(null);

    const handleOnChange = (e) => {
        props.setSortFilters((prevProps) => ({
            ...prevProps,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.fetchRecipes();
    }

    const resetForm = () => { 
        document.getElementById("filterForm").reset();
      }

    // toggle menus
    /*
    {props.togglePost?
                    <li><a className="dropdown-item" onClick={() => {props.setSortFilters((filters) => ({...filters, "sortBy": "postdate ASC"})); props.setTogglePost(!props.togglePost);}}><i className="bi bi-arrow-up"></i> Oldest Recipe</a></li>
                    : <li><a className="dropdown-item" onClick={() => {props.setSortFilters((filters) => ({...filters, "sortBy": "postdate DESC"})); props.setTogglePost(!props.togglePost);}}><i className="bi bi-arrow-down"></i> Newest Recipe</a></li>
                    }
                    {props.toggleRoast?
                    <li><a className="dropdown-item" onClick={() => {props.setSortFilters((filters) => ({...filters, "sortBy": "roastdate ASC"})); props.setToggleRoast(!props.toggleRoast);}}><i className="bi bi-arrow-up"></i> Oldest Roast</a></li>
                    : <li><a className="dropdown-item" onClick={() => {props.setSortFilters((filters) => ({...filters, "sortBy": "roastdate DESC"})); props.setToggleRoast(!props.toggleRoast);}}><i className="bi bi-arrow-down"></i> Fresh Roast</a></li>
                    }
    */

    /*
    <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Sort
                </button>
                <ul className="dropdown-menu">
                    

                    <li><a className="dropdown-item" onClick={() => {props.setSortFilters((filters) => ({...filters, "sortBy": "postdate DESC"})); props.setTogglePost(!props.togglePost);}}><i className="bi bi-arrow-down"></i> Newest Recipe</a></li>
                    <li><a className="dropdown-item" onClick={() => {props.setSortFilters((filters) => ({...filters, "sortBy": "postdate ASC"})); props.setTogglePost(!props.togglePost);}}><i className="bi bi-arrow-up"></i> Oldest Recipe</a></li>                
                    <li><a className="dropdown-item" onClick={() => {props.setSortFilters((filters) => ({...filters, "sortBy": "roastdate DESC"})); props.setToggleRoast(!props.toggleRoast);}}><i className="bi bi-arrow-down"></i> Fresh Roast</a></li>
                    <li><a className="dropdown-item" onClick={() => {props.setSortFilters((filters) => ({...filters, "sortBy": "roastdate ASC"})); props.setToggleRoast(!props.toggleRoast);}}><i className="bi bi-arrow-up"></i> Oldest Roast</a></li>
                    
                    <li><a className="dropdown-item" onClick={() => {props.setSortFilters((filters) => ({...filters, "sortBy": "popular DESC"})); props.setToggleRoast(!props.toggleRoast);}}><i className="bi bi-heart"></i> Popular</a></li>


                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Default</a></li>
                </ul>
        */
   console.log(props.getUserId(), props.isLoggedIn)
    
    return(
        <div className="container border mx-auto mb-3">
                <button onClick={props.goTo} className="btn btn-primary m-2">New</button>

                <div className="btn-group m-2">
                

                <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#sortCollapse" aria-expanded="false" aria-controls="sortCollapse">
                    Sort
                </button>

                
                </div>

                <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    Filter <i className="bi bi-chevron-expand"></i>
                </button>

                <button className="btn btn-primary m-2 float-right" onClick={() => props.setRefresh(!props.refresh)} >
                    <i className="bi bi-arrow-repeat"></i>
                </button>

                <div className="collapse" id="sortCollapse">
                    <div className="card card-body border-0">
                        <div className="list-group container-sm mx-auto">
                            <a className={`list-group-item ${sortUsed == "postdate DESC"? 'active': ''}`} onClick={() => {props.setSortFilters((filters) => ({...filters, "sortBy": "postdate DESC"})); props.setTogglePost(!props.togglePost); setSortUsed("postdate DESC");}}><i className="bi bi-arrow-down"></i> Newest Recipe</a>
                            <a className={`list-group-item ${sortUsed == "postdate ASC"? 'active': ''}`} onClick={() => {props.setSortFilters((filters) => ({...filters, "sortBy": "postdate ASC"})); props.setTogglePost(!props.togglePost); setSortUsed("postdate ASC");}}><i className="bi bi-arrow-up"></i> Oldest Recipe</a>                
                            <a className={`list-group-item ${sortUsed == "roastdate DESC"? 'active': ''}`} onClick={() => {props.setSortFilters((filters) => ({...filters, "sortBy": "roastdate DESC"})); props.setToggleRoast(!props.toggleRoast); setSortUsed("roastdate DESC");}}><i className="bi bi-arrow-down"></i> Fresh Roast</a>
                            <a className={`list-group-item ${sortUsed == "roastdate ASC"? 'active': ''}`} onClick={() => {props.setSortFilters((filters) => ({...filters, "sortBy": "roastdate ASC"})); props.setToggleRoast(!props.toggleRoast); setSortUsed("roastdate ASC");}}><i className="bi bi-arrow-up"></i> Oldest Roast</a>
                            <a className={`list-group-item ${sortUsed == "popular DESC"? 'active': ''}`} onClick={() => {props.setSortFilters((filters) => ({...filters, "sortBy": "popular DESC"})); props.setToggleRoast(!props.toggleRoast); setSortUsed("popular DESC");}}><i className="bi bi-heart"></i> Popular</a>
                        </div>
                    </div>
                </div>

                <div className="collapse" id="collapseExample">
                    <div className="card card-body border-0">
                        <form autoComplete="off" onSubmit={handleSubmit} className="mx-auto text-center" id="filterForm">
                            
                            <div className="row container-sm">
                            <input className="shadow col-md border-1 form-control m-2" list="beanList" onChange={handleOnChange} value={props.sortFilters.bean} name="bean" type="text" placeholder="Bean/Name..."></input>
                            <input className="shadow col-md border-1 form-control m-2" onChange={handleOnChange} value={props.sortFilters.roaster} name="roaster" type="text" placeholder="Roaster..."></input>
                            <input className="shadow col-md border-1 form-control m-2" onChange={handleOnChange} value={props.sortFilters.region} name="region" type="text" placeholder="Region..."></input>
                            <input className="shadow col-md border-1 form-control m-2" onChange={handleOnChange} value={props.sortFilters.grinder} name="grinder" type="text" placeholder="Grinder..."></input> 
                            <input className="shadow col-md border-1 form-control m-2" onChange={handleOnChange} value={props.sortFilters.machine} name="machine" type="text" placeholder="Machine..."></input>
                            </div>
                            <div className="row mx-auto text-center col-10 col-lg-3">
                                <div className="col-6 col-md-6 mx-auto">
                                    <label className="" for="roast">Roast: </label>
                                    <select className="shadow border form-select" onChange={handleOnChange} value={props.sortFilters.roast} id="roast" name="roast">
                                        <option value="" selected></option>
                                        <option value="Light">Light</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Dark">Dark</option>
                                    </select><br/>
                                </div>

                                <div className="col-6 col-md-6 mx-auto">
                                    <label className="" for="process">Process: </label>
                                    <select className="shadow border form-select" onChange={handleOnChange} value={props.sortFilters.process} id="process" name="process">
                                        <option value="" selected></option>
                                        <option value="Washed">Washed</option>
                                        <option value="Natural">Natural</option>
                                        <option value="Honey">Honey</option>
                                    </select><br/>
                                </div>
                            </div>

                            <div className="mt-0 mx-auto">
                            <input className="form-check-input" type="checkbox" onChange={handleOnChange} value={props.isLoggedIn? props.getUserId().replaceAll('-', ' '): ''} name="user_id" id="user_id" disabled={!props.isLoggedIn} />
                            <label className="form-check-label" for="user_id">
                                {!props.isLoggedIn? 'Login to filter yours': 'My Recipes'}
                            </label>
                            </div>
                            
    
                            <div className="row mx-auto mt-3"><button className="btn btn-primary" type="submit">Apply</button></div>

                            <div className="row mx-auto">
                                <button className="btn btn-light-custom col-6" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample">Close</button>
                                <button className="btn btn-light-custom col-6" type="button" onClick={() => {props.setSortFilters({}); resetForm();}}>Reset</button>
                            </div>

                            
                        </form>
                    </div>
                </div>

            </div>
    )
}

export default RecipeBtnGrp;