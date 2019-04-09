import React from 'react';
import styled from 'styled-components';
import { ParentSize } from '@vx/responsive';
import { animated } from 'react-spring';
import memoizeOne from 'memoize-one';

import Cover from '../cover';
import Tree from '../../components/graphs/Tree';
import Frame from '../../components/layout/Frame';
import FullScreen from '../../components/layout/FullScreen';
import Subsections from '../../components/layout/Subsections';
import Section from '../../components/scroll/Section';
import SectionTitleBox from '../../components/layout/SectionTitleBox';

import getSubsectionBottomPercent from '../utils/getSubsectionBottomPercent';
import getCurrentActiveSubsection from '../utils/getCurrentActiveSubsection';
import getSectionHeight from '../utils/getSectionHeight';
import content from '../content';
import frames from '../graphData/bigBrother/frames';

const { subsections: subsectionsData } = content.bigBrother;

const Container = styled.div`
  width: 100%;
  position: relative;
  background-image: linear-gradient(
    to top,
    #820ad2 0%,
    #192b71 80%,
    #ED556D 100%
  );
`;

const TitleSection = styled.div`
  position: absolute;
  top: 100vh;
  left: 0;
  width: 100%;
`;

const getTreeBackgrounStyle = memoizeOne((subsections, percentage, windowHeight) => {
  const initialTop = windowHeight * 0.25;
  const secondSec = getSubsectionBottomPercent(subsections, 1);
  const style = {
    top: 0,
    opacity: 1,
  };

  if (percentage > secondSec) {
    return style;
  }

  return {
    opacity: 0.6,
    top: initialTop,
    filter: 'blur(3px)',
  };
  // #FIXME: temporarily turn off the parallax effect
  // const parallaxSpeed = 1.25;
  // const firstSec = getSubsectionBottomPercent(subsections, 0);
  // const secondScrolled = (percentage - firstSec) / (thirdSec - firstSec);
  // const offset = (1 - secondScrolled * parallaxSpeed) * initialTop;
  // if (offset > 0) {
  //   return {
  //     opacity: 0.6,
  //     top: offset,
  //     filter: 'blur(3px)',
  //   };
  // }
  // return style;
});

function BigBrother() {
  return (
    <Section id="bigBrother">
      {({ percentage, windowWidth, windowHeight }) => {
        const backgroundStyle = getTreeBackgrounStyle(subsectionsData, percentage, windowHeight);
        // gets the current sub-section by scroll positions
        const currentSub = getCurrentActiveSubsection(subsectionsData, percentage);
        const curFrameData = frames[currentSub];

        return (
          <Container style={{ height: getSectionHeight(windowHeight, subsectionsData) }}>
            {/* Background */}
            <FullScreen>
              <animated.div className="all-trans" style={backgroundStyle}>
                <ParentSize>
                  {({ width, height }) => (
                    <Frame
                      width={width}
                      height={height}
                      frameIndex={currentSub}
                    >
                      <Tree
                        currentFrame={currentSub}
                        frame={curFrameData}
                        width={width}
                        height={height}
                        nodesSize={[1.5, 1.25, 0.95, 0.95]}
                      />
                    </Frame>
                  )}
                </ParentSize>
              </animated.div>
            </FullScreen>

            {/* Cover */}
            <Cover />
            <TitleSection>
              <SectionTitleBox>
                <h4>
                  The Big Brother
                </h4>
                <h3>
                  Who is he?
                </h3>
                <p>
                The big brother is true.
                </p>
                <p>
                We can find out here.
                </p>
              </SectionTitleBox>
            </TitleSection>

            {/* Description Boxes */}
            <Subsections
              windowWidth={windowWidth}
              windowHeight={windowHeight}
              subsectionsData={subsectionsData}
              currentSub={currentSub}
            />
          </Container>
        );
      }}
    </Section>
  );
}

export default BigBrother;
