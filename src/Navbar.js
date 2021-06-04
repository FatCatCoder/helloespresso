import { Link, useHistory } from 'react-router-dom';



function Navbar({currPage, setCurrPage, handleNav}) {
    const history = useHistory();
    let thisPage = window.location.pathname;
    
    

    



    return(
      <div id="navbar" className="text-center mx-auto d-flex justify-content-center border-bottom col-xl-3 col-lg-4 col-10 col-md-6 pt-2 pb-2">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link className={`nav-link ${currPage['/'] === true ? 'active': ''}`} name={'/'} active={false} aria-current="page" onClick={handleNav} to={"/"}>Pull</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${/(journal)/.test(thisPage) === true  ? 'active': ''}`} name={'/journal'} active={false} onClick={handleNav} to={"/journal"}>Journal</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${/(recipes)/.test(thisPage) === true ? 'active': ''}`} name={'/recipes'} active={false} onClick={handleNav} to={"/recipes"}>Recipes</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${/(about)/.test(thisPage) === true ? 'active': ''}`} name={'/about'} active={false} onClick={handleNav} to={"/about"}>About</Link>
            </li>
          </ul>
        </div>
      )

/*
    return(
    <div id="navbar" className="text-center mx-auto d-flex justify-content-center border-bottom col-xl-3 col-lg-4 col-10 col-md-6 pt-2 pb-2">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <a className={`nav-link ${currPage['/'] == true ? 'active': ''}`} name={'/'} active={false} aria-current="page" onClick={handleNav}>Pull</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${currPage['/journal'] == true ? 'active': ''}`} name={'/journal'} active={false} onClick={handleNav}>Journal</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${currPage['/recipes'] == true ? 'active': ''}`} name={'/recipes'} active={false} onClick={handleNav}>Recipes</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${currPage['/about'] == true ? 'active': ''}`} name={'/about'} active={false} onClick={handleNav}>About</a>
          </li>
        </ul>
      </div>
    )
*/
}

export default Navbar;