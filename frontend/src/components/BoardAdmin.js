import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddUser from "./AddUser";
import UserList from "./UserList";
import User from "./User";
import Register from "./Register";

const BoardAdmin = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <div className="container">

      <div>
        <div class="jumbotron jumbotron-fluid">
          <div class="container justify-content-center align-items-center h-100">
            <h1 class="display-4">Panel de Administrador</h1>
            <p class="lead">
            Puedes agregar, modificar y eliminar cuentas de
            Moderadores de Eventos Formativos.
            </p>
          </div>
        </div>
      </div>

      <Router>
        <nav className="navbar-expand navbar-light bg-light  shadow-sm  mb-1  justify-content-center">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/mod/get"} className="nav-link">
                Cuentas
              </Link>
            </li>
{/*             <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Agregar
              </Link>
            </li> */}

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Agregar
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/mod/get"]} component={UserList} />
            <Route exact path="/add" component={AddUser} />
            <Route path="/mod/get/:id" component={User} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default BoardAdmin;
