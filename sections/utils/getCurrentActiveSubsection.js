import getSubsectionBottomPercent from './getSubsectionBottomPercent';

function getCurrentActiveSubsection(subsections, percentage) {
  const subsecCnt = subsections.length;
  for (let i = 0; i < subsecCnt; i += 1) {
    if (getSubsectionBottomPercent(subsections, i) >= percentage) {
      return i;
    }
  }
  return subsecCnt - 1;
}

export default getCurrentActiveSubsection;
