import React from 'react';
import styled from 'styled-components';
import { ParentSize } from '@vx/responsive';
import Tree from '../../components/graphs/Tree';
import Frame from '../../components/layout/Frame';
import Section from '../../components/scroll/Section';
import Subsections from '../../components/layout/Subsections';
import StickyBackground from '../../components/scroll/StickyBackground';
import getCurrentActiveSubsection from '../utils/getCurrentActiveSubsection';
import getSectionHeight from '../utils/getSectionHeight';
import content from '../content';
import frames from '../graphData/motherA/frames';

const { subsections: subsectionsData } = content.motherA;

const Container = styled.div`
  background-image: linear-gradient(to top, #820ad2 0%, #192b71 100%);
  position: relative;
  z-index: 100;
`;
const SubSectionContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

export default function MotherA() {
  return (
    <Section id="MotherA">
      {({ percentage, sectionHeight, windowWidth, windowHeight }) => {
        const currentSub = getCurrentActiveSubsection(subsectionsData, percentage);
        const curFrameData = frames[currentSub];
        const secHeight = getSectionHeight(windowHeight, subsectionsData);

        return (
          <Container style={{ height: secHeight }}>
            <StickyBackground id="motherA-bg" height={secHeight}>
              {() => (
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
                        wMobileScale={2}
                        topMobileMargin={50}
                        bottomMobileMargin={80}
                        nodesScale={[1.5, 1.3, 1.3, 0.95]}
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
