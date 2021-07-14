import {useState, useEffect} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';


function Login({setAuth, setCurrPage, currPage}) {
    const history = useHistory();
    var { state } = useLocation();
    console.log(state.location);

    const [errors, setErrors] = useState({"boolean": false, "message": ""});

    useEffect(() => {
        console.log(state.location);
        setCurrPage(state.location)
        console.log(currPage);
    }, [state])
    
    
    //console.log(state.location);
    //console.log(currPage);

    const jwtDecode = () => {
        const token = localStorage.getItem('Authorization');
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64)).user.id;
    }

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
              history.push(state.going);
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
        }
    };

    return(
        <>
        <div className="container text-center">
            <h1 className="display-2">Login</h1>
            <form onSubmit={onSubmitForm} className="container mx-auto col-8 col-xl-5">
                <input type="text" name="email" placeholder="username or email" value={email} onChange={e => onchange(e)} className="form-control my-3" />
                {/*pattern="\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b" required*/}
                <input type="password" name="password" placeholder="password" value={password} onChange={e => onchange(e)} className="form-control my-3" required/>
                <button className="btn btn-secondary" type="submit">Log In</button>
                <Link to="/register"><button className="btn btn-secondary m-2" type="button">Register</button></Link>
            </form>
            {!errors.boolean? null: errors.message}
        </div>
        </>
    )
}



export default Login;