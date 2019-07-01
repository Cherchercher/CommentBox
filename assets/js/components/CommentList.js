// CommentList.js
import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const CommentList = (props) => {
  const commentNodes = props.data.map(comment => (
    <Comment
      author={comment.name}
      sentiment={comment.sentiment}
      key={comment._id}
      id={comment._id}
      timestamp={comment._id}
      language={comment.language}
      content={comment.content}
    >
    </Comment>
  ));
  return (
    <div>
      {commentNodes}
    </div>
  );
};

CommentList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string,
    id: PropTypes.string,
    text: PropTypes.string,
    updatedAt: PropTypes.string,
  })),
};

CommentList.defaultProps = {
  data: [],
};

export default CommentList;
