import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';

import App from '../App';
import NumberOfEvents from '../NumberOfEvents';



const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('When user hasn’t specified a number, 32 is the default number', ({ given, when, then }) => {
      given('the app has not yet been opened', () => {

    });
    let Appwrapper;
    when('the user opens the app', () => {
      Appwrapper = mount(<App />);
    });

    then('32 events should be shown on screen', () => {
      Appwrapper.update()
      expect(Appwrapper.state('numberOfEvents')).toEqual(32)
    });
});



test('User can change the number of events they want to see', ({ given, when, then }) => {
    let AppWrapper;  
  given('the main page is open', () => {
      AppWrapper = mount(<App />);
    });

    when('the user enters a number', () => {
      AppWrapper.update();
      let NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      const eventObject =  {target: { value: 5 } };
      NumberOfEventsWrapper.find('.number-input').simulate('change', eventObject);

    });

    then('that number of events should be shown on screen', () => {
      expect(AppWrapper.state('numberOfEvents')).toEqual(5);
    });
})

})