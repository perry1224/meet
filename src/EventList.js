import React, { Component } from 'react';

class EventList extends Component {
  render() {
    return (
<ul className="EventList">
  {EventSource.map(event =>
    <li key={event.id}>
      <Event event={event} />
    </li>
    )}
</ul>
    );
  }
}


export default EventList;