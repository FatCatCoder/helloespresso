import { useHistory } from 'react-router-dom';
import { useState } from 'react';


function Navbar(props) {
    const history = useHistory();

    const [currPage, setCurrPage] = useState({'/': true});

    const handleNav = (e) => {

        setCurrPage((prevProps) => ({
            [e.target.name]: true
        }));

        

        history.push(e.target.name);
    }


    return(
    <div id="navbar" className="text-center mx-auto d-flex justify-content-center border-bottom col-xl-2 col-10 col-md-5 pt-2 pb-2">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <a className={`nav-link ${currPage == {'/': true} ? 'active': ''}`} name={'/'} active={false} aria-current="page" onClick={handleNav}>Pull</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${currPage ? 'active': ''}`} name={'/journal'} active={false} onClick={handleNav}>Journal</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" name={'/recipes'} active={false} onClick={handleNav}>Recipes</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" name={'/about'} active={false} onClick={handleNav}>About</a>
          </li>
        </ul>
      </div>
    )
}

export default Navbar;