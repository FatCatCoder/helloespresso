import { useState } from 'react';
import { Link } from 'react-router-dom';

// new recipe, refresh, and filter & sort buttons
function RecipeBtnGrp(props){

    // copy to local state
    const [sortUsed, setSortUsed] = useState(null);
    const [myRecipesChecked, setMyRecipesChecked] = useState(props.sortFilters.user_id ? true:false);
    const [likedChecked, setLikedChecked] = useState(props.sortFilters.liked_by_user_id ? true:false);

    // form data updates
    const handleOnChange = (e) => {
        props.setSortFilters({
            ...props.sortFilters,
            [e.target.name]: e.target.value
        });
    }
        // change local state, update global
    const handleCheckboxOnChange = (e) => {
        e.target.name === 'user_id'? setMyRecipesChecked(e.target.checked) : setLikedChecked(e.target.checked);
        
        if(e.target.checked){
            props.setSortFilters({
                ...props.sortFilters,
                [e.target.name]: e.target.value
            })
        }
        else if(e.target.checked === false){
            // eslint-disable-next-line
            props.setSortFilters((delete props.sortFilters[e.target.name], { 
                ...props.sortFilters
            }));
        }
    };

    // form
    const handleSubmit = async (event) => {
        event.preventDefault();
        props.setRefresh(true);
    }

    const resetForm = () => { 
        document.getElementById("filterForm").reset();
      }

    return(
        <div className="container border mx-auto mb-3">
                <button onClick={props.goTo} className="btn btn-primary">New</button>

                <button className="btn btn-primary m-2" type="button" data-bs-toggle="collapse" data-bs-target="#sortCollapse" aria-expanded="false" aria-controls="sortCollapse">
                    Sort
                    <i className="bi bi-chevron-expand"></i>
                </button>

                <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#filterCollapse" aria-expanded="false" aria-controls="filterCollapse">
                    Filter 
                    <i className="bi bi-chevron-expand"></i>
                </button>
        
                <button className="btn btn-primary m-2 float-right" onClick={() => props.setRefresh(!props.refresh)} >
                    <i className="bi bi-arrow-repeat"></i>
                </button>


                <div className="collapse" id="sortCollapse">
                    <div className="card card-body border-0">
                        <div className="list-group container-sm mx-auto">
                            <button className={`list-group-item ${sortUsed === "postdate DESC"? 'active': ''}`} onClick={() => {props.setSortFilters(({...props.sortFilters, "sortBy": "postdate DESC"})); setSortUsed("postdate DESC");}}><i className="bi bi-arrow-down"></i> Newest Recipe</button>
                            <button className={`list-group-item ${sortUsed === "postdate ASC"? 'active': ''}`} onClick={() => {props.setSortFilters(({...props.sortFilters, "sortBy": "postdate ASC"})); setSortUsed("postdate ASC");}}><i className="bi bi-arrow-up"></i> Oldest Recipe</button>                
                            <button className={`list-group-item ${sortUsed === "roastdate DESC"? 'active': ''}`} onClick={() => {props.setSortFilters(({...props.sortFilters, "sortBy": "roastdate DESC"})); setSortUsed("roastdate DESC");}}><i className="bi bi-arrow-down"></i> Fresh Roast</button>
                            <button className={`list-group-item ${sortUsed === "roastdate ASC"? 'active': ''}`} onClick={() => {props.setSortFilters(({...props.sortFilters, "sortBy": "roastdate ASC"})); setSortUsed("roastdate ASC");}}><i className="bi bi-arrow-up"></i> Oldest Roast</button>
                            <button className={`list-group-item ${sortUsed === "popular DESC"? 'active': ''}`} onClick={() => {props.setSortFilters(({...props.sortFilters, "sortBy": "popular DESC"})); setSortUsed("popular DESC");}}><i className="bi bi-heart"></i> Popular</button>
                        </div>
                    </div>
                </div>

                <div className="collapse" id="filterCollapse">
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
                                    <label className="" htmlFor="roast">Roast: </label>
                                    <select className="shadow border form-select" onChange={handleOnChange} defaultValue={""} value={props.sortFilters.roast} id="roast" name="roast">
                                        <option value=""></option>
                                        <option value="Light">Light</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Dark">Dark</option>
                                    </select><br/>
                                </div>

                                <div className="col-6 col-md-6 mx-auto">
                                    <label className="" htmlFor="process">Process: </label>
                                    <select className="shadow border form-select" onChange={handleOnChange} defaultValue={""} value={props.sortFilters.process} id="process" name="process">
                                        <option value=""></option>
                                        <option value="Washed">Washed</option>
                                        <option value="Natural">Natural</option>
                                        <option value="Honey">Honey</option>
                                    </select><br/>
                                </div>
                            </div>
                            
                            <div className="mt-0 mx-auto row col-6">
                            {!props.isLoggedIn?
                                <Link className="btn btn-light-custom" to={{pathname: "/login", state: {location: "/recipes", going: "/recipes"}}}>Login for more filters</Link> 
                            :
                                <>
                                <div className="col-6">
                                    <input className="form-check-input" type="checkbox" onChange={handleCheckboxOnChange} value={props.isLoggedIn? props.getUserId().replaceAll('-', ' '): ''} name="user_id" id="user_id" disabled={!props.isLoggedIn} checked={myRecipesChecked} />
                                    <label className="form-check-label" htmlFor="user_id">My Recipes</label>
                                </div>

                                <div className="col-6">
                                    <input className="form-check-input" type="checkbox" onChange={handleCheckboxOnChange} value={props.isLoggedIn? props.getUserId().replaceAll('-', ' '): ''} name="liked_by_user_id" id="liked_by_user_id" disabled={!props.isLoggedIn} checked={likedChecked} />
                                    <label className="form-check-label" htmlFor="liked_by_user_id">Loved Recipes</label>
                                </div>
                                </>
                            }
                            </div>
                            <div className="row mx-auto mt-3"><button className="btn btn-primary rounded-top rounded-0" type="submit">Apply</button></div>

                            <div className="row mx-auto rounded-bottom btn-light-custom m-0 p-0">
                                <button className="btn btn-light-custom col-6" type="button" data-bs-toggle="collapse" data-bs-target="#filterCollapse">Close</button>
                                <button className="btn btn-light-custom col-6" type="button" onClick={() => {props.setSortFilters({}); resetForm();}}>Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    )
}

export default RecipeBtnGrp;