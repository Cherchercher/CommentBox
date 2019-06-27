// CommentBox.js
import { Socket } from "phoenix"
import React, { Component } from 'react';
import 'whatwg-fetch';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import '../../css/CommentBox.css';

class CommentBox extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      error: null,
      serverMessages: [],
      author: '',
      comment: '',
    };
    let socket = new Socket("/socket", {
      params:
      { token: window.userToken }
    });
    socket.connect();
    this.channel = socket.channel("rooms:lobby", {});
  }


  componentWillMount() {
    this.channel.join()
      .receive("ok", response => { console.log("Joined successfully", response) })
    this.channel.on("new:msg", payload => {
      console.log(payload);
      this.setState({
        serverMessages: this.state.serverMessages.concat(payload.body)
      })
    })
  }

  onChangeText = (e) => {
    const newState = { ...this.state };
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  submitComment = (e) => {
    e.preventDefault();
    const { author, comment } = this.state;
    if (!author || !comment) return;

    const data = [...this.state.data, { author, comment, _id: Date.now().toString() }];
    this.setState({ data });
    console.log(data);
    this.channel.push("new:msg", { user: author, body: comment })
  }

  render() {
    return (
      <div className="container">
        <div className="comments">
          <h2>Comments:</h2>
          <CommentList
            data={this.state.data}
          />
        </div>
        <div className="form">
          <CommentForm
            author={this.state.author}
            text={this.state.comment}
            handleChangeText={this.onChangeText}
            submitComment={this.submitComment}
          />
        </div>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    );
  }
}

export default CommentBox;
