import React, { Component } from 'react';
import "leaflet/dist/leaflet.css";
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import { Map, TileLayer, Marker, Tooltip, Circle } from 'react-leaflet'
import './App.css';

import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const currentMarkerIcon = L.icon({
  iconRetinaUrl: require('./assets/location_icon.png'),
  iconUrl: require('./assets/location_icon.png'),
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(40, 40),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export class App extends Component {
  constructor() {
    super()

    this.state = {
      scooters: [],
      currentLocation: [1.314507, 103.828314],
      distance: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.target)
    const query = "/api/v1/scooters/new/search?"
    fetch(query,
      {
        method: 'post',
        body: data
      })
      .then((response) => {
        return response.json()
      })
      .then((scooters) => {
        console.log(scooters)
        this.setState({
          currentLocation: [this.lat.value, this.lon.value],
          distance: this.distance.value,
          scooters: scooters
        })
      })
  }

  /*componentDidMount(){
    fetch("/api/v1/scooters")
    .then((response)=>{
      return response.json()
    })
    .then((scooters)=>{
        console.log(scooters)
        this.setState({
          scooters: scooters
        })
    })
  }*/


  render() {
    const mapScooters = this.state.scooters
    const scooterList = this.state.scooters.map((scooter, i) => {
      return <li key={i}>{scooter.scooterId}</li>
    })
    const currentLocation = this.state.currentLocation
    const radius = this.state.distance

    return (
      <div className="App">
        <Container className="formContainer">
          <h2>Get Nearby Scooters</h2>
          <Form className="form" onSubmit={(e) => this.handleSubmit(e)}>
            <Col>
              <FormGroup>
                <Label>Distance from current point(meters)</Label>
                <Input
                  name="distance"
                  innerRef={(distance) => this.distance = distance}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Number of Scooters</Label>
                <Input
                  name="numScooters"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Latitude</Label>
                <Input
                  name="lat"
                  innerRef={(lat) => this.lat = lat}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Longitude</Label>
                <Input
                  name="lon"
                  innerRef={(lon) => this.lon = lon}
                />
              </FormGroup>
            </Col>
            <Button>Submit</Button>
          </Form>
        </Container>
        <h1>Scooters Found</h1>
        {scooterList.length > 0 && (
          <ul>
            {scooterList}
          </ul>
        )}
        {scooterList.length == 0 && (
          <h2 style={{color: 'red'}}>
            No scooters in the surrounding area
          </h2>
        )}
        <div className="map">
          <Map 
               style={{ height: "580px", width: "100%" }}
               center={currentLocation}
               zoom={18}
               maxZoom={22} 
               >
            <TileLayer 
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              maxNativeZoom={19} 
              maxZoom={22} 
              />
            {radius>0 &&(
              <Circle
                center={currentLocation}
                radius={radius}
                fillOpacity={0.5}
                stroke={false}
                />
            )}
            <Marker 
              position={currentLocation} 
              icon={currentMarkerIcon}
              >
              <Tooltip 
                direction="right" 
                offset={[-8, -2]} 
                opacity={1}
                >
                <span>
                  Current Location<br />
                  Latitude: {currentLocation[0]}<br />
                  Longitude: {currentLocation[1]}
                </span>
              </Tooltip>
            </Marker>
            {mapScooters.map((scooter, i) => {
              return (
                <Marker 
                  key={i}
                  position={[scooter["lat"], scooter["lon"]]}
                  >
                  <Tooltip 
                    direction="right" 
                    offset={[-8, -2]} 
                    opacity={1}
                    >
                    <span>
                      Scooter Id: {scooter.scooterId}<br />
                      Latitude: {scooter.lat}<br />
                      Longitude: {scooter.lon}</span>
                  </Tooltip>
                </Marker>
              )
            })}
          </Map></div>
      </div>
    )
  }
}

export default App
