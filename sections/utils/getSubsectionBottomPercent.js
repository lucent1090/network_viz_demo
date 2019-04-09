import memoizeOne from 'memoize-one';

const getSubsectionBottomPercent = memoizeOne((subsections, subsecIndex) => {
  let sum = 0;
  let secBottom = 0;
  subsections.forEach((sub, i) => {
    const secLength = sub.viewportPercent;
    sum += secLength;
    if (i <= subsecIndex) {
      secBottom += secLength;
    }
  });
  return Math.round(10000 * secBottom / sum) / 100;
});

export default getSubsectionBottomPercent;
