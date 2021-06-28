import { Link, useHistory } from 'react-router-dom';



function Navbar({currPage, setCurrPage, handleNav}) {
    const history = useHistory();
    let thisPage = window.location.pathname;
    console.log(currPage);
    
    

    



    return(
      <div id="navbar" className="text-center mx-auto d-flex justify-content-center border-bottom col-xl-4 col-lg-5 col-10 col-md-6 pt-2 pb-2">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link className={`nav-link ${currPage['/'] === true ? 'active': ''}`} name={'/'} active={false} aria-current="page" onClick={handleNav} to={"/"}>Pull</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${/(journal)/.test(thisPage) || /(journal)/.test(currPage) === true  ? 'active': ''}`} name={'/journal'} active={false} onClick={handleNav} to={"/journal"}>Journal</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${/(recipes)/.test(thisPage) || /(recipes)/.test(currPage) === true ? 'active': ''}`} name={'/recipes'} active={false} onClick={handleNav} to={"/recipes"}>Recipes</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${/(about)/.test(thisPage) === true ? 'active': ''}`} name={'/about'} active={false} onClick={handleNav} to={"/about"}>About</Link>
            </li>
          </ul>
        </div>
      )
}

export default Navbar;