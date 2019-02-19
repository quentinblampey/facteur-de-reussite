import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Chat extends Component {

  constructor() {
    super();
    this.state = {
      chat:[],
      user:'', 
      newMessage:''
    };
  }

  componentDidMount() {
    var idQ;
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ chat:['Bienvenue '+res.data.pseudo], user:res.data });
        idQ = res.data.currentBreak.idQ;
      });
    axios.get('/api/questions/nextQuestion', {idQ:idQ})
      .then(res => {
        this.setState.chat.push(res.data.body);
      });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { chat, user, newMessage } = this.state;

    this.state.chat.push(newMessage);

    axios.post(`/api/answers/`, {newMessage})
      .then(res => {});

    this.setState({newMessage:''});

    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => {
        this.state.chat.push(res.data.body)
      });
  }

  render() {
    const { chat, user, newMessage } = this.state;
    return (
      <div>
        {chat.map((m) =>
          <p>{m}</p>
        )}
        <form onSubmit={this.onSubmit}>
          <input type="text" class="form-control" name="newMessage" value={newMessage} onChange={this.onChange} placeholder="..." />
          <button type="submit" class="btn btn-default">Envoyer</button>
        </form>
      </div>
    );
  }
}

export default Chat;