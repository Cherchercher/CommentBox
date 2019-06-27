import * as React from 'react';
import Header from '../components/Header';

const Main: React.FC = ({ children }) => (
  <main role="main" className="container">
    <Header />
    {children}
  </main>
);

export default Main;
