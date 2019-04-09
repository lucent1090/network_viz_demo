import React from 'react';
import styled from 'styled-components';
import SectionTitleBox from '../../components/layout/SectionTitleBox';

const Container = styled.div`
  display: inline-block;
  width: 100%;
  background-image: linear-gradient(to bottom, #450173 0%, #192b71 100%);
  height: 30rem;
  padding-top: 10rem;
  position: relative;
  z-index: 20;
  margin-bottom: -1px;
`;

function MotherAHeader() {
  return (
    <Container>
      <SectionTitleBox>
        <h4>
          Mother A
        </h4>
        <h3>
          Who is she?
        </h3>
        <p>
           Story about mother A
        </p>
      </SectionTitleBox>
    </Container>
  );
}

export default MotherAHeader;
