import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddUser from "./AddUser";
import UserList from "./UserList";
import User from "./User";

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
      <header className="jumbotron">
        <h3>Un administrador puede modficar usuarios y agregrar Moderadores.</h3>
      </header>

      <Router>
      <nav className="navbar navbar-expand navbar-light bg-light shadow-sm  mb-1  justify-content-center">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/mod/get"} className="nav-link">
              Usuarios
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Agregar +
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/mod/get"]} component={UserList} />
          <Route exact path="/add" component={AddUser} />
          <Route path="/mod/get/:id" component={User} />
        </Switch>
      </div>
    </Router>


    </div>

  );
};

export default BoardAdmin;
