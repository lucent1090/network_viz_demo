import React from 'react';
import styled from 'styled-components';
import { ParentSize } from '@vx/responsive';
import Frame from '../../components/layout/Frame';
import Section from '../../components/scroll/Section';
import Subsections from '../../components/layout/Subsections';
import StickyBackground from '../../components/scroll/StickyBackground';
import getCurrentActiveSubsection from '../utils/getCurrentActiveSubsection';
import getSectionHeight from '../utils/getSectionHeight';
import content from '../content';
import frames from '../graphData/helpingEachOther/frames';
import Sankey from '../../components/graphs/Sankey';

const { subsections: subsectionsData } = content.helpingEachOther;

const Container = styled.div`
  background-image: linear-gradient(to top, #820ad2 0%, #192b71 100%);
  position: relative;
  z-index: 100;
`;
const SubSectionContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

export default function HelpingEachOther() {
  return (
    <Section id="helping-each-other">
      {({
        percentage, sectionHeight, windowWidth, windowHeight,
      }) => {
        const currentSub = getCurrentActiveSubsection(subsectionsData, percentage);
        const curFrameData = frames[currentSub];
        const secHeight = getSectionHeight(windowHeight, subsectionsData);

        return (
          <Container style={{ secHeight }}>
            <StickyBackground id="helping-each-other-bg" height={secHeight}>
              {() => (
                <ParentSize>
                  {({ width, height }) => (
                    <Frame
                      width={width}
                      height={height}
                      frameIndex={currentSub}
                    >
                      <Sankey
                        frame={curFrameData}
                        width={width}
                        height={height}
                      />
                    </Frame>
                  )}
                </ParentSize>
              )}
            </StickyBackground>
            <SubSectionContainer>
              <Subsections
                windowWidth={windowWidth}
                windowHeight={windowHeight}
                subsectionsData={subsectionsData}
                currentSub={currentSub}
              />
            </SubSectionContainer>
          </Container>
        );
      }}
    </Section>
  );
}
