import React from "react";
import Loading from "react-loading-animation";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const styles = {
  root: {
    width: '100%',
    maxWidth: 240,
  }
};


const Topics = (props) => {
  return (
    <List
      component="nav"
      aria-labelledby="topics"
      subheader={
        <ListSubheader component="div" id="topics">
          Topics
          </ListSubheader>
      }
      style={styles.root}
    >
      {(props.topics).map((topic) => {
        return (<ListItem button selected={0 === 0}>
          {topic.name}
        </ListItem>)
      })}
    </List>
  );
}

export default Topics;
