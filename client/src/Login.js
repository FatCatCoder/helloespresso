import {useState} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

function Login({setAuth}) {
    const history = useHistory();
    const { state } = useLocation();

    console.log(state.location);
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const { email, password } = inputs;

    const onchange = (e) => {
        setInputs({...inputs, [e.target.name]:e.target.value})
    };

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = { email, password };
            const response = await fetch('/login', {
                method: "POST",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify(body)
            })

            const parseRes = response.headers.get('Authorization');

            if (parseRes !== null){
              localStorage.setItem('Authorization', parseRes);
              setAuth(true);
              history.push(state.location);
              
            }

        } catch (error) {
            console.log(error.message)
        }
        
    };

    return(
        <>
        <div className="container text-center">
            <h1 className="display-2">Login</h1>
            <form onSubmit={onSubmitForm} className="container mx-auto col-8 col-xl-5">
                <input type="text" name="email" placeholder="email" value={email} onChange={e => onchange(e)} className="form-control my-3" pattern="\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b" required/>
                <input type="password" name="password" placeholder="password" value={password} onChange={e => onchange(e)} className="form-control my-3" required/>
                <button className="btn btn-secondary" type="submit">Log In</button>
                <Link to="/register"><button className="btn btn-secondary m-2" type="button">Register</button></Link>
            </form>
        </div>
        </>
    )
}



export default Login;