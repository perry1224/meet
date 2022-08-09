import React, { Component } from "react";
import EventList from "./EventList";
import "./App.css";
import CitySearch from "./CitySearch";
import NumberofEvents from "./NumberOfEvents";
import { getEvents, extractLocations } from "./api";
import "./nprogress.css";

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    activeLocation: "all",
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

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
    return (
      <div className="App">
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
