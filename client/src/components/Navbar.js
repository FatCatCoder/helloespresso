import { Link } from 'react-router-dom';
import {globalStore} from '../store.js';




function Navbar({currPage, handleNav}) {
    const currentPage = globalStore(state => state.currentPage);
    let thisPage = window.location.pathname;
    console.log("currPage", Object.keys(currPage)[0], "thisPage", thisPage, "currentPage", currentPage);

    return(
      <div id="navbar" className="text-center mx-auto d-flex justify-content-center border-bottom col-xl-4 col-lg-5 col-10 col-md-6 pt-2 pb-2">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link className={`nav-link ${currPage['/'] === true || thisPage === '/' ? 'active': ''}`} name={'/'}  aria-current="page" onClick={handleNav} to={"/"}>Pull</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${/(journal)/.test(thisPage) || /(journal)/.test(Object.keys(currPage)[0]) === true  ? 'active': ''}`} name={'/journal'} onClick={handleNav} to={"/journal"}>Journal</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${/(recipes)/.test(thisPage) || /(recipes)/.test(Object.keys(currPage)[0]) === true ? 'active': ''}`} name={'/recipes'}  onClick={handleNav} to={"/recipes"}>Recipes</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${/(about)/.test(thisPage) || /(about)/.test(Object.keys(currPage)[0]) === true ? 'active': ''}`} name={'/about'}  onClick={handleNav} to={"/about"}>About</Link>
            </li>
          </ul>
        </div>
      )
}

export default Navbar;