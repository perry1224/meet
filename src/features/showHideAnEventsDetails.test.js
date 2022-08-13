import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { shallow, mount } from 'enzyme';

import App from '../App';
import Event from '../Event';

import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('the app has not yet been opened', () => {

    });
    
    let Appwrapper;
    when('the user opens the app', () => {
      Appwrapper = mount(<App />);
    });

    then('all event elements should be collapsed', () => {
      Appwrapper.update();
            let EventWrapper = Appwrapper.find(Event);
            EventWrapper.forEach((event) => expect(event.state('show')).toBe(false));
    });
});
    
test('User can expand an event to see its details', ({ given, when, then }) => {
    let EventWrapper;
  given('an event\'s details are hidden', () => {
      EventWrapper = shallow(<Event event={mockData[0]} />);
      expect(EventWrapper.state('show')).toBe(false);
    });

    when('the user clicks on that event', () => {
      EventWrapper.find('.details-button').simulate('click');
    });

    then('more details about that event should be shown', () => {
      expect(EventWrapper.state('show')).toBe(true)
    });
});

test('User can collapse an event to hide its details', ({ given, when, then }) => {
    let EventWrapper;
    given('an event\'s details are shown', () => {
      EventWrapper = shallow(<Event event={mockData[0]} />);
      EventWrapper.setState({
          show: true
      });
    });

    when('the user clicks on that event', () => {
      EventWrapper.find('.details-button').simulate('click');
    });

    then('the details should be hidden', () => {
      EventWrapper = shallow(<Event event={mockData[0]} />);
      expect(EventWrapper.find('.event .event-details')).toHaveLength(0);
    });
});
})