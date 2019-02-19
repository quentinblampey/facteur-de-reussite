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
      newMessage:'',
      currentQuestion:'',
      answers:[]
    };
  }

  componentDidMount() {
    console.log('meh');
    axios.get(`/api/users/getid/${this.props.match.params.id}`)
      .then(res => {
        console.log('user', res.data);
        this.setState({ chat:this.state.chat.concat(['Bienvenue '+res.data.pseudo]), user:res.data });
        axios.post(`/api/questions/${res.data.currentBreak[0].idQ}`, {details:this.state.user.details})
          .then(r => {
            console.log(r);
            this.setState({chat:this.state.chat.concat([r.data.body]), currentQuestion:r.data.body, answers:r.data.answers});
        });
      });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmitButton = (answer, e) => {

    const { chat, user, newMessage , currentQuestion, answers} = this.state;

    this.state.chat.push(answer.body);

    axios.put(`/api/users/${user._id}`, {answer:answer, field:currentQuestion.field})
      .then(res => {
        this.setState({user:res});
      });

    this.setState({newMessage:''});
    axios.get(`/api/questions/${answer.idQ}`, {details:user.details})
      .then(res => {
        this.state.chat.push(res.data.body);
        this.setState({chat:this.state.chat.concat([res.data.body]), currentQuestion:res.data.body, answers:res.data.answers})
      });
  }

  onSubmit = (e) => {

    const { chat, user, newMessage , currentQuestion, answers} = this.state;

    this.state.chat.push(newMessage);

    axios.post(`/api/answers/`, {newMessage})
      .then(res => {});

    this.setState({newMessage:''});

    axios.get(`/api/questions/${this.answer.idQ}`)
      .then(res => {
        this.state.chat.push(res.data.body);
        this.setState({chat:this.state.chat.concat([res.data.body]), currentQuestion:res.data, answers:res.data.answers})
      });
  }

  render() {
    const { chat, user, newMessage, currentQuestion, answers} = this.state;
    console.log(chat);
    return (
      <div>
        {chat.map((m) =>
          <p>{m}</p>
        )}
        {answers.map((a) =>
          <button onClick={this.onSubmitButton.bind(this, a)}>{a.body}</button>
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