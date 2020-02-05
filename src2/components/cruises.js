import React, { Component } from 'react';
import Popup from './popup';
class Cruise extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div className="card-body">
        <h5 className="card-title">{this.props.cruise.shipName}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{this.props.cruise.departureHarborName}</h6>
        <p className="card-text">{this.props.cruise.arrivalHarborName}</p>
        <p className="card-text">Dni: {(this.props.cruise.arrivalDate.getTime() - this.props.cruise.departureDate.getTime())/(1000*3600*24)}</p>
      </div>
    );
  }
}
class Cruises extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      cruiseId: null
    };
    this.togglePopup = this.togglePopup.bind(this);
  };
  togglePopup(cruiseId) {
    this.setState({
      showPopup: !this.state.showPopup,
      activeCruiseId: cruiseId
    });
  }
  render(){
    return (
      <div className="app">
        {
        this.props.cruises.map((cruise) => (
          <div className="card" onClick={this.togglePopup.bind(this, cruise.id)}>
            <Cruise cruise={cruise}/>
          </div>
        ))
        }
        {
        
        this.state.showPopup ? 
          <Popup
            cruise = {this.props.cruises.find(cruise => cruise.id === this.state.activeCruiseId)}
            closePopup={this.togglePopup}
          />
          : null
        
        }
      </div>
    )
  }
}

export default Cruises;