import 'bootstrap/dist/css/bootstrap.css';
import React, {useState} from "react";
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { data, ready } from 'jquery';

const SubirCSV = () => {
    
    function student(name, father_last, mother_last) {
        this.name = name;
        this.father_last = father_last;
        this.mother_last = mother_last;
    }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const saveStudents = () => {
        setShow(true);

        let uploadFile = document.querySelector("#file");    

        let reader;
        if (document.getElementById('fileUpload').files != null && 
            document.getElementById('fileUpload').files[0] != null) {

            reader = new FileReader();
        
            reader.readAsText(document.getElementById('fileUpload').files[0]);

            reader.addEventListener('load', fileLoaded);
        } 
           
        
    }

    const fileLoaded = (e) => {
            let reader = e.target;

            if (reader.readyState === 2 /* DONE */ ) {
                console.log(reader.result);

                let data = reader.result;
                
                let i = data.indexOf('nombre, apellido_paterno, apellido_materno\n');
                if(i != -1) data = data.replace('nombre, apellido_paterno, apellido_materno\n', '');

                let students = [];
                let n = 0;

                i = data.indexOf(',');

                while (i != -1) {
                    let name = data.slice(0, i);
                    data = data.replace(name + ", ", "");

                    i = data.indexOf(',');
                    let fathers_last = data.slice(0,i);
                    data = data.replace(fathers_last + ", ", "");

                    i = data.indexOf('\n');
                    let mothers_last = data.slice(0,i);
                    data = data.replace(mothers_last + "\n", "");

                    students[n] = student(name, fathers_last, mothers_last);
                    n++;

                    console.log(name + " " + fathers_last + " " + mothers_last);
                    i = data.indexOf(',');
                }

            } else {
                console.log("reader not ready.");
            }
    }

    return (
        <div>
            <br/><br/>
            <div className="align-items-left ms-3">
                <h2>Agregar alumnos acreditados</h2>
                </div>
                <div>
                    <h5>Deberás agregar una lista de los alumnos que acreditaron el curso.</h5>
                    <h5>Indica el consejo divisional que aprobó esta lista, así como la fecha y el número de sesión.</h5>
                    <br></br>
                    <br></br>
                </div>
                <div className="row">
                    <div className="col ms-3">
                        <label> Consejo que aprobó la lista de acreditados </label>
                        <input type="text" className="form-control" id="consejo"/>
                    </div>
                    <div className="form-group col me-3">
                        <label> Fecha de reunion de Consejo </label>
                        <input type="date" className="form-control" id="fechasesion"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col mt-3 ms-3">
                        <label> Numero de sesión de consejo</label>
                        <input type="number" className="form-control" id="numsesion" ></input>
                    </div>
                    <div className="d-flex flex-column justify-content-end form-group col mt-3 me-3">
                        <input type="file" id="fileUpload" name="file" accept=".csv"></input>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col mt-3"/>
                    <div className="d-flex justify-content-end mt-3 ms-3">
                        <Button variant="primary" onClick={saveStudents}>
                            Agregar alumnos 
                        </Button>
                    </div>
                </div>
                <br></br>
                <br></br>


            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>Alumnos agregados exitosamente.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Los alumnos se han agregado a la base de datos exitosamente.
                    Haz click en terminar para regresar a la lista de alumnos del curso.
                </Modal.Body>
                <Modal.Footer>
                <Link to={{pathname: `/mod/GenerarConstancias`}}>
                <Button variant="primary">
                    Terminar 
                </Button>
                </Link>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default SubirCSV;