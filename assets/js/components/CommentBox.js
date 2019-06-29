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

  componentDidMount() {
    this.channel.join()
      .receive("ok", response => { console.log("Joined successfully", response) })
    this.channel.on("load:msg", payload => {
      let content = payload;
      content._id = payload.created_at;
      console.log(content);
      const data = [...this.state.data, content];
      this.setState({ data })
      console.log(data);
    })
  }

  //created_at 2019-06-29T10:04:32
  componentWillMount() {
    this.channel.on("new:msg", payload => {
      let content = payload;
      content._id = Date.now();
      content.key = payload.id;
      console.log(content);
      const data = [...this.state.data, content];
      this.setState({ data })
      console.log(data);
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
    let query = comment.replace(/ /g, "+");
    let url = encodeURI("/api/aylien/sentiment_en/" + query);
    let message = { name: author, content: comment, senti: "unknown", strength: 1 }
    try {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const body = JSON.parse(data.body);
          const senti = body.polarity;
          const polarity_confidence = body.polarity_confidence;
          const msg = { name: author, content: comment, sentiment: senti, strength: polarity_confidence }
          this.channel.push("new:msg", msg)
        });
    } catch (e) {
      console.log(e);
      this.channel.push("new:msg", message)
    }
  }

  render() {
    const { data } = this.state;
    return (
      <div className="container">
        <div className="comments">
          <h2>Comments:</h2>
          <CommentList
            data={data}
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
