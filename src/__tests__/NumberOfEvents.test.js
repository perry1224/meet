import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberofEvents /> component', () => {

  let NumberofEventsWrapper;
  beforeAll(() => {
    NumberofEventsWrapper= shallow(<NumberOfEvents updateEvents={() => {} }/>)
  });

  test('render number input', () =>{
    expect(NumberofEventsWrapper.find('.number-input')).toHaveLength(1);
  });

  test('default number of events is 32', () =>{

    expect(NumberofEventsWrapper.find('.number-input').prop('value')).toBe(32);
  });

  test('render change the number of events in input field by changing state', () => {
    NumberofEventsWrapper.setState({
      renderNumber: 32
    });
    const eventObject={ target: { value: 7 } };
      NumberofEventsWrapper.find('.number-input').simulate('change', eventObject);
      expect(NumberofEventsWrapper.state('renderNumber')).toBe(7);
  })
 
})
