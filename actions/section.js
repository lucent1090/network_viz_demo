export const CALCULATE_SECTION_POSITION = 'CALCULATE_SECTION_POSITION';
export const SAVE_SECTION_POSITION = 'SAVE_SECTION_POSITION';
export const SAVE_BATCH_SECTIONS = 'SAVE_BATCH_SECTIONS';
export const RECORD_WINDOW_SCROLL = 'RECORD_WINDOW_SCROLL';
export const RECORD_WINDOW_RESIZE = 'RECORD_WINDOW_RESIZE';
export const UPDATE_SCROLL_POSITION = 'UPDATE_SCROLL_POSITION';
export const UPDATE_WINDOW_RESIZE = 'UPDATE_WINDOW_RESIZE';

export const startCalculatePosistion = (id, refs) => ({
  type: CALCULATE_SECTION_POSITION,
  id,
  refs,
});

export const saveSectionPosition = (id, refs, position) => ({
  type: SAVE_SECTION_POSITION,
  id,
  refs,
  position,
});

export const saveBatchSections = sections => ({
  type: SAVE_BATCH_SECTIONS,
  sections,
});

export const recordWindowScroll = () => ({
  type: RECORD_WINDOW_SCROLL,
});

export const recordWindowResize = () => ({
  type: RECORD_WINDOW_RESIZE,
});

export const updateSrollPosition = scrollTop => ({
  type: UPDATE_SCROLL_POSITION,
  scrollTop,
});

export const updateWindowResize = (windowWidth, windowHeight, scrollTop) => ({
  type: UPDATE_WINDOW_RESIZE,
  windowWidth,
  windowHeight,
  scrollTop,
});
