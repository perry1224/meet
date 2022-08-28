import React, { Component } from "react";
import EventList from "./EventList";
import "./App.css";
import CitySearch from "./CitySearch";
import NumberofEvents from "./NumberOfEvents";
import { getEvents, extractLocations } from "./api";
import "./nprogress.css";
import { OfflineAlert } from './Alert';
import  EventGenre  from './EventGenre';

import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';


class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    activeLocation: "all",
    offlineText: ''
    
  };


  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
    if (!navigator.onLine) {
      this.setState({
        offlineText: "Your're offline! The data was loaded from the cache.",
      });
    } else {
      this.setState({
        offlineText: '',
      });
  }}
  componentWillUnmount() {
    this.mounted = false;
  }
  updateEvents = (location, eventCount = this.state.eventCount) => {
    getEvents().then((events) => {
      let locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);
      locationEvents = locationEvents.slice(0, eventCount);
      this.setState({
        events: locationEvents,
        numberOfEvents: eventCount,
        activeLocation: location,
        
      });
    });
  };

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return {city, number};
    })
    return data;
  };

   updateNumberOfEvents = (eventCount) => {
         this.updateEvents(this.state.activeLocation, eventCount);
}

render() {
 const {offlineText, events, locations, numberOfEvents } =  this.state 
 
  return (
    <div className="App">
   <OfflineAlert text={offlineText} />
      <h1>Search for events around the world!</h1>
      <CitySearch
        locations={locations}
        updateEvents={this.updateEvents}
      />
      <NumberofEvents 
          updateEvents={this.updateNumberOfEvents} 
          numberOfEvents={numberOfEvents} 
      />


<div className="data-vis-wrapper">
  <EventGenre events = {events} />
    <ResponsiveContainer height={400} >
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis type="category" dataKey="city" name="city" />
            <YAxis
              allowDecimals={false}
              type="number"
              dataKey="number"
              name="number of events"
            />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter data={this.getData()} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
</div>

      <EventList events={events} />
    </div>
  );
}
}

export default App;