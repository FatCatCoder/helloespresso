import {useState} from 'react';
import { Link, useHistory, useLocation, useParams, Switch, Route } from 'react-router-dom';
import {globalStore} from '../store.js';
import '../assets/FormStyles.css'


function Login(props) {
    const setIsLoggedIn = globalStore(state => state.setIsLoggedIn)
    const setCurrentPage = globalStore(state => state.setCurrentPage);

    // routing after login
    const history = useHistory();
    const location = useLocation();
    const params = useParams();
    let {state} = location.state || { from: { pathname: "/" } };
    console.log(location);
    console.log(state);
    console.log(params);
    console.log(window.location.pathname);
    console.log(props);
    
    
    


    // form state & utils
    const [errors, setErrors] = useState({"boolean": false, "message": ""});
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const { email, password } = inputs;

    const onchange = (e) => {
        setInputs({...inputs, [e.target.name]:e.target.value})
    };

    // try login, set auth, redirect
    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = { email, password };
            const response = await fetch('/api/login', {
                method: "POST",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify(body)
            })

            const parseRes = response.headers.get('Authorization');
            

            if (parseRes !== null){
              localStorage.setItem('Authorization', parseRes);
              setIsLoggedIn(true);
              
              
              if(state !== undefined){
                
                console.log('state going',state.going)
                setCurrentPage(state.going)
                history.push(state.going);
              }
              else{
                history.push('/');
              }
            }
            else if (response.status === 401){
                const getErrors = async () => {
                    let resErr = await response.json();
                    setErrors({...resErr})
                }
                getErrors();   
            }
        } catch (error) {
            console.log(error.message)
            setErrors({message: "500: Server Error"})
        }
    };

    return(
        <>
        <div className="container text-center">
            <h1 className="display-2">Login</h1>
            <form onSubmit={onSubmitForm} className="container mx-auto col-8 col-xl-5">
                <input type="text" name="email" placeholder="username or email" value={email} onChange={e => onchange(e)} className={` form-control my-3 ${errors.message? 'input-error': ''}`} />
                <input type="text" name="password" placeholder="password" value={password} onChange={e => onchange(e)} className={` form-control my-3 ${errors.message? 'input-error': ''}`} required/>
                
                <div className="col">
                    <button className="btn btn-secondary" type="submit">Log In</button>
                    <Link to={{pathname: "/register", state: {location: '/register', going: '/about'}}}><button className="btn btn-secondary m-2" type="button">Register</button></Link>
                </div>

                <Link to={{pathname: "/password-reset", state: {location: '/login', going: '/login'}}}><button className="btn text-muted border-0" type="button">Forgot password?</button></Link>
            </form>
            {!errors.boolean? null: errors.message}
        </div>
        </>
    )
}



export default Login;