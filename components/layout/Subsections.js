/* eslint-disable react/no-array-index-key */
import React from 'react';
import memoizeOne from 'memoize-one';
import { SUBSEC_TYPES } from '../../sections/configs/subsection';
import DescriptionBox from './DescriptionBox';
import SubsectionBox from './SubsectionBox';
import Frame from './Frame';

const getSubsectionComponents = memoizeOne((windowHeight, subsectionsData, currentSub) => {
  return subsectionsData.map((subsec, subIndex) => {
    const { type, viewportPercent, md } = subsec;
    switch (type) {
      case SUBSEC_TYPES.description:
        return (
          <SubsectionBox key={`sub-${subIndex}`} style={{ height: windowHeight * viewportPercent / 100 }}>
            <DescriptionBox
              isActive={currentSub === subIndex}
              md={md}
            />
          </SubsectionBox>
        );
      case SUBSEC_TYPES.empty:
        return (
          <SubsectionBox key={`sub-${subIndex}`} style={{ height: windowHeight * viewportPercent / 100 }} />
        );
      default:
        return null;
    }
  });
});

function Subsections({
  windowWidth,
  windowHeight,
  subsectionsData,
  currentSub,
}) {
  return (
    <Frame
      width={windowWidth}
      height={windowHeight}
      frameIndex={currentSub}
    >
      {getSubsectionComponents(windowHeight, subsectionsData, currentSub)}
    </Frame>
  );
}

export default Subsections;
