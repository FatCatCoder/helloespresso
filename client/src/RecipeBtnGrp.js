import {useState} from 'react';
function RecipeBtnGrp(props){

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
    
    return(
        <div className="container border mx-auto mb-3">
                <button onClick={props.goTo} className="btn btn-primary m-2">New</button>

                <div className="btn-group m-2">
                <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Sort
                </button>
                <ul className="dropdown-menu">
                    

                    <li><a className="dropdown-item" onClick={() => {props.setSortFilters((filters) => ({...filters, "sortBy": "postdate DESC"})); props.setTogglePost(!props.togglePost);}}><i className="bi bi-arrow-down"></i> Newest Recipe</a></li>
                    <li><a className="dropdown-item" onClick={() => {props.setSortFilters((filters) => ({...filters, "sortBy": "postdate ASC"})); props.setTogglePost(!props.togglePost);}}><i className="bi bi-arrow-up"></i> Oldest Recipe</a></li>                
                    <li><a className="dropdown-item" onClick={() => {props.setSortFilters((filters) => ({...filters, "sortBy": "roastdate DESC"})); props.setToggleRoast(!props.toggleRoast);}}><i className="bi bi-arrow-down"></i> Fresh Roast</a></li>
                    <li><a className="dropdown-item" onClick={() => {props.setSortFilters((filters) => ({...filters, "sortBy": "roastdate ASC"})); props.setToggleRoast(!props.toggleRoast);}}><i className="bi bi-arrow-up"></i> Oldest Roast</a></li>
                    
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
                        <form autoComplete="off" onSubmit={handleSubmit} class="mx-auto text-center" id="filterForm">
                            
                            <input className="shadow border-1 m-2" list="beanList" onChange={handleOnChange} value={props.sortFilters.bean} name="bean" type="text" placeholder="Bean/Name..."></input>
                            <input className="shadow border-1 m-2" onChange={handleOnChange} value={props.sortFilters.roaster} name="roaster" type="text" placeholder="Roaster..."></input>
                            <input className="shadow border-1 m-2" onChange={handleOnChange} value={props.sortFilters.region} name="region" type="text" placeholder="Region..."></input>
                            <input className="shadow border-1 m-2" onChange={handleOnChange} value={props.sortFilters.grinder} name="grinder" type="text" placeholder="Grinder..."></input> 
                            <input className="shadow border-1 m-2" onChange={handleOnChange} value={props.sortFilters.machine} name="machine" type="text" placeholder="Machine..."></input>
                          
                            <div className="row mx-auto text-center col-4">
                                <div className="col-8 col-md-4 mx-auto">
                                    <label className="" for="roast">Roast: </label>
                                    <select className="shadow border" onChange={handleOnChange} value={props.sortFilters.roast} id="roast" name="roast">
                                        <option value="" selected></option>
                                        <option value="Light">Light</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Dark">Dark</option>
                                    </select><br/>
                                </div>

                                <div className="col-8 col-md-4 mx-auto">
                                    <label className="" for="process">Process: </label>
                                    <select className="shadow border" onChange={handleOnChange} value={props.sortFilters.process} id="process" name="process">
                                        <option value="" selected></option>
                                        <option value="Washed">Washed</option>
                                        <option value="Natural">Natural</option>
                                        <option value="Honey">Honey</option>
                                    </select><br/>
                                </div>
                            </div>

                            <div className="row mt-3"><button className="btn btn-primary" type="submit">Apply</button></div>

                            <div className="row">
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