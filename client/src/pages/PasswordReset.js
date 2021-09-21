import {useState} from 'react';
import { Link, Switch, Route, useRouteMatch} from "react-router-dom";
import '../assets/FormStyles.css'

// components
import PasswordResetToken from '../components/PasswordResetToken.js';

function PasswordReset() {
    let match = useRouteMatch();

    // form state & utils
    const [errors, setErrors] = useState({"success": false, "message": ""});
    const [success, setSuccess] = useState({"success": false, "message": ""});
    const [inputs, setInputs] = useState({
        usernameOrEmail: "",
    });

    const { usernameOrEmail } = inputs;

    const onchange = (e) => {
        setInputs({...inputs, [e.target.name]:e.target.value})
    };

    // 
    const onSubmitForm = async(e) => {
        e.preventDefault();

        try {
            const body = { usernameOrEmail };

            const response = await fetch('/api/password-reset', {
                method: "POST",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify(body)
            })

            const parseRes = response.json();
            if (!parseRes.success){
                return setErrors(parseRes)  
            }
            
            setSuccess(parseRes);

        } catch (error) {
            setErrors({"message": "500: Server Error", "success": false})
        }
    };

    return(
        <>
        <Switch>

            <Route exact path={match.path}>
            <div className="container text-center">
                <h1 className="display-2">Password Reset</h1>
                <form onSubmit={onSubmitForm} className="container mx-auto col-8 col-xl-5">
                    <input type="text" name="usernameOrEmail" placeholder="username or email" value={usernameOrEmail} onChange={e => onchange(e)} required={true} className={` form-control my-3 ${errors.message? 'input-error': ''}`} required/>
                    <button className="btn btn-secondary" type="submit">Reset Now</button>
                    <Link to={{pathname: "/register", state: {location: '/register', going: '/'}}}><button className="btn btn-secondary m-2" type="button">Register</button></Link>
                </form>
                {!errors.success? null: errors.message}
                {success.success? success.message: null}
            </div>
            </Route>

            <Route path={`${match.path}/:token`}>
                <PasswordResetToken />
            </Route>

        </Switch>
        </>
    )
}



export default PasswordReset;