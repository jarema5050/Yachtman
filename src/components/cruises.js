import React, { Component } from 'react';
import Popup from './popup';
import Cruise from '../Model/Cruise';

class CruiseCard extends Component{
  constructor(props) {
    super(props);
  }
  delete(id){
    this.props.delete(id);
  }
  togglePopup(cruiseId){
    this.props.togglePopup(cruiseId);
  }
  render(){
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{this.props.cruise.shipName}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{this.props.cruise.departureHarborName}</h6>
          <p className="card-text">{this.props.cruise.arrivalHarborName}</p>
          <p className="card-text">Dni: {Math.round((this.props.cruise.arrivalDate.getTime() - this.props.cruise.departureDate.getTime())/(1000*3600*24))}</p>
          { (parseInt(this.props.cruise.ownerId) === parseInt(this.props.userId)) ? (<button className="btn btn-danger mg-right-20" onClick={this.delete.bind(this, this.props.cruise.id)}>Remove</button>) : (null)}
          <button className="btn btn-info mg-right-20" onClick={this.togglePopup.bind(this, this.props.cruise.id)}>Show</button>
        </div>
      </div>
    );
  }
}
class Cruises extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      cruiseId: null,
      cruises: []
    };
    this.togglePopup = this.togglePopup.bind(this);
    this.delete = this.delete.bind(this);
    this.addCruise = this.addCruise.bind(this);
    this.updateCruise = this.updateCruise.bind(this);
  };

  delete(id){
    fetch('https://yachmanservice.azurewebsites.net/api/Cruises/'+id, {
       method: 'DELETE'
    }).then(res => res.json())
    .then(() => {
       const newCruises = this.state.cruises.filter(el => el.id !== id);
       this.setState({cruises: newCruises});
    })
   .catch(console.log)
 }

  componentDidMount(){
    fetch("https://yachmanservice.azurewebsites.net/api/Cruises")
    .then(res => res.json())
    .then((data) => {
      var cruisesTemp = [];
      data.forEach(cruise => {
        let obj = new Cruise(cruise.Id, cruise.DepartureHarborName, cruise.ArrivalHarborName,new Date(Date.parse(cruise.DepartureDate)), new Date(Date.parse(cruise.ArrivalDate)), cruise.ShipName, cruise.OwnerId);
        cruisesTemp.push(obj);
      });
      this.setState({cruises: cruisesTemp});
    })
    .catch(console.log)
  }
  togglePopup(cruiseId) {
    console.log(this.state.activeCruiseId);
    this.setState({
      showPopup: !this.state.showPopup,
      activeCruiseId: cruiseId
    });
  }
  enroll(cruiseId){
    fetch('https://yachmanservice.azurewebsites.net/api/Cruises/Members', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                  CruiseId: cruiseId,
                  UserId: sessionStorage.getItem('userId')
                })
            })
            .then((res) => res.json())
            .then((data) =>{
              this.togglePopup(cruiseId);
            })
            .catch((err)=>console.log(err))
  }
  updateCruise(cruiseId, cruise){
    var departureDate = {}
    if(cruise.departureDate !== undefined){
      departureDate = {
        Year: cruise.departureDate.getFullYear(),
        Month: cruise.departureDate.getMonth()+1,
        Day: cruise.departureDate.getDate(),
        Hour: cruise.departureDate.getHours(),
        Minute: cruise.departureDate.getMinutes()
      }
    }
  var arrivalDate = {}
  if(cruise.arrivalDate !== undefined){
    arrivalDate = {
      Year: cruise.arrivalDate.getFullYear(),
      Month: cruise.arrivalDate.getMonth()+1,
      Day: cruise.arrivalDate.getDate(),
      Hour: cruise.arrivalDate.getHours(),
      Minute: cruise.arrivalDate.getMinutes()
    }
  }
    var dispatchCruise = {}
    if(cruise.departureHarborName !== undefined){
      dispatchCruise.DepartureHarborName = cruise.departureHarborName
    }
    if(cruise.arrivalHarborName !== undefined){
      dispatchCruise.ArrivalHarborName = cruise.arrivalHarborName
    }
    if(cruise.shipName !== undefined){
      dispatchCruise.ShipName = cruise.shipName
    }
    if(Object.entries(arrivalDate).length !== 0 && arrivalDate.constructor === Object)
    {
      dispatchCruise.ArrivalDateDto = arrivalDate
    }
    if(Object.entries(departureDate).length !== 0 && departureDate.constructor === Object)
    {
      dispatchCruise.DepartureDateDto = departureDate
    }
        fetch('https://yachmanservice.azurewebsites.net/api/Cruises/'+cruiseId, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body:JSON.stringify(cruise)
      })
      .then((res) => res.json())
      .then((data) =>{
        this.componentDidMount();
      })
      .catch((err)=>console.log(err))
      
      this.togglePopup(this.state.activeCruiseId);
  }
  addCruise(cruise){
    cruise.ownerId = sessionStorage.getItem('userId');
    console.log(cruise);
    const departureDate = {
      Year: cruise.departureDate.getFullYear(),
      Month: cruise.departureDate.getMonth()+1,
      Day: cruise.departureDate.getDate(),
      Hour: cruise.departureDate.getHours(),
      Minute: cruise.departureDate.getMinutes()
    }
    const arrivalDate = {
      Year: cruise.arrivalDate.getFullYear(),
      Month: cruise.arrivalDate.getMonth()+1,
      Day: cruise.arrivalDate.getDate(),
      Hour: cruise.arrivalDate.getHours(),
      Minute: cruise.arrivalDate.getMinutes()
    }
    const dispatchCruise = {
      DepartureHarborName: cruise.departureHarborName,
      ArrivalHarborName: cruise.arrivalHarborName,
      DepartureDateDto: departureDate,
      ArrivalDateDto: arrivalDate,
      ShipName: cruise.shipName
    }
    fetch('https://yachmanservice.azurewebsites.net/api/Cruises', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(dispatchCruise)
            })
            .then((res) => res.json())
            .then((data) =>{
              this.togglePopup(this.state.activeCruiseId);

              var cruises = this.state.cruises;
              cruise.id = data.Id;
              cruises.push(cruise);
              this.setState({cruises: cruises});
            })
            .catch((err)=>console.log(err))
    
  }
  render(){
    let popup;
    if(this.state.showPopup && this.state.activeCruiseId !== 'new' && sessionStorage.getItem('authenticated')==='true'){
      popup = <Popup
        cruise = {this.state.cruises.find(cruise => cruise.id === this.state.activeCruiseId)}
        closePopup={this.togglePopup}
        userId={this.props.userId}
        enroll={this.enroll}
        updateCruise = {this.updateCruise}
      />
    }
    else if(this.state.showPopup && this.state.activeCruiseId === 'new' && sessionStorage.getItem('authenticated')==='true'){
      popup = <Popup
      cruise = {this.state.activeCruiseId}
      addCruise ={this.addCruise}
      closePopup={this.togglePopup}
      userId={this.props.userId}
      />
    }
    else{
      popup = null
    }
    return (
      <div className="app">
        {(sessionStorage.getItem('authenticated') ==='true') ? (<button className="btn btn-primary newCruiseBtn" onClick={this.togglePopup.bind(this, 'new')}>New cruise</button>) : null}
        {
        this.state.cruises.map((cruise) => (
          <CruiseCard cruise={cruise} togglePopup={this.togglePopup} delete={this.delete} userId={this.props.userId}/>
        ))
        }
        {
          popup
        }
      </div>
    )
  }
}

export default Cruises;