import React, { Component } from 'react';

class Username extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: ""
        }
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleKeyDown(event) {
        if (event.key === "Enter") {
            const username = event.target.value;
            this.setState({ username }); // Actualiza el estado local con el nombre de usuario ingresado
            event.target.value = "";

            // Realiza la solicitud HTTP al servicio
            fetch('http://localhost:9090/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })
            })
            .then(response => response.json()) // Parsea la respuesta JSON
            .then(data => {
                console.log(data); // Muestra la respuesta en la consola (puedes eliminar esto en producción)
                // Actualiza el estado con la respuesta recibida del servidor
                this.setState({ username: data.username });
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    }
  
    render() {
      return (
        <div>
          <input onKeyDown={this.handleKeyDown} placeholder="Username"/>
          {<p>Usuario: {this.state.username}</p>}
        </div>
      );
    };
  
  }
  
  export default Username;
