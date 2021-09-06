import {useState} from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import {globalStore} from '../store.js';
import '../assets/FormStyles.css'


function PasswordResetToken() {
    const setIsLoggedIn = globalStore(state => state.setIsLoggedIn)
    const getUserIdFromJWT = globalStore(state => state.getUserIdFromJWT)

    const { token } = useParams();
    const idFromToken = getUserIdFromJWT(token);

    // form state & utils
    const [errors, setErrors] = useState({"success": false, "message": ""});
    const [success, setSuccess] = useState({"success": false, "message": ""});
    const [inputs, setInputs] = useState({
        newPassword: "",
    });

    const { newPassword } = inputs;

    const onchange = (e) => {
        setInputs({...inputs, [e.target.name]:e.target.value})
    };

    // try login, set auth, redirect
    const onSubmitForm = async(e) => {
        e.preventDefault();

        try {
            const body = { newPassword, token };
            const response = await fetch(`/password-reset/${token}`, {
                method: "POST",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify(body)
            })

            const parseRes = response.json();
            
            if(!parseRes.success){
                setErrors(...parseRes)
            }

            setSuccess(...parseRes);

        } catch (error) {
            console.log(error.message)
            setErrors({message: "500: Server Error"})
        }
    };

        console.log(success);
        
    return(
        <>
        <div className="container text-center">
            <h1 className="display-2">New Password</h1>
            <form onSubmit={onSubmitForm} className="container mx-auto col-8 col-xl-5">
                <input type="text" name="newPassword" placeholder="Enter new password" value={newPassword} onChange={e => onchange(e)} required={true} className={` form-control my-3 ${errors.message? 'input-error': ''}`} required/>
                <button className="btn btn-secondary" type="submit">Update Now</button>
                <Link to={{pathname: `/password-reset/${token}`, state: {location: `/password-reset/${token}`, going: '/login'}}}><button className="btn btn-secondary m-2" type="button">Register</button></Link>
            </form>
            {!errors.success? null: errors.message}
            {success.success?? success.message}
        </div>
        </>
    )
}



export default PasswordResetToken;