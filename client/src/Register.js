import {useState} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

function Register({setAuth}) {
    const history = useHistory();
    const { state } = useLocation();

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: ""
    });

    const {email, password, name} = inputs;

    const onchange = (e) => {
        setInputs({...inputs, [e.target.name]:e.target.value});
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const body = {email, password, name};

            const response = await fetch("/register", {
                method: "POST",
                headers: { "Content-type": "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = response.headers.get('Authorization');

            if (parseRes !== null){
              localStorage.setItem('Authorization', parseRes);
              setAuth(true);
              history.push(state.location);
            }

        } catch (error) {
            console.log(error.message);
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
                
                <Link to="/login"><button className="btn btn-secondary m-2" type="button">Login</button></Link>
            </form>
        </div>
        </>
    )
}

export default Register;