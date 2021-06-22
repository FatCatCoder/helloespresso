import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="container text-center">
      <h1 className="display-2">About</h1>
      <p>Here for all your espresso brewing needs.</p>

      

      <br></br>

      <div className="container col-xl-10 border border-2 p-5">
        <p>
          An espresso recipe and dialing application to help make brewing a
          simplier experience for all.
        </p>
        <p>Less waste, more coffee.</p>
        
        
        <div className="mb-2">
        <h4 className="">Lets get brewing</h4>
          <Link to="/register"><button className="btn btn-dark m-1" type="button">Register</button></Link>
          <Link to="/login"><button className="btn btn-dark m-1" type="button">Login</button></Link>
          <button className="btn btn-dark m-1" type="button">Logout</button>
      </div>

      </div>
    </div>
  )
}

export default About
