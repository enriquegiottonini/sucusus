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
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Perfil: 
        </h3>
      </header>

      <h4>Usuario</h4>

      <div>
        <label>
          <strong>ID: </strong>
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
        <Link to={"/mod/get/" + currentUser.id} className="badge badge-warning">
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
