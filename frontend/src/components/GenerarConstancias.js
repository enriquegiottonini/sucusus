import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom';

const GenerarConstancias = () => {

    const subirArchivo = () => {

    }

    const mostrarAlumnos = () => {

    }

    return (
        <div className = "w-100 h-100">
            <div className="align-items-left ms-3">
                <h3>Generar Constancias de Acreditación</h3>
            </div>
            <br></br>
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido paterno</th>
                    <th scope="col">Apellido materno</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>América</td>
                    <td>Rivera</td>
                    <td>Camacho</td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>Hisaki</td>
                    <td>Moreno</td>
                    <td>Hirata</td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <td>Luis Pablo</td>
                    <td>Flores</td>
                    <td>Guevara</td>
                    </tr>
                </tbody>
            </table>
            <br></br>
            <br></br>
            <footer class = "footer">
                <div class="container">
                    <div class="row no-gutters">
                        <div class="col-sm justify-content-start">
                            <Link to={{pathname: `/mod/SubirCSV`}}>
                                <a href="#" className="btn btn-primary float-left" >Subir CSV de alumnos</a>
                            </Link> 
                        </div>
                        <div class="col-sm float-right">
                            <Link to={{pathname: `/mod/GenerarConstancias`}}>
                                <a href="#" className="btn btn-primary ml-3 float-right" >Generar constancias</a>
                            </Link> 
                            <Link to={{pathname: `/mod/GenerarConstancias`}}>
                                <a href="#" className="btn btn-primary ml-3 float-right" >Seleccionar todos</a>
                            </Link> 
                        </div>
                    </div>
                </div>
            </footer>
        </div>
);
}

export default GenerarConstancias;
