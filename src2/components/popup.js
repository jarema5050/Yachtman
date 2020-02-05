import React, { Component } from 'react';
class Popup extends React.Component {
    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
          <h2>{this.props.cruise.arrivalHarborName}</h2>
          <p>{this.props.cruise.shipName}</p>
          <p>{this.props.cruise.departureDate.getDay()+"-"+this.props.cruise.departureDate.getMonth()+"-"+this.props.cruise.departureDate.getFullYear()+ " => " + this.props.cruise.arrivalDate.getDay()+"-"+this.props.cruise.arrivalDate.getMonth()+"-"+this.props.cruise.arrivalDate.getFullYear()}</p>
          <button>Zapisz się</button>
          <button onClick={this.props.closePopup}>X</button>
          </div>
        </div>
      );
    }
  }
export default Popup;