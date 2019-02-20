import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Begin extends Component {

  constructor() {
    super();
    this.state = {
      user:''
    };
  }

  componentDidMount() {
    axios.get(`/api/users/getid/${this.props.match.params.id}`)
      .then(res => {
        console.log('user', res.data);
        this.setState({  user:res.data });
      });
  }





  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
            <div class="panel-body">
                <h1>Bienvenue dans l'application d'aide à la réussite !</h1>
                <h3>Vous pouvez commencer à chatter avec le bot pour vous évaluer : </h3>

                <Link to={`/chat/${this.state.user._id}`}>
                    <button type="submit" class="btn btn-success">Commencer la discussion !</button>
                </Link>
            
            
                  
            </div>
        </div>
      </div>
    );
  }
}



export default Begin;