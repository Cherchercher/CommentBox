// Comment.js
import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';




class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      error: false,
      translated: false,
      translate: ''
    };
    this.translate.bind(this);
  }

  translate(str) {
    let url = "/api/fuxi/translate_cn_en/" + str;
    try {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const body = JSON.parse(data.body);
          const text = body.text[0];
          console.log()
          this.setState({ translate: text, translated: true })
        });
    } catch (e) {
      console.log(e);
    }
  }
  handleClick = text => e => {
    this.translate(text)
  }
  render() {
    return (
      <div className="singleComment">
        <img alt="user_image" className="userImage" src={`https://picsum.photos/70?random=${this.props.id}`} />
        <div className="textContent">
          <div className="singleCommentContent">
            <h3>{this.props.author}</h3>
            {this.state.translated ? <ReactMarkdown source={this.state.translate} /> : <ReactMarkdown source={this.props.content} />}
          </div>
          <div className="singleCommentButtons">
            <span className="time">{moment.utc(this.props.timestamp).from(moment.utc())}</span>
            <a>{this.props.sentiment}</a>
            {this.props.language === 'cn' & this.state.translated === false ? <a onClick={this.handleClick(this.props.content)}>translate</a> : null}
          </div>
        </div>
      </div>
    )
  }
}

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
};

export default Comment;
