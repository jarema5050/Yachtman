import React, { Component } from 'react';
import './App.css';
import Cruises from './components/cruises';
import Cruise from './Model/Cruise';
import MapL from './components/map.js';
class App extends Component {
  state = {
    cruises: [],
    harbors: []
  }
  componentDidMount() {
    this.fetchData();
    this.fetchHarbors();
  }
  fetchData(){
    fetch("http://localhost:55526/api/Cruises")
    .then(res => res.json())
    .then((data) => {
      var cruisesTemp = [];
      data.forEach(cruise => {
        let obj = new Cruise(cruise.Id, cruise.DepartureHarborName, cruise.ArrivalHarborName,new Date(Date.parse(cruise.DepartureDate)), new Date(Date.parse(cruise.ArrivalDate)), cruise.ShipName);
        cruisesTemp.push(obj);
      });
      this.setState({cruises: cruisesTemp});
    })
    .catch(console.log)
  }
  fetchHarbors(){
    fetch("http://localhost:55526/api/Harbors")
    .then(res => res.json())
    .then((data) => {
      this.setState({harbors: data});
    })
    .catch(console.log)
  }
  render () {
    //console.log(this.state.cruises);
    return (
      <React.Fragment>
        <MapL harbors={this.state.harbors}/>
        <Cruises cruises={this.state.cruises}/>
      </React.Fragment>
    );
  }
}
export default App;
