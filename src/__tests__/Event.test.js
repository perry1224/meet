import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
  let event, Eventwrapper;
  beforeAll(() => {
    event=mockData[0];

    Eventwrapper = shallow(<Event event={event} />);
  });

test('render title in event item', () => {
  expect(Eventwrapper.find('.event-title')).toHaveLength(1);
});

test('render info in event item', () => {
  expect(Eventwrapper.find('.event-info')).toHaveLength(1);
});

test('render show details button in event item', () => {
  expect(Eventwrapper.find('.details-button')).toHaveLength(1);
})

test('event info renders correctly', () => {
  expect(Eventwrapper.find('.event-title').text()).toContain(event.summary);
  expect(Eventwrapper.find('.event-info_location').text()).toContain(event.location);
  // expect(Eventwrapper.find('.event-details').text()).toContain(event.description);
});

test('event show/hide details works correctly', () => {
  expect(Eventwrapper.find('.event-details')).toHaveLength(0);
  Eventwrapper.setState({
      show: true
  });
  expect(Eventwrapper.find('.event-details').text()).toContain(event.description);
});

test('event info begins hidden', () => {
  Eventwrapper = shallow(<Event event={ event } />);
  expect(Eventwrapper.state('show')).toBe(false);
})

test('when details hidden, clicking details button reveals details', () => {
  Eventwrapper.setState({
      show: false
  });
  Eventwrapper.find('.details-button').simulate('click');
  expect(Eventwrapper.state('show')).toEqual(true);
});

test('when details shown, clicking details button hides details', () => {
  Eventwrapper.setState({
      show: true
  });
  Eventwrapper.find('.details-button').simulate('click');
  expect(Eventwrapper.state('show')).toEqual(false);
});

})



