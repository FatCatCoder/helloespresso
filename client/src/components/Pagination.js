import { useState } from "react";
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'


function Pagination({currPage, setCurrPage, totalItems, itemsPerPage, className}){
    const [newPage, setNewPage] = useState(undefined);

    let numberOfPages =  Math.ceil(totalItems / itemsPerPage);

    const handleInputChange = (e) =>{
        setNewPage(parseInt(e.target.value));
    }

    const handleSubmit = e => {
        e.preventDefault();
        
        if(Number.isInteger(newPage) && (newPage > 0 && newPage <= numberOfPages)){
            console.log(true)
            setCurrPage(newPage);
            setNewPage('');
        }
    }

    return(

    <div className={className}>
        <ButtonGroup className="col-8 col-lg-3">
            <Button variant="outline-secondary text-primary p-0" onClick={() => {if(currPage !== 1){setCurrPage(--currPage)}}} ><i className="bi bi-chevron-left" /></Button>
                <form className="col-6 row m-0 outline-secondary rounded-0" onSubmit={handleSubmit}>
                    <FormControl className="rounded-0 pe-2 col text-center outline-secondary" type="number" min="1" max={numberOfPages} placeholder={currPage + " of " + numberOfPages} value={newPage} onChange={handleInputChange} />
                    <Button variant="outline-secondary rounded-0 col-4 text-primary p-0" type="submit" id="gotoButton"><i className="bi bi-search"></i></Button>
                </form>
            <Button variant="outline-secondary text-primary p-0" onClick={() => {if(currPage !== numberOfPages){setCurrPage(++currPage)}}}><i className="bi bi-chevron-right" /></Button>
        </ButtonGroup>

    </div>
    )
};

export default Pagination