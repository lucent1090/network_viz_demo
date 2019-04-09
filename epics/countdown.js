import { interval } from 'rxjs';
import { takeUntil, mergeMap, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import {
  START_COUNTDOWN, INCREMENT_ASYNC, INCREMENT, CANCEL_INCREMENT_ASYNC,
} from '../actions/actionTypes';

const countdown = action$ => action$.pipe(
  ofType(START_COUNTDOWN),
  mergeMap(action => interval(3000).pipe(
    map((seconds) => {
      // actual increment action
      if (seconds === -1) {
        return { type: INCREMENT };
      }
      // increment async action

      return { type: INCREMENT_ASYNC, value: seconds };
    }),
    takeUntil(action$.ofType(CANCEL_INCREMENT_ASYNC)),
  )),
);

export default countdown;
