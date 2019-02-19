import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pseudo:'',
      pseudos:[]
    };
  }

  componentDidMount() {
    console.log(typeof this.state.pseudos);
    axios.get('/api/users/')
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({ pseudo:'', pseudos: res.data });
        console.log(this.state.pseudos);
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

    {pseudo != "" &&
    axios.post(`/api/users/initget`, {pseudo:pseudo})
      .then((result) => {
        this.props.history.push(`/chat/${result.data._id}`);
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
            FACTEUR DE REUSSITE
            <form onSubmit={this.onSubmit}>
              <input type="text" class="form-control" name="pseudo" value={pseudo} onChange={this.onChange} placeholder="Pseudo" />
              <button type="submit" class="btn btn-default">Go to chat</button>
            </form>
            <h2>Pseudos</h2>
                  <ul>
                    {pseudos.map((p) =>
                      <li><Link to={`/chat/${p._id}`}>{p.pseudo}</Link></li>
                    )}
                  </ul>
          </div>
        </div>
      </div>
    );}

}

export default App;