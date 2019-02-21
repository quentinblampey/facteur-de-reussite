import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

class VueEnseignant extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pseudo:'',
      pseudos:[]
    };
  }

  componentDidMount() {
    axios.get('/api/users/')
      .then(res => {
        this.setState({ pseudo:'', pseudos: res.data });
      });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { pseudo, pseudos} = this.state;

    {pseudo !== "" &&
    axios.post('/api/users/initget', {pseudo:pseudo})
      .then((result) => {
        this.props.history.push(`/begin/${result.data._id}`);
        console.log(this.props.history);
        console.log(result);
      });
    }
    
  }

  render() {
    const { pseudo, pseudos} = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-body">
            <h1 class="jumbotron-heading">Aide à la réussite</h1>
            <h3>Interface Enseignant</h3>
            
            <form onSubmit={this.onSubmit}>
              <input type="text" class="form-control" name="pseudo" value={pseudo} onChange={this.onChange} placeholder="Pseudo" />
              <button type="submit" class="btn btn-success">Me connecter</button>
            </form>

            <div class="card bg-light mb-3">
              <div class="card-header">
              <h4>Etudiants inscrits : </h4>
              </div>
              <div class="card-body">
                <h5 class="card-title">Light card title</h5>
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
    );}

}

export default VueEnseignant;