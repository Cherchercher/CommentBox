import * as React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => (
  <header>
    <section className="container">
      <nav role="navigation">
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/counter'>Login</Link>
          </li>
          <li>
            <Link to='/fetch-data'>About</Link>
          </li>
        </ul>
      </nav>
    </section>
  </header>
);

export default Header;
