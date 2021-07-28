
import { useState, useEffect } from "react";
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import e from "cors";


function Test({currPage = 1, setCurrPage, totalItems = 150, itemsPerPage = 10}){
    const pageNumbers = [];

    let numberOfPages =  Math.ceil(totalItems / itemsPerPage);

    for(let i=1; i <= numberOfPages; i++){
        pageNumbers.push(i);
    }

    const changePage = () => {
        currPage !== 1? setCurrPage(currPage++): null;
    }


    return(

    <div className="container text-center mx-auto">
        <h1>pages</h1>
        <ButtonGroup className="col-8 col-lg-4" aria-label="Basic example">
            <Button variant="outline-secondary text-primary p-0"><i class="bi bi-chevron-left" /></Button>

                <FormControl className="rounded-0 pe-2 col outline-secondary" type="number" min="1" max={numberOfPages} placeHolder={currPage + " of " + numberOfPages} />
                
                <Button variant="outline-secondary text-primary p-0" type="submit" id="gotoButton"><i class="bi bi-search"></i></Button>

            <Button variant="outline-secondary text-primary p-0"><i class="bi bi-chevron-right" /></Button>
        </ButtonGroup>
        <p className="text-muted">@espresso/cat2021</p>

    </div>
    )
};

export default Test