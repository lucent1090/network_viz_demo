import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { animated } from 'react-spring';
import ReactMarkdown from 'react-markdown';
import mq from '../../styles/media-queries';
import { colors, fontSize } from '../../styles/variables';

const DescriptionContainer = styled.div`
    background-color: rgba(255,255,255,0.9);
    border-radius: 1rem;
    padding: 0.3rem 1rem;;
    margin-top: 2rem;
    margin-left: 0;
    margin-right: 0;
    font-size: ${fontSize.small};
    line-height: 1.65;

    ${mq.greaterThan('mobile')`
      width: 45%;
      max-width: 510px;
      padding: 1rem 1.3rem;
      margin-left: auto;
      margin-right: 3.5%;
      font-size: ${fontSize.normal};
      line-height: unset;
    `}

    p {
      margin-block-start: 0.6em;
      margin-block-end: 0.6em;
    }

    u {
      text-decoration: none;
      box-shadow:
        inset 0 -0.75rem ${colors.lightPrimary},
        inset 0 -0.75rem ${colors.white};
      display: inline;
    }

    hr {
      margin: 0.2rem;
      height: 1.5px;
      border-width:0;
      color: ${colors.white};
      background-color: ${colors.white};
      opacity: 0.5;
    }

    hr + p {
      margin: 0;
      font-size: ${fontSize.xSmall};
      color: ${colors.aquaGray};

      ${mq.greaterThan('mobile')`
        font-size: ${fontSize.small};
      `}
    }
`;

function DescriptionBox({ isActive, md }) {
  const opacity = isActive ? 1 : 0.5;

  return (
    <animated.div style={{ opacity }} className="opacity-trans">
      <DescriptionContainer>
        <ReactMarkdown source={md} escapeHtml={false} />
      </DescriptionContainer>
    </animated.div>
  );
}

DescriptionBox.propTypes = {
  isActive: PropTypes.bool,
  md: PropTypes.string,
};

DescriptionBox.defaultProps = {
  isActive: false,
  md: '',
};

export default DescriptionBox;
