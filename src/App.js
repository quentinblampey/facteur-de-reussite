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
    axios.get('/api/users')
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
    axios.post('/api/users', { pseudo: pseudo })
      .then((result) => {
        this.props.history.push("/chat");
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
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Pseudo</th>
                </tr>
              </thead>
              <tbody>
                {console.log(typeof pseudos)}
                {pseudos.map((p) =>
                  <tr>
                    <td>{p.pseudo}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );}

}

export default App;