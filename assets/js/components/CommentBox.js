// CommentBox.js
import { Socket } from "phoenix"
import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import 'whatwg-fetch';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import '../../css/CommentBox.css';

const REGEX_CHINESE = /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]/u;
const hasChinese = (str) => REGEX_CHINESE.test(str);

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
      const data = [...this.state.data, content];
      this.setState({ data })
    })
  }

  //created_at 2019-06-29T10:04:32
  componentWillMount() {
    this.channel.on("new:msg", payload => {
      let content = payload;
      content._id = Date.now();
      content.key = payload.id;
      const data = [...this.state.data, content];
      this.setState({ data })
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
    const isChinese = hasChinese(comment);
    let language = isChinese ? 'cn' : 'en';
    let query = comment.replace(/ /g, "+");
    let url = encodeURI("/api/aylien/sentiment_en/" + query);
    let message = { name: author, content: comment, senti: "unknown", strength: 1, language: language }
    try {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const body = JSON.parse(data.body);
          const senti = body.polarity;
          const polarity_confidence = body.polarity_confidence;
          const msg = { name: author, content: comment, sentiment: senti, strength: polarity_confidence, topic_id: 1, language: language }
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
        <Paper className="paper">
          {(this.props.topics).map((topic) => {
            return (<div>
              <Typography variant="h5" component="h3">
                {topic.name}
              </Typography>
              <Typography component="p">
                {topic.description}
              </Typography>
            </div>)
          })}

          <div className="comments">
            <i class="fas fa-comment"></i>
            {data.length} comments
          </div>
        </Paper>
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
