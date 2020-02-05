import React from 'react'
import { render } from 'react-dom'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

class MapL extends React.Component {
    constructor(props) {
      super(props);
    }
    render(){
        return(<div id="map-container"><Mapa/></div>);
    }
  };

  export default MapL;

  class Mapa extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        markersContent: [],
        harbors: []
      }
    }
    completeDataJobs(){
      fetch("https://yachmanservice.azurewebsites.net/api/Harbors")
      .then(res => res.json())
      .then((data) => {
        this.setState({harbors: data});
        this.populateMarkersContent();
      })
      .catch(console.log)
    }
    populateMarkersContent(){
      var markersContent = [];
      this.state.harbors.forEach(harbor => {
        fetch('https://api.unsplash.com/search/photos?page=1&per_page=1&query='+harbor.City, {
              headers: {
                  'Authorization': 'Client-ID a9693079e8ac2c4aecc3389d8fd70fdc8b65ebeb0b2e4290403d6e28158364c9'
              }
          })
          .then((res) => res.json())
          .then((data) =>{
            markersContent.push({
              url: data.results[0].urls.thumb,
              name: harbor.City,
              latitude: harbor.Latitude,
              longitude: harbor.Longitude
            });
            this.setState({markersContent: markersContent})
          })
          .catch((err)=>console.log(err))
      })
    }
    componentDidMount(){
      this.completeDataJobs()
      console.log(this.state.markersContent);
    }
    render(){
      return(
        <Map center={[51.505, -0.09]} zoom={2} style={{height: "400px"}}>
        <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"/>
         {this.state.markersContent.map((harbor) => (
          <Marker position={[harbor.latitude, harbor.longitude]}>
          <Popup>
              <h3>{harbor.name}</h3>
              <img width="150" src={harbor.url} alt="new"/>
          </Popup>
          </Marker>
        ))}
    </Map>
    );
    }
    } 