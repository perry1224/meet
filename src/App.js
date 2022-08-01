import React from 'react';
import EventList from './EventList';
import './App.css';
import CitySearch from './CitySearch';

class App extends Component  {
  render () {
    return (
      <div className="App">
      <EventList />
      <CitySearch />
      </div>
    );
  }
}

export default App;
