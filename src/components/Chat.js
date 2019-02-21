import React, { Component } from 'react';
import axios from 'axios';

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

  buildAnswer = () => {
    let ans;
    ans=this.state.currentQuestion.answers[0];
    ans.body=this.state.newMessage;
    ans.detail=this.state.newMessage;
    return ans
  }

  onSubmit = (answer, e) => {
    this.setState({chat:this.state.chat.concat(answer.body, answer.reaction), newMessage:''})
    axios.post(`/api/answers/${this.state.user._id}`, {answer:answer, field:this.state.currentQuestion.field})
      .then(res => {
        axios.post(`/api/questions/${this.state.user._id}`)
          .then(res2 => {
            if (res2.data.isFinish){this.props.history.push(`/begin/${this.props.match.params.id}`);}
            else{
              this.setState({user:res2.data.user, chat:this.state.chat.concat([res2.data.question.body]), currentQuestion:res2.data.question})
            }
          });
      });
  }

  render() {
    let userAnswer;
    if (typeof this.state.currentQuestion.answers != 'undefined' & !this.state.currentQuestion.textArea ){
      userAnswer = (
        this.state.currentQuestion.answers.map((a) =>
          <button onClick={this.onSubmit.bind(this, a)}>{a.body}</button>
        )
      )
    }
    else{
      userAnswer = (
        <div>
          <input type="text" class="form-control" name="newMessage" value={this.state.newMessage} onChange={this.onChange} placeholder="..." />
          <button type="submit" onClick={this.onSubmit.bind(this, this.buildAnswer())} class="btn btn-default">Envoyer</button>
        </div>
      )
    }
    return (
      <div>
        {this.state.chat.map((m) =>
          <p>{m}</p>
        )}
        {userAnswer}
      </div>
    );
  }
}

export default Chat;