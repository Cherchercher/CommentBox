// Comment.js
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const Comment = props => (
  <div className="singleComment">
    <img alt="user_image" className="userImage" src={`https://picsum.photos/70?random=${props.id}`} />
    <div className="textContent">
      <div className="singleCommentContent">
        <h3>{props.author}</h3>
        <ReactMarkdown source={props.children} />
      </div>
      <div className="singleCommentButtons">
        <span className="time">{moment.utc(props.timestamp).from(moment.utc())}</span>
        <a>{props.sentiment}</a>
        <a>translate</a>
      </div>
    </div>
  </div>
);

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
};

export default Comment;
