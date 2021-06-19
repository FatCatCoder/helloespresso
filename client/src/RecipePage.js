import { useParams } from "react-router";
import {useEffect, useState} from 'react';
// .split('-').reverse().join('/')

function RecipePage(props){
    var [refetch, setrefetch] = useState(false);
    let {id} = useParams();
    console.log(id)
/*
    useEffect(() => {
        hydrateData();
    }, [refetch]);
    */

      const hydrateData = async () => {
        var recipeObj = await fetchRecipe();
          console.log(recipeObj);
           
        
      }
      
      const fetchRecipe = async () => {
        const res = await fetch(`/recipes/${id}`)
        const data = await res.json()
        console.log('fetchRecipes data', data)
        return data
    }

    
    try{
        var recipeObj = props.recipe.find(obj => obj.id == id);
        console.log(recipeObj)
        if (typeof recipeObj == 'undefined') {
            var recipeObj = fetchRecipe();
          }
    }
    catch(undefined){
        console.log('yeah')
        //var recipeObj = fetchRecipe();
        //hydrateData();
        //setrefetch(!refetch);
    }
    //id -= 1;
    /*
    try{
        var dateRoasted = props.recipe[id].roastdate.split('-').reverse().join('-');
        var datePosted = props.recipe[id].postdate.split('-').reverse().join('-');
        console.log(dateRoasted, datePosted)
    }
    catch (error){
        var dateRoasted = props.recipe[id].roastdate
        var datePosted = props.recipe[id].postdate
    }
    */

    var dateRoasted = new Date(recipeObj.roastdate).toLocaleDateString();
    var datePosted = new Date(recipeObj.postdate).toLocaleDateString();


    //console.log('prop data: ', props.recipe[id], 'name:', props.recipe[id].Bean, 'id:', props.recipe[id].id, 'typeof:', typeof(props.recipe));
    
    return(
        <div className="container text-center mb-3">
            <div className="my-2">
                <h1 className="display-3 text-capitalize">{recipeObj.bean} - {recipeObj.roaster}</h1>
                <h2 className="text-muted text-capitalize">Region: {recipeObj.region}</h2>
                
            </div>
            
            
            <div className="container col-xl-4">
                <div className="row">
                    <p className="text-muted col-6 fs-6">Roast: {recipeObj.roast}</p>
                    <p className="text-muted col-6 fs-6">Process: {recipeObj.process}</p>
                </div>

                <div className="row">
                    <p className="text-muted col-6 fs-6">Roasted: {dateRoasted}</p>
                    <p className="text-muted col-6 fs-6">Posted: {datePosted}</p>
                </div>
            </div>

            <button type="button" class="btn btn-outline-danger" data-bs-toggle="button" aria-pressed="false">
                <i class="bi bi-heart-fill">Bussin' Button</i>     
            </button> 
            

            <div className="container col-xl-8 my-4">
                <div className="row bg-light border mx-auto justify-content-center">
                    <div className="col-4 col-sm-4 col-md-3 col-lg-3 col-xl-3 my-3">
                        <p className="bg-white p-2 py-2 shadow">Dose: {recipeObj.dose}g</p>
                        <p className="bg-white p-2 py-2 shadow">Yield: {recipeObj.yield}ml</p>
                    </div>
                    <div className="col-4 col-sm-4 col-md-3 col-lg-3 col-xl-3 my-3">
                        <p className="bg-white p-2 py-2 shadow">Time: {recipeObj.time}s</p>
                        <p className="bg-white p-2 py-2 shadow">Grind: <span className="p-1">#{recipeObj.grind}</span></p>
                    </div>
                    <p><span className="text-primary text-capitalize">Tasting Notes:</span> {recipeObj.tastingnotes}</p>
                </div>
            </div>
            

            <div className="container col-xl-8 mx-auto" id="infoBlock">
                <div className="row">
                    <div className="card p-0 col-6 col-md-6"><h6 className="card-header">Machine </h6> <p className="card-body text-capitalize">{recipeObj.machine}</p></div>
                    <div className="card p-0 col-6 col-md-6"><h6 className="card-header">Grinder </h6> <p className="card-body text-capitalize">{recipeObj.grinder}</p></div>                  
                </div>

                <div className="row">
                    <div className="card p-0 col-12 col-md-12"><h6 className="card-header">Notes </h6> <p className="card-body">{recipeObj.notes}</p></div>
                </div>
            </div>

        </div>
    )
}

export default RecipePage;