function getSectionHeight(windowHeight, subsectionsData) {
  const totalPercent = subsectionsData.reduce((acc, { viewportPercent }) => acc + viewportPercent, 0);
  return totalPercent * windowHeight / 100;
}

export default getSectionHeight;
