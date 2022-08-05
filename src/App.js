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
      <CitySearch />
      <NumberofEvents />
      </div>
    );
  }
}

export default App;
