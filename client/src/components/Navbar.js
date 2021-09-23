import { Link } from 'react-router-dom';
import {globalStore} from '../store.js';

function Navbar({currPage, handleNav}) {
    const currentPage = globalStore(state => state.currentPage);
    console.log("currPage", Object.keys(currPage)[0], "currentPage", currentPage);

    return(
      <div id="navbar" className={`text-center mx-auto d-flex justify-content-center col-xl-4 col-lg-5 col-10 col-md-6 pt-2 pb-2 ${/(about)/.test(currentPage) || /(about)/.test(Object.keys(currPage)[0]) === true ? '': 'border-bottom'}`}>
          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link className={`nav-link ${/^\/$/.test(currentPage) || /^\/$/.test(Object.keys(currPage)[0]) === true  ? 'active': ''}`} name={'/'}  aria-current="page" onClick={handleNav} to={"/"}>Pull</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${/(journal)/.test(currentPage) || /(journal)/.test(Object.keys(currPage)[0]) === true  ? 'active': ''}`} name={'/journal'} onClick={handleNav} to={"/journal"}>Journal</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${/(recipes)/.test(currentPage) || /(recipes)/.test(Object.keys(currPage)[0]) === true ? 'active': ''}`} name={'/recipes'}  onClick={handleNav} to={"/recipes"}>Recipes</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${/(about)/.test(currentPage) || /(about)/.test(Object.keys(currPage)[0]) === true ? 'active': ''}`} name={'/about'}  onClick={handleNav} to={"/about"}>About</Link>
            </li>
          </ul>
        </div>
      )
}

export default Navbar;