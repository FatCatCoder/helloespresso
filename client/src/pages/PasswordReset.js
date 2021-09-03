import {useState} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {globalStore} from '../store.js';
import '../assets/FormStyles.css'


function PasswordReset({setIsAuth}) {
    const setIsLoggedIn = globalStore(state => state.setIsLoggedIn)

    // routing after reset
    const history = useHistory();
    const { state } = useLocation();

    // form state & utils
    const [errors, setErrors] = useState({"boolean": false, "message": ""});
    const [inputs, setInputs] = useState({
        email: "",
    });

    const { email } = inputs;

    const onchange = (e) => {
        setInputs({...inputs, [e.target.name]:e.target.value})
    };

    // try login, set auth, redirect
    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = { email };
            const response = await fetch('/login', {
                method: "POST",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify(body)
            })

            const parseRes = response.headers.get('Authorization');
            

            if (parseRes !== null){
              localStorage.setItem('Authorization', parseRes);
              setIsAuth(true);
              setIsLoggedIn(true);
              if(state !== undefined){
                console.log(state)
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
            <h1 className="display-2">Password Reset</h1>
            <form onSubmit={onSubmitForm} className="container mx-auto col-8 col-xl-5">
                <input type="text" name="email" placeholder="username or email" value={email} onChange={e => onchange(e)} required={true} className={` form-control my-3 ${errors.message? 'input-error': ''}`} required/>
                <button className="btn btn-secondary" type="submit">Reset Now</button>
                <Link to={{pathname: "/register", state: {location: '/register', going: '/'}}}><button className="btn btn-secondary m-2" type="button">Register</button></Link>
            </form>
            {!errors.boolean? null: errors.message}
        </div>
        </>
    )
}



export default PasswordReset;