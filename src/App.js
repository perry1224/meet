import React, { Component } from "react";
import EventList from "./EventList";
import "./App.css";
import CitySearch from "./CitySearch";
import NumberofEvents from "./NumberOfEvents";
import { getEvents, extractLocations } from "./api";
import "./nprogress.css";
import { OfflineAlert } from './Alert';



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

   updateNumberOfEvents = (eventCount) => {
         this.updateEvents(this.state.activeLocation, eventCount);
}

render() {
 const {offlineText} =  this.state 
 
  return (
    <div className="App">
   <OfflineAlert text={offlineText} />
      <h1>Search for events around the world!</h1>
      <CitySearch
        locations={this.state.locations}
        updateEvents={this.updateEvents}
      />
      <NumberofEvents updateEvents={this.updateNumberOfEvents} />
      <EventList events={this.state.events} />
    </div>
  );
}
}

export default App;
