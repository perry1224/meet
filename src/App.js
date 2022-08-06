import React, { Component } from 'react';
import EventList from './EventList';
import './App.css';
import CitySearch from './CitySearch';
import NumberofEvents from './NumberOfEvents';

class App extends Component  {
  render () {
    return (
      <div className="App">
      <EventList />
      <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
      <NumberofEvents updateEvents={this.updateNumberOfEvents} />
      
      </div>
    );
  }
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    activeLocation: 'all',
  }

updateEvents = (location, eventCount = 
    this.state.eventCount) => {
     getEvents().then((events) => {
      let locationEvents = (location === "all" ? 
         events : events.filter((event) => event.location === location));
      locationEvents = locationEvents.slice(0, eventCount)
      this.setState({
        events: locationEvents,
        numberOfEvents: eventCount,
        activeLocation: location
      });
    });
  }

  updateNumberOfEvents = (eventCount) => {
         updateEvents(this.state.activeLocation, eventCount);
}
}

export default App;
