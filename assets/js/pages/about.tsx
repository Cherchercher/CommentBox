import * as React from 'react';
import { Link } from 'react-router-dom';

import Main from '../components/Main';

// The interface for our API response

// The interface for our Language model.
interface Schema {
  field: string;
  type: string;
  description: string;
}

interface AboutPageState {
  schemas: { string: Schema[] };
}

export default class AboutPage extends React.Component<
  {},
  AboutPageState
  > {
  constructor(props: {}) {
    super(props);
    this.state = {
      schemas: {
        "comment": [{ field: "name", type: "string", description: "name of the commentor" },
        { field: "content", type: "string", description: "content of the comment" },
        { field: "sentiment", type: "string", description: "sentiment the comment: neutral, positive, or negative" },
        { field: "strength", type: "float", description: "confidence of the indicated sentiment range from 0 - 1, with 1 being absolute confident and 0 being absolute uncertain" },
        { field: "language", type: "string", description: "language of the comment. Supported languages: English (en) or Chinese (cn)." }],
        "user": [{ field: "name", type: "string", description: "name of the user" },
        { field: "profile_pic", type: "file", description: "profile picture of the user" },
        { field: "email", type: "string", description: "email address of the user" },
        { field: "default language", type: "string", description: "default language of the user. Possible values: cn (Chinese) or en (English)" }],
        "topic": [{ field: "name", type: "string", description: "name of the topic" },
        { field: "profile_pic", type: "file", description: "description of the topic" },
        { field: "comments", type: "list", description: "list of comments associated with the user" }]
      }
    }
  }

  private static renderSchemaTable(schemas: Schema[]) {
    return (
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {schemas.map(schema => (
            <tr key={schema.field}>
              <td>{schema.field}</td>
              <td>{schema.type}</td>
              <td>{schema.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  public render(): JSX.Element {
    const content = AboutPage.renderSchemaTable(this.state.schemas["comment"]);
    const user = AboutPage.renderSchemaTable(this.state.schemas["user"]);
    const topic = AboutPage.renderSchemaTable(this.state.schemas["topic"]);
    return (
      <Main>
        <section className="phx-hero">
          <h1>Welcome to Comment Box!</h1>
          <p>
            A modern twist to the vintage comment box web application.
            Find topics that you're interested in, comment, give and recieve feedbacks.
          <br />
            Built with Pheonix, React, and Aylien. Language support: Chinese, English.
         </p>
          <p>
            <Link className="button" to="/">
              View Topics
            </Link>{' '}
            <Link className="button button-outline" to="/fetch-data">
              Login
            </Link>
          </p>
        </section>
        <h1>Data Schema</h1>
        <h3>
          comment
        </h3>
        {content}
        <br />
        <h3>
          user
        </h3>
        {user}
        <br />
        <h3>
          topic
        </h3>
        {topic}
        <br />
        <br />
      </Main>
    );
  }
}
