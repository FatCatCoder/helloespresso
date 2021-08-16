import Coffee from "../img/sad-coffee.gif"
import './ErrorScreen.scss'

function ErrorScreen({errorMessage = 'Error :('}) {
  
  return (
    <div className="text-center mx-auto">
        <h2 className="display-4">{errorMessage}</h2>
        <img src={Coffee} id="sad-coffee" className="img-fluid"/>
    </div>
  )
};

export default ErrorScreen