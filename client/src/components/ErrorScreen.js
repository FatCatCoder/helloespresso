import Coffee from "../assets/img/sad-coffee.gif"
import '../assets/ErrorScreen.scss'

function ErrorScreen({errorMessage = 'Error :('}) {
  
  return (
    <div className="text-center mx-auto">
        <h2 className="display-4">{errorMessage}</h2>
        <img src={Coffee} id="sad-coffee" className="img-fluid" alt=":( An error has occurred and the fun graphic won't load. What a bad day!"/>
        <p className="text-muted">@frannerd</p>
    </div>
  )
};

export default ErrorScreen