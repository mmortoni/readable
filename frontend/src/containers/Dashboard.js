import React from 'react';
import Footer from '../components/shared/Footer'

export class Dashboard extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1>Readable</h1>
        <p>
          React + Redux
        </p>

        <Footer />
      </div>
    );
  }
}
