import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
class Popup extends React.Component {
  constructor(){
    super();
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    this.state = {
      harbors: [],
      newCruise: {departureDate: today, arrivalDate: tomorrow},
      ships: [],
      cruiseUpdate:{},
      members:[]
    }
    this.handleChange = this.handleChange.bind(this)
  }
  addCruise(cruise){
    this.props.addCruise(cruise);
  }
  updateCruise(cruiseId, cruise){
    this.props.updateCruise(cruiseId,cruise);
  }
  enroll(cruiseId){
    this.props.enroll(cruiseId);
  }
  handleChange (evt) {
    this.state.newCruise[evt.target.name] = evt.target.value;
    this.state.cruiseUpdate[evt.target.name] = evt.target.value;
    this.setState({newCruise: this.state.newCruise})
    this.setState({cruiseUpdate: this.state.cruiseUpdate})
  }
  

  componentDidMount(){
      //console.log(this.props.cruise);
      if(this.props.cruise !== 'new'){
        this.setState({newCruise: this.props.cruise})
        fetch("https://yachmanservice.azurewebsites.net/api/Cruises/Members/"+this.props.cruise.id)
          .then(res => res.json())
          .then((data) => {
            this.setState({members: data});
          })
          .catch(console.log);
      }

      fetch("https://yachmanservice.azurewebsites.net/api/Harbors")
      .then(res => res.json())
      .then((data) => {
        this.setState({harbors: data});
      })
      .catch(console.log);
      console.log(this.props.userId);
      fetch("https://yachmanservice.azurewebsites.net/api/ships/owner/"+this.props.userId)
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ships: data});
      })
      .catch(console.log)
  }
   
  departureDateChange = date =>{
    this.state.newCruise.departureDate = date
    this.state.cruiseUpdate.departureDate = date
    this.setState({cruiseUpdate: this.state.cruiseUpdate})
  }
  arrivalDateChange = date =>{
    this.state.newCruise.arrivalDate = date
    this.state.cruiseUpdate.arrivalDate = date
    this.setState({newCruise: this.state.newCruise})
    this.setState({cruiseUpdate: this.state.cruiseUpdate})
  }
  render() {
        if(this.state.ships.length < 1 && this.props.cruise === 'new'){
          return(
          <div className='popup'>
            <div className='popup_inner'>
             <p>Create your first ship in subpage Ships before you try to schedule a cruise.</p>
             <div className="row justify-content-end">
              <button className="btn btn-dark" onClick={this.props.closePopup}>X</button>
             </div>
            </div>
          </div>
          )
        }
        if(parseInt(this.props.userId) !== parseInt(this.props.cruise.ownerId) && (this.props.cruise !== 'new')){

          console.log(this.props.userId + " " + this.props.cruise.ownerId)
          return(
            <div className='popup'>
              <div className='popup_inner'>
                <div className="form-group row">
                  <label className="col-2 col-form-label">Departure harbor</label>
                  <div className="col-10">
                  <select disabled className="form-control" name='departureHarborName' value={this.state.newCruise.departureHarborName} onChange={this.handleChange}>
                    <option selected disabled hidden> 
                      Select harbor
                    </option> 
                    {this.state.harbors.map(harbor => (
                      <option>{harbor.City}</option>
                    ))}
                  </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-2 col-form-label">Departure time</label>
                  <div className="col-10">
                    <DateTimePicker disabled onChange={this.departureDateChange} value={this.state.newCruise.departureDate}/>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-2 col-form-label">Arrival harbor</label>
                  <div className="col-10">
                  <select disabled className="form-control" name='arrivalHarborName' value={this.state.newCruise.arrivalHarborName} onChange={this.handleChange}>
                    <option selected disabled hidden> 
                      Select harbor
                    </option> 
                  {this.state.harbors.map(harbor => (
                      <option>{harbor.City}</option>
                    ))}
                  </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label disabled className="col-2 col-form-label">Arrival time</label>
                  <div className="col-10">
                    <DateTimePicker disabled onChange={this.arrivalDateChange} value={this.state.newCruise.arrivalDate}/>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-2 col-form-label">Ship</label>
                  <div className="col-10">
                  <select disabled className="form-control" name='shipName' value={this.state.newCruise.shipName} onChange={this.handleChange}>
                    <option selected disabled hidden> 
                      Select ship
                    </option> 
                  {this.state.ships.map(ship => (
                      <option>{ship.Name}</option>
                    ))}
                  </select>
                  </div>
                </div>
                <div className="row">
                  <label className="col-2 col-form-label">Members</label>
                  <ul className="list-group col-sm-10">
                    {this.state.members.map(member => (
                          <li className="list-group-item">{member}</li>
                        ))}
                  </ul>
                </div>
                <div className="row justify-content-around">
                  <button className="btn btn-success" onClick={this.enroll.bind(this, this.props.cruise.id)}>Enroll as a crew</button>
                  <button className="btn btn-dark" onClick={this.props.closePopup}>X</button>
                </div>
              </div>
            </div>
          )
        }
        return(

          <div className='popup'>
            <div className='popup_inner'>
              <div className="form-group row">
                <label className="col-2 col-form-label">Departure harbor</label>
                <div className="col-10">
                <select className="form-control" name='departureHarborName' value={this.state.newCruise.departureHarborName} onChange={this.handleChange}>
                  <option selected disabled hidden> 
                    Select harbor
                  </option> 
                  {this.state.harbors.map(harbor => (
                    <option>{harbor.City}</option>
                  ))}
                </select>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-2 col-form-label">Departure time</label>
                <div className="col-10">
                  <DateTimePicker onChange={this.departureDateChange} value={this.state.newCruise.departureDate}/>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-2 col-form-label">Arrival harbor</label>
                <div className="col-10">
                <select className="form-control" name='arrivalHarborName' value={this.state.newCruise.arrivalHarborName} onChange={this.handleChange}>
                  <option selected disabled hidden> 
                    Select harbor
                  </option> 
                {this.state.harbors.map(harbor => (
                    <option>{harbor.City}</option>
                  ))}
                </select>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-2 col-form-label">Arrival time</label>
                <div className="col-10">
                  <DateTimePicker onChange={this.arrivalDateChange} value={this.state.newCruise.arrivalDate}/>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-2 col-form-label">Ship</label>
                <div className="col-10">
                <select className="form-control" name='shipName' value={this.state.newCruise.shipName} onChange={this.handleChange}>
                  <option selected disabled hidden> 
                    Select ship
                  </option> 
                {this.state.ships.map(ship => (
                    <option>{ship.Name}</option>
                  ))}
                </select>
                </div>
              </div>
              <div className="row">
                  <label className="col-2 col-form-label">Members</label>
                  <ul className="list-group col-sm-10">
                    {this.state.members.map(member => (
                          <li className="list-group-item">{member}</li>
                        ))}
                  </ul>
              </div>
              <div className="row justify-content-around">
                {(this.props.cruise === 'new') ? (<button className="btn btn-success" onClick={this.addCruise.bind(this, this.state.newCruise)}>Add cruise</button>) : (null)}
                {(this.props.cruise !== 'new') ? (<button className="btn btn-success" onClick={this.updateCruise.bind(this, this.props.cruise.id, this.state.cruiseUpdate)}>Update</button>) : (null)}
                <button className="btn btn-dark" onClick={this.props.closePopup}>X</button>
              </div>
            </div>
          </div>
        )
    }
  }

export default Popup;