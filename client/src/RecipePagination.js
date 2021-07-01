import { useState } from "react";
import { PaginationItem } from "reactstrap";

function RecipePagination({ recipesPerPage, totalRecipes, paginate, ...other}) {
    const pageNumbers = [];
    const [currPageNum, setCurrPageNum] = useState(1);

    for(let i=1; i <= Math.ceil(totalRecipes / recipesPerPage); i++){
        pageNumbers.push(i);
    }

    console.log(currPageNum, pageNumbers);

    // on page change send page number to fetch recipes 
    const changePage = async(number) => {
        (function () {
            console.log(number);
            setCurrPageNum(number);
            paginate(number);
        } ());

        
        const alreadyFetched = () => {
            return other.myRecipes.includes(other.myRecipes.find(x => x["page"] === number))
        };

        console.log(alreadyFetched());
        if(!alreadyFetched()){
        

        const data = await other.fetchRecipes(number);
        console.log(data)
        
        other.setMyRecipes([...other.myRecipes, {"page": number, "recipes" : data}]);
        console.log(other.myRecipes)
        }
           
    }


    const arrowPageUp = (number) => {
        if(currPageNum != Math.ceil(totalRecipes / recipesPerPage)){
            
            paginate(currPageNum+1);
            setCurrPageNum(number+1);
        }
    }

    const arrowPageDown = (number) => {
        if(currPageNum != 1){
            
            paginate(currPageNum-1);
            setCurrPageNum(number-1);
        }
    }

    /*
    const arrowPageUp = (number) => {
        if(currPageNum == Math.ceil(totalRecipes / recipesPerPage)){
            console.log('page limit reached');
        }
        else{
            setCurrPageNum(number+1);
            paginate(currPageNum);
        }
    }

    const arrowPageDown = (number) => {
        if(currPageNum == 1){
            console.log('page limit reached');
        }
        else{
            setCurrPageNum(number-1);
            paginate(currPageNum);
        }
    }

    */

    return(
        <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center m-3">
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous" onClick={() => arrowPageDown(currPageNum)}>
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>

                    {pageNumbers.map(number => (
                        <li key={number} className="page-item"><a onClick={() => changePage(number)}className="page-link" href="#">{number}</a></li>
                    ))}
                    
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next" onClick={() => arrowPageUp(currPageNum)}>
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
    )
    
}

export default RecipePagination;