import {
  SAVE_SECTION_POSITION,
  SAVE_BATCH_SECTIONS,
  UPDATE_SCROLL_POSITION,
  UPDATE_WINDOW_RESIZE,
} from '../actions/section';

const DESKTOP_WINDOW_SIZE = 992;

const initialState = {
  secPositions: {},
  pageScroll: {
    windowWidth: 500,
    windowHeight: 500,
    scrollTop: 0,
    scrollBottom: 0,
    scrollOffset: 0,
  },
};

function section(state = initialState, action) {
  switch (action.type) {
    case SAVE_SECTION_POSITION: {
      const { secPositions } = state;
      const { id, refs, position } = action;
      return {
        ...state,
        secPositions: {
          ...secPositions,
          [id]: {
            refs,
            position,
          },
        },
      };
    }
    case SAVE_BATCH_SECTIONS: {
      const { sections } = action;
      return {
        ...state,
        secPositions: {
          ...sections,
        },
      };
    }
    case UPDATE_SCROLL_POSITION: {
      const {
        scrollTop: preScrollTop,
        windowHeight,
      } = state.pageScroll;
      const { scrollTop } = action;
      const scrollOffset = scrollTop - preScrollTop;
      const scrollBottom = scrollTop + windowHeight;

      return {
        ...state,
        pageScroll: {
          ...state.pageScroll,
          scrollTop,
          scrollBottom,
          scrollOffset,
        },
      };
    }
    case UPDATE_WINDOW_RESIZE: {
      const {
        windowWidth: preWindowWidth,
      } = state.pageScroll;
      const { windowWidth, windowHeight, scrollTop } = action;
      if (windowWidth > DESKTOP_WINDOW_SIZE || windowWidth !== preWindowWidth) {
        return {
          ...state,
          pageScroll: {
            windowWidth,
            windowHeight,
            scrollTop,
          },
        };
      }
      return state;
    }
    default:
      return state;
  }
}

export default section;
