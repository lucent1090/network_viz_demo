import { ofType } from 'redux-observable';
import {
  groupBy,
  mergeMap,
  map,
  scan,
  sampleTime,
} from 'rxjs/operators';

import {
  CALCULATE_SECTION_POSITION,
  RECORD_WINDOW_SCROLL,
  RECORD_WINDOW_RESIZE,
  saveBatchSections,
  updateSrollPosition,
  updateWindowResize,
} from '../actions/section';

const SCROLL_SAMPLE_TIME = 16;
const SECTION_RESIZE_SAMPLE_TIME = 100;
const SECTIONS_AGGREGATE_TIME = 50;

function getSectionPosition(refs) {
  const rect = refs.getBoundingClientRect();
  const {
    left, top, width, height,
  } = rect;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    left: left + scrollLeft,
    top: top + scrollTop,
    width,
    height,
  };
}

const section = action$ => action$.pipe(
  ofType(CALCULATE_SECTION_POSITION),
  groupBy(
    action => action.id,
  ),
  mergeMap(groupAction$ => groupAction$.pipe(
    sampleTime(SECTION_RESIZE_SAMPLE_TIME),
    map((action) => {
      const { id, refs } = action;
      const position = getSectionPosition(refs);
      return {
        id,
        refs,
        position,
      };
    }),
  )),
  // reduce all the calculated sections
  scan((sections, { id, refs, position }) => ({
    ...sections,
    [id]: {
      refs,
      position,
    },
  }), {}),
  // aggregate the calculated sections until it reached the debounceTime
  sampleTime(SECTIONS_AGGREGATE_TIME),
  map(sections => saveBatchSections(sections)),
);

const pageScroll = action$ => action$.pipe(
  ofType(RECORD_WINDOW_SCROLL),
  sampleTime(SCROLL_SAMPLE_TIME),
  map(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return updateSrollPosition(scrollTop);
  }),
);

const pageResize = action$ => action$.pipe(
  ofType(RECORD_WINDOW_RESIZE),
  sampleTime(CALCULATE_SECTION_POSITION),
  map(() => {
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return updateWindowResize(windowWidth, windowHeight, scrollTop);
  }),
);

export { section, pageScroll, pageResize };
