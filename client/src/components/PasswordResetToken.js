import {useState} from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import {globalStore} from '../store.js';
import '../assets/FormStyles.css'


function PasswordResetToken() {
    const setIsLoggedIn = globalStore(state => state.setIsLoggedIn)
    const getUserIdFromJWT = globalStore(state => state.getUserIdFromJWT)

    // routing after reset
    const history = useHistory();
    const { state } = useLocation();
    
    const { token } = useParams();
    const idFromToken = getUserIdFromJWT(token);

    // form state & utils
    const [errors, setErrors] = useState({"boolean": false, "message": ""});
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

            const parseRes = response.headers.get('Authorization');
            

            if (parseRes !== null){
              localStorage.setItem('Authorization', parseRes);
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
            <h1 className="display-2">New Password</h1>
            <form onSubmit={onSubmitForm} className="container mx-auto col-8 col-xl-5">
                <input type="text" name="newPassword" placeholder="Enter new password" value={newPassword} onChange={e => onchange(e)} required={true} className={` form-control my-3 ${errors.message? 'input-error': ''}`} required/>
                <button className="btn btn-secondary" type="submit">Update Now</button>
                <Link to={{pathname: `/password-reset/${token}`, state: {location: `/password-reset/${token}`, going: '/login'}}}><button className="btn btn-secondary m-2" type="button">Register</button></Link>
            </form>
            {!errors.boolean? null: errors.message}
        </div>
        </>
    )
}



export default PasswordResetToken;