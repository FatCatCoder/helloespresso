import {useState} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {globalStore} from '../store.js';

function Register({setIsAuth}) {
    const history = useHistory();
    const { state } = useLocation();
    const setIsLoggedIn = globalStore(state => state.setIsLoggedIn)

    const [errors, setErrors] = useState({"boolean": false, "message": ""});
    const [success, setSuccess] = useState({"success": false, "message": ""});
    const [inputs, setInputs] = useState({
        "email": "",
        "password": "",
        "name": ""
    });
    const {email, password, name} = inputs;

    const onchange = (e) => {
        setInputs({...inputs, [e.target.name]:e.target.value});
    }

    // register, set auth, redirect
    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const body = {email, password, name};

            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-type": "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = response.headers.get('Authorization');

            if (parseRes !== null){
              localStorage.setItem('Authorization', parseRes);
              setIsAuth(true);
              setIsLoggedIn(true);
              setSuccess({"success": true, "message": "You are now Registered and logged in!"})
              history.push(state.going);
            }
            else{
                throw new Error('500');
            }

        } catch (error) {
            setErrors({message: "500: Server Error", boolean: "false"})
        }
    }

    return(
        <>
        <div className="container text-center">
            <h1 className="display-2">Register</h1>
            <form onSubmit={onSubmitForm} className="container mx-auto col-8 col-xl-5">
                <input type="text" name="name" placeholder="username" value={name} onChange={e => onchange(e)} className="form-control my-3" />
                <input type="email" name="email" placeholder="email" value={email} onChange={e => onchange(e)} className="form-control my-3" />
                <input type="password" name="password" placeholder="password" value={password} onChange={e => onchange(e)} className="form-control my-3" />
                <button className="btn btn-secondary" type="submit">Create Account</button>
                
                <Link to={{pathname: "/login", state: {location: '/login', going: '/about'}}}><button className="btn btn-secondary m-2" type="button">Login</button></Link>
            </form>
            {!errors.boolean? null: errors.message}
            {success.success?? success.message}
        </div>
        </>
    )
}

export default Register;