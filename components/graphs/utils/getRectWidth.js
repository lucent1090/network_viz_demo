import memoizeOne from 'memoize-one';

const getRectWidth = memoizeOne((text, fontSize) => fontSize * (text.length + 2));

export default getRectWidth;
