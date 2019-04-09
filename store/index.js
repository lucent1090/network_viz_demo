import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

// import root epics/reducer
import rootEpic from '../epics';
import rootReducer from '../reducers';

const epicMiddleware = createEpicMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(epicMiddleware)),
);

epicMiddleware.run(rootEpic);

export default store;
