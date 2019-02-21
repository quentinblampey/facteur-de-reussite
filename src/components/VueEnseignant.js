import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

var crypto = require('crypto')


class VueEnseignant extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pseudo:'',
      pseudos:[],
      authorized: false,
      MdP: ''
    };
  }

  componentDidMount() {
    axios.get('/api/users/')
      .then(res => {
        this.setState({ pseudo:'', pseudos: res.data });
      });
  }

  onChange = (e) => {
    this.setState({MdP: e.target.value}, () => console.log(this.state.MdP));
    
  }

  onSubmit = (e) => {
    e.preventDefault();
    const MdP = this.state.MdP;
    console.log(MdP)
    axios.get('/api/enseignants/')
      .then(res => {
        console.log(res.data)
        const hash= crypto.pbkdf2Sync(MdP, res.data.salt, 1000, 64, 'sha512').toString('hex');
        if (hash === res.data.hash) {
          this.setState({ authorized: true });
        }
        
      });
  }
    
  

  render() {
    const { pseudos} = this.state;
    if(this.state.authorized ===true) {
      return (
        <div class="container">
        <div class="panel panel-default">
          <div class="panel-body">
            <h1 class="jumbotron-heading">Aide à la réussite</h1>
            <h3>Interface Enseignant</h3>

            <div class="card bg-light mb-3">
              <div class="card-header">
              <h4>Etudiants inscrits : </h4>
              </div>
              <div class="card-body">
                <p class="card-text">
                  <button>Générer les statistiques</button>
                </p>
              </div>
            </div>

            <div class="card bg-light mb-3">
              <div class="card-header">
              <h4>Etudiants inscrits : </h4>
              </div>
              <div class="card-body">
                <p class="card-text">
                  <ul>
                    {pseudos.map((p) =>
                      <li>{p.pseudo}</li>
                    )}
                  </ul>
                </p>
              </div>
            </div>
                  
          </div>
        </div>
      </div>
      )
    } else {
      return (
        <div class="container">
          <h2>Entrez le code pour accéder à l'interface enseignant.</h2>
          <form onSubmit={this.onSubmit}>
              <input type="password" class="validate form-control" name="password" value={this.MdP} onChange={this.onChange} placeholder="Mot de passe" />
              <button type="submit" class="btn btn-success">Me connecter</button>
            </form>
        </div>
      )
    }
  }
}

export default VueEnseignant;