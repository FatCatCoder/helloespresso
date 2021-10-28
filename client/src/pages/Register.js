import {useState} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {globalStore} from '../store.js';
import '../assets/FormStyles.css'

function Register() {
    const history = useHistory();
    const { state } = useLocation();
    const setIsLoggedIn = globalStore(state => state.setIsLoggedIn)
    const globalToast = globalStore(state => state.globalToast)

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

            const parseHeader = response.headers.get('Authorization');
            const parseBody = await response.json();

            if(!parseBody?.success){
                return setSuccess(parseBody)
            }

            localStorage.setItem('Authorization', parseHeader);
            globalToast("You are now Registered and logged in!");
            setIsLoggedIn(true);
            history.push(state?.going || '/');

        } catch (error) {
            setSuccess({"message": "Something went wrong...", "success": "false"})
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