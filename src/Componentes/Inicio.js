import React, { Component } from "react";
import axios from "axios";
import Global from "./../Global";
import "./Inicio.css";

export default class Inicio extends Component {
  cajaNombreRef = React.createRef();
  state = {
    repos: [],
    status: false,
    imagen: "",
    mensaje: "",
  };

  cargarRepositorios = (e) => {
    e.preventDefault();
    let nombre = this.cajaNombreRef.current.value;
    if (nombre === "") {
      this.setState({ mensaje: "El usuario no puede estar vacio" });
    } else {
      this.setState({ mensaje: "" });
      let request = "users/" + nombre + "/repos";
      axios.get(Global.github + request).then((res) => {
        this.setState({ repos: res.data, status: true });
      });
      axios.get(Global.github + "users/" + nombre).then((res) => {
        if (res.data.gravatar_id === "") {
          this.setState({ imagen: res.data.avatar_url });
        } else {
          this.setState({ imagen: res.data.gravatar_url });
        }
      });
    }
  };
  limpiar = () => {
    this.setState({ status: false });
  };
  render() {
    return (
      <div>
        <h1>Find-A-Repo</h1>
        <h2 style={{ color: "red" }}>{this.state.mensaje}</h2>
        <form onSubmit={this.cargarRepositorios}>
          <label>Usuario GitHub</label>
          <br />
          <input
            type="text"
            ref={this.cajaNombreRef}
            className="form-control input"
            name="cajaNombre"
          />
          <br />
          <button className="btn btn-primary">Buscar</button>
        </form>
        {this.state.status && (
          <React.Fragment>
            <button onClick={this.limpiar} className="btn btn-warning">
              limpiar
            </button>
            <br />
            <img src={this.state.imagen} className="perfil"></img>
            <br />
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Lenguaje</th>
                  <th>Enlace al repositorio</th>
                </tr>
              </thead>
              <tbody>
                {this.state.repos.map((repo, index) => {
                  return (
                    <tr key={index}>
                      <td>{repo.name}</td>
                      <td>{repo.description}</td>
                      <td>{repo.language}</td>
                      <td>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {repo.html_url}
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </React.Fragment>
        )}
      </div>
    );
  }
}
