import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pseudo:''
    };
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { pseudo } = this.state;

    axios.get

    axios.post('/api/users', { pseudo })
      .then((result) => {
        this.props.history.push("/chat");
        console.log(this.props.history);
      });
    
  }

  render() {
    const { pseudo } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-body">
            FACTEUR DE REUSSITE
            <form onSubmit={this.onSubmit}>
              <input type="text" class="form-control" name="pseudo" value={pseudo} onChange={this.onChange} placeholder="Pseudo" />
              <button type="submit" class="btn btn-default">Go to chat</button>
            </form>
          </div>
        </div>
      </div>
    );}

}

export default App;