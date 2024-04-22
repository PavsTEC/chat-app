import React, { Component } from 'react';
import './Message.scss';
import { currentUserID } from '../../api/index'

class Message extends Component {
  constructor(props) {
    super(props);
    let temp = JSON.parse(this.props.message);
    this.state = {
      message: temp
    }
  }
  
  render() {
    const messageClass = this.state.message.user === currentUserID ? 'Message me' : 'Message';

    return (
      <div className={messageClass}>
        {this.state.message.body}
      </div>
    );
  };

}

export default Message;
