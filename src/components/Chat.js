import React, { Component } from 'react';
import axios from 'axios';
import MessageChat from './MessageChat';
import './Chat.css';

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
          this.setState({user:r.data.user, chat:this.state.chat.concat([{message:r.data.question.body, color:1}]), currentQuestion:r.data.question});
      });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmitButton = (e) => {
    let ans;
    ans=this.state.currentQuestion.answers[0];
    ans.body=this.state.newMessage;
    ans.detail=this.state.newMessage;
    this.onSubmit(ans, e);
  }

  onSubmit = (answer, e) => {
    console.log('ans', answer);
    this.setState({chat:this.state.chat.concat({message:answer.body, color:0}, {message:answer.reaction, color:1}), newMessage:''})
    axios.post(`/api/answers/${this.state.user._id}`, {answer:answer, field:this.state.currentQuestion.field})
      .then(res => {
        axios.post(`/api/questions/${this.state.user._id}`)
          .then(res2 => {
            if (res2.data.isFinish){this.props.history.push(`/begin/${this.props.match.params.id}`);}
            else{
              this.setState({user:res2.data.user, chat:this.state.chat.concat([{message:res2.data.question.body, color:1}]), currentQuestion:res2.data.question})
            }
          });
      });
  }

  render() {
    let userAnswer;
    let c;
    c=["bot", "human"];
    if (typeof this.state.currentQuestion.answers != 'undefined' & !this.state.currentQuestion.textArea ){
      userAnswer = (
        <div id='choice-buttons'>
          {this.state.currentQuestion.answers.map((a) =>
            <button onClick={this.onSubmit.bind(this, a)} class='btn btn-outline-primary'>{a.body}</button>
          )}
        </div>
      )
    }
    else{
      userAnswer = (
        <div>
          <input type="text" class="form-control" name="newMessage" value={this.state.newMessage} onChange={this.onChange} placeholder="..." />
          <button type="submit" onClick={this.onSubmitButton.bind(this)} class="btn btn-default">Envoyer</button>
        </div>
      )
    }
    return (
      <div id='chat-content'>
        {this.state.chat.map((m) =>
          <div><MessageChat message={m.message} color = {m.color} /></div>
        )}
        {userAnswer}
      </div>
    );
  }
}

export default Chat;