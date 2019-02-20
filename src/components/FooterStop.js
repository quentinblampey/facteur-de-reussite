import React, { Component } from 'react';
//import axios from 'axios';
import { Link } from 'react-router-dom';

class FooterStop extends Component {






  render() {
    return (
        <div>
            <nav class="navbar fixed-bottom navbar-light bg-light">

                <Link to={`/exit/`}>
                    <button type="submit" class="btn btn-danger">Arrêter l'évaluation</button>
                </Link>
            </nav>
        </div>
    );
  }
}



export default FooterStop;


