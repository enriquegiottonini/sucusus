import React, {Component} from "react";
import {Route, Link, Switch} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import AddCurso from "../components/cursos.add";
import ShowHeader from "../components/cursos.header";
import ModificarCurso from "../components/cursos.modificar";
import ListaCursos from "../components/cursos.lista";
function Cursos() {
  return (
    <div className="Cursos">
      <div>
        <Switch>
          <Route exact path="/mod/AgregarCurso" component={AddCurso}/>
          <Route exact path="/mod" component={ListaCursos}/>
          <Route exact path="/mod/ModificarCurso/:id" component={ModificarCurso}/>
        </Switch>
      </div>
    </div>
  );
}

export default Cursos;