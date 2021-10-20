import {useState} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {globalStore} from '../store.js';
import '../assets/FormStyles.css'

function Register({setIsAuth}) {
    const history = useHistory();
    const { state } = useLocation();
    const setIsLoggedIn = globalStore(state => state.setIsLoggedIn)

    const [success, setSuccess] = useState({"success": false, "message": ""});
    const [inputs, setInputs] = useState({
        "email": "",
        "password": "",
        "passwordConfirm": "",
        "name": ""
    });
    const {email, password, passwordConfirm, name} = inputs;

    const onchange = (e) => {
        setInputs({...inputs, [e.target.name]:e.target.value});
    }

    // register, set auth, redirect
    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const body = {email, password, name, passwordConfirm};

            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-type": "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = response.headers.get('Authorization');

            const parseJson = await response.json();      

            if(!parseJson.success){
                return setSuccess(parseJson)
            }

            localStorage.setItem('Authorization', parseRes);
            setIsAuth(true);
            setIsLoggedIn(true);
            setSuccess({"success": true, "message": "You are now Registered and logged in!"})
            history.push(state?.going || '/');

        } catch (error) {
            setSuccess({"message": "500: Server Error", "success": "false"})
        }
    }

    return(
        <>
        <div className="container text-center">
            <h1 className="display-2">Register</h1>
            <form onSubmit={onSubmitForm} className="container mx-auto col-8 col-xl-5">
                <input type="text" name="name" placeholder="username" value={name} onChange={e => onchange(e)} className={`form-control my-3 ${!success.success && /name/.test(success.message)? 'input-error': ''}`} />
                <input type="email" name="email" placeholder="email" value={email} onChange={e => onchange(e)} className={`form-control my-3 ${!success.success && /email/.test(success.message)? 'input-error': ''}`} />
                <input type="password" name="password" placeholder="password" value={password} onChange={e => onchange(e)} className={`form-control my-3 ${!success.success && /Password/.test(success.message)? 'input-error': ''}`} />
                <input type="password" name="passwordConfirm" placeholder="confirm password" value={passwordConfirm} onChange={e => onchange(e)} className={`form-control my-3 ${!success.success && /Password/.test(success.message)? 'input-error': ''}`} />
                <button className="btn btn-secondary" type="submit">Create Account</button>
                
                <Link to={{pathname: "/login", state: {location: '/login', going: '/about'}}}><button className="btn btn-secondary m-2" type="button">Login</button></Link>
            </form>
            {success.success? success.message: success.message.length? success.message : null }
        </div>
        </>
    )
}

export default Register;