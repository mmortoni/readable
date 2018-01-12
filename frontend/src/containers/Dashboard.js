import React from 'react';
import Footer from '../components/shared/Footer'

export class Dashboard extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1 className="col-lg-offset-3">Readable</h1>

        <div className="row">
          <div className="col-md-4">
              <img src="/images/dashboard-3.png" className="img-responsive" />
          </div>

          <div className="col-md-8">
            <p>React + Redux</p>
            <Footer />
          </div>
        </div>
      </div>      
    );
  }
}
