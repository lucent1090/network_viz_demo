import { combineEpics } from 'redux-observable';

// Import epics and combine
import countdown from './countdown';
import { section, pageScroll, pageResize } from './section';

const rootEpic = combineEpics(
  countdown,
  section,
  pageScroll,
  pageResize,
);

export default rootEpic;
