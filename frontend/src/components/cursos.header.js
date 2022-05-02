import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

function ShowHeader(){
    return(
        <nav className="navbar navbar-light bg-light shadow-sm  mb-1  justify-content-center">
                <Link to='/mod' className="navbar-brand">
                   SUCUS
                </Link>
        </nav>
        
    );
}

export default ShowHeader;