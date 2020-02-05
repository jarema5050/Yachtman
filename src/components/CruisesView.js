import React, { Component } from 'react';
import Cruises from './cruises';
import Cruise from '../Model/Cruise';
import MapL from './map.js';

class CruisesView extends Component {
  state = {
    cruises: [],
    harbors: [],
    userId: null
  }
  componentDidMount() {
    this.setState({userId: sessionStorage.getItem('userId')});
  }
  render () {
    return (
      <React.Fragment>
        <MapL/>
        <Cruises userId={this.state.userId}/>
      </React.Fragment>
    );
  }
}
export default CruisesView;