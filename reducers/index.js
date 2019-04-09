import { combineReducers } from 'redux';

import { counter, countdown } from './counter';

import section from './section';

const rootReducer = combineReducers({
  counter,
  countdown,
  section,
});

export default rootReducer;
