import {useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import '../assets/FormStyles.css'


function PasswordResetToken() {

    let { token } = useParams();

    // form state & utils
    const [success, setSuccess] = useState({"success": false, "message": ""});
    const [inputs, setInputs] = useState({
        newPassword: "", newPasswordReEntry: ""
    });

    const { newPassword, newPasswordReEntry } = inputs;

    const onchange = (e) => {
        setInputs({...inputs, [e.target.name]:e.target.value})
    };

    // try login, set auth, redirect
    const onSubmitForm = async(e) => {
        e.preventDefault();

        try {
            const body = { newPassword, newPasswordReEntry, token };
            if(newPassword !== newPasswordReEntry){
                return setSuccess({"message": "Passwords do not match", "success": false})
            }

            const response = await fetch(`/api/password-reset/${token}`, {
                method: "POST",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify(body)
            })

            const parseRes = await response.json();
            
            if(!parseRes.success){
                setSuccess(parseRes)
            }

            setSuccess(parseRes);

        } catch (error) {
            setSuccess({"message": "Server Error", "success": false})
        }
    };
    
        
    return(
        <>
        <div className="container text-center">
            <h1 className="display-2">New Password</h1>
            <form onSubmit={onSubmitForm} className="container mx-auto col-8 col-xl-5">
                <input type="text" name="newPassword" placeholder="Enter new password" value={newPassword} onChange={e => onchange(e)} required={true} className={` form-control my-3 ${!success.success && success.message? 'input-error': ''}`} />
                <input type="text" name="newPasswordReEntry" placeholder="Enter new password" value={newPasswordReEntry} onChange={e => onchange(e)} required={true} className={` form-control my-3 ${!success.success && success.message? 'input-error': ''}`} />
                <button className="btn btn-secondary" type="submit">Update Now</button>
                <Link to={{pathname: `/login`, state: {location: '/login', going: '/'}}}><button className="btn btn-secondary m-2" type="button">Login</button></Link>
            </form>
            {success.success? success.message: success.message.length? success.message : null }
        </div>
        </>
    )
}



export default PasswordResetToken;