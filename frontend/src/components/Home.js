import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

import eventos from './Images/eventos.jpg'

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div>
      <div className="container">
        <header className="card m-6 text-center bg-primary text-white">
          <h1>SUCUS</h1>
          <h6>Sistema Único de Constancias de la Universidad de Sonora.</h6>
        </header>
      </div>

      <div class="card">
      <img class="card-img-top" src={eventos} alt="Eventos"></img>
        <div class="card-body">
          <h4 class="Eventos">Eventos formativos en la Unison</h4>
          <p class="card-text">Imparte Unison más de 135 eventos formativos para la enseñanza en entornos virtuales.</p>
          <a href="https://direcciondecomunicacion.unison.mx/imparte-unison-mas-de-135-eventos-formativos-para-la-ensenanza-en-entornos-virtuales/" target="blank" class="card-link">Noticia completa</a>
        </div>
      </div>
  </div>
  );
};

export default Home;
