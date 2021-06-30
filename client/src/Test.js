import {globalStore} from './store';


function Test(){
    const isValid = globalStore(state => state.checkValidToken);

    return(
    <div className="container text-center mx-auto">
        <button className="btn btn-primary" onClick={() => isValid()}>Click!</button>
    </div>
    )
};

export default Test