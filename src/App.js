import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    axios.get('/api/book')
      .then(res => {
        this.setState({ books: res.data });
        console.log(this.state.books);
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              FACTEUR DE REUSSITE
            </h3>
          </div>
          <div class="panel-body">
            <button><Link to="/chat"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Go to Chat</Link></button>
            Heyo
          </div>
        </div>
      </div>
    );
  }
}

export default App;