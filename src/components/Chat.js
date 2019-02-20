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
      currentQuestion:{answers:[]}
    };
  }

  componentDidMount() {
      axios.post(`/api/questions/${this.props.match.params.id}`)
        .then(r => {
          this.setState({user:r.data.user, chat:this.state.chat.concat([r.data.question.body]), currentQuestion:r.data.question});
      });

  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmitButton = (answer, e) => {
    this.state.chat.push(answer.body);
    this.state.chat.push(answer.reaction);
    console.log('heyo');
    axios.post(`/api/answers/${this.state.user._id}`, {answer:answer, field:this.state.currentQuestion.field})
      .then(res => {
        console.log(res);
        axios.post(`/api/questions/${this.state.user._id}`)
          .then(res2 => {
            if (res2.body.isFinish){this.props.history.push(`/`);};
            console.log(res2);
            this.setState({user:res2.data.user, chat:this.state.chat.concat([res2.data.question.body]), currentQuestion:res2.data.question})
          });
      });
  }

  onSubmit = (e) => {
    this.setState({chat:this.state.chat.concat(this.state.newMessage), newMessage:''})
    let ans;
    ans=this.state.currentQuestion.answers[0];
    ans.body=this.state.newMessage;
    ans.detail=this.state.newMessage;
    axios.post(`/api/answers/${this.state.user._id}`, {answer:ans, field:this.state.currentQuestion.field})
      .then(res => {
        axios.post(`/api/questions/${this.state.user._id}`)
          .then(res2 => {
            if (res2.body.isFinish){console.log('t');this.props.history.push(`/`);};
            this.state.chat.push(res2.data.question.body);
            this.setState({chat:this.state.chat.concat([res2.data.question.body]), currentQuestion:res2.data.question});
          });
      });
  }
  render() {
    const { chat, user, newMessage, currentQuestion} = this.state;
    let userAnswer;
    if (typeof currentQuestion.answers != 'undefined' & !currentQuestion.textArea ){
      userAnswer = (
        currentQuestion.answers.map((a) =>
          <button onClick={this.onSubmitButton.bind(this, a)}>{a.body}</button>
        )
      )
    }
    else{
      userAnswer = (
        <form onSubmit={this.onSubmit}>
          <input type="text" class="form-control" name="newMessage" value={newMessage} onChange={this.onChange} placeholder="..." />
          <button type="submit" class="btn btn-default">Envoyer</button>
        </form>
      )
    }
    return (
      <div>
        {chat.map((m) =>
          <p>{m}</p>
        )}
        {userAnswer}
      </div>
    );
  }
}

export default Chat;