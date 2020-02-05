import React from 'react'
import { render } from 'react-dom'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

class MapL extends React.Component {
    constructor(props) {
      super(props);
    }
    render(){
        return(<div id="map-container"><Mapa harbors={this.props.harbors}/></div>);
    }
  };

  export default MapL;

  function Mapa(props) {
        return(
        <Map center={[51.505, -0.09]} zoom={2} style={{height: "400px"}}>
        <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"/>
         {props.harbors.map((harbor) => (
          <Marker position={[harbor.Latitude,harbor.Longitude]}>
          <Popup>
              <img width="100" src="https://images.barrons.com/im-117923?width=1260&size=1.5005861664712778" alt="new"/>
              A pretty CSS3 popup.<br />Easily customizable.
            </Popup>
          </Marker>
        ))}
    </Map>
    );
    } 