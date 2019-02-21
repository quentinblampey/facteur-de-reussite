import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MessageChat.css';

class MessageChat extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }


  render() {
    let messageBox;
    if (this.props.color===1) {
        messageBox = (
            <div>
                <div class="text-box-blue">
                    <p> {this.props.message} </p>
                </div>
                <div class="bullet-blue"></div>
            </div>
        )
    }
    else {
        messageBox = (
            <div>
                <div class="text-box-gray">
                    <p> {this.props.message} </p>
                </div>
                <div class="bullet-gray"></div>
            </div>
        )
    }
    return (
        <div>
            {messageBox}
        </div>
    );
  }
}

export default MessageChat;