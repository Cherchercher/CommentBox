import * as React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import Main from '../components/Main';
import CommentBox from '../components/CommentBox';
import Topics from '../components/Topics';
import Loading from "react-loading-animation";

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      topics: [],
      mounted: false
    };
  }

  componentDidMount() {
    fetch('/api/topics')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ topics: data.data, mounted: true });
      });
  }

  render() {
    const { topics } = this.state;
    if (this.state.mounted === true) {
      return (
        <Main>
          <section className="row">
            <Topics className="col-sm-3" topics={topics} />
            <CommentBox className="col-sm-9" topics={topics} />
          </section>
        </Main>
      )
    } else {
      return <Loading />;
    }
  }
}

export default HomePage;
