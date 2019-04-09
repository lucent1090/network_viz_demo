import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { colors, fontSize, fontWeight } from '../../styles/variables';
import mq from '../../styles/media-queries';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  padding-top: 2rem;
  box-sizing: border-box;

  ${mq.greaterThan('mobile')`
      padding-top: 8rem;
  `}
}
`;

const TitleBox = styled.div`
  display: table;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0;

  h1 {
    position: relative;
    color: ${colors.white};
    line-height: 1.3;
    text-align: center;
    font-size: ${fontSize.large};
    font-weight: ${fontWeight.bold};
    margin-left: 1rem;
    margin-right: 1rem;
    margin-bottom: 0;
    ${mq.greaterThan('tablet')`
      font-size: ${fontSize.superLarge};
    `}
  }
`;

const SubtitleBox = styled.div`
  color: ${colors.lightGray};
  line-height: 1.3;
  text-align: center;
  margin-top: 0.5rem;
  margin-bottom: 0.7rem;

  h2 {
    margin-left: 1rem;
    margin-right: 1rem;
    font-size: ${fontSize.medium};
    ${mq.greaterThan('tablet')`
      font-size: ${fontSize.xMedium};
  `}
  }
`;

const Description = styled.div`
  width: 100%;
  color: ${colors.lightGray};
  margin-top: 2rem;
  font-size: ${fontSize.small};

  ${mq.greaterThan('mobile')`
      margin-top: 5rem;
      margin-left: auto;
      margin-right: auto;
      max-width: 66%;
      font-size: ${fontSize.normal};
  `}

  div {
    margin: 1rem;
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.25);
    border-radius: 1rem;
  }
`;

const coverDes = `Let's find out who's the real boss.`;

function Cover() {
  return (
    <Container>
      <TitleBox>
        <h1>Who's the boss</h1>
      </TitleBox>
      {/* <SubtitleBox>
        <h2></h2>
      </SubtitleBox> */}
      <Description>
        <div>
          <ReactMarkdown source={coverDes} escapeHtml={false} />
        </div>
      </Description>
    </Container>
  );
}

export default Cover;
