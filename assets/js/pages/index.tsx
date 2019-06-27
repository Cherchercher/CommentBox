import * as React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import Main from '../components/Main';
import CommentBox from '../components/CommentBox';

const HomePage: React.FC<RouteComponentProps> = () => (
  <Main>
    <section className="phx-hero">
      <h1>Welcome to Comment Box!</h1>
      <p>
        A modern twist to the comment box web application, prevelant in the 2000’s
        <br />
        Built with Pheonix, React, and Aylien
      </p>
      <p>
        <Link className="button" to="/counter">
          Counter example
        </Link>{' '}
        <Link className="button button-outline" to="/fetch-data">
          API example
        </Link>
      </p>
    </section>

    <section className="row">
      <CommentBox />
    </section>
  </Main>
);

export default HomePage;
