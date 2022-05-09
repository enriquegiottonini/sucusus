import React from "react";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import User from "./User";

import { useSelector } from "react-redux";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">

      <div>
        <div class="jumbotron jumbotron-fluid">
          <div class="container justify-content-center align-items-center h-100">
            <h1 class="display-4">Panel de {currentUser.username}</h1>
            <p class="lead">
            Puedes editar o eliminar tu cuenta.
            </p>
          </div>
        </div>
      </div>

      <div>
        <label>
          <strong>Id: </strong>
        </label>{" "}
        {currentUser.id}
      </div>

      <div>
        <label>
          <strong>User:</strong>
        </label>{" "}
        {currentUser.username}
      </div>

      <div>
        <label>
          <strong>Nombre:</strong>
        </label>{" "}
        {currentUser.nombre +
          " " +
          currentUser.apellido_p +
          " " +
          currentUser.apellido_m}
      </div>

      <div>
        <label>
          <strong>Correo:</strong>
        </label>{" "}
        {currentUser.email}
      </div>
      <Router>
        <Link to={"/mod/get/" + currentUser.id} className="btn badge-warning">
          Editar
        </Link>
        <Switch>
          <Route path="/mod/get/:id" component={User} />
        </Switch>
      </Router>
    </div>
  );
};

export default Profile;
