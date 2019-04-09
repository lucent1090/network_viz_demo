import styled from 'styled-components';
import { colors, fontSize, fontWeight } from '../../styles/variables';
import mq from '../../styles/media-queries';

const SectionTitleBox = styled.div`
  max-width: 736px;
  margin-left: auto;
  margin-right: auto;
  padding: 1.1rem;
  color: ${colors.white};

  h3 {
    color: ${colors.white};
    font-size: ${fontSize.large};
    font-weight: ${fontWeight.bold};
    line-height: 1.35;
    margin-top: 0;

    ${mq.greaterThan('tablet')`
      font-size: ${fontSize.superLarge};
    `}
  }

  h4 {
    position: relative;
    color: ${colors.aquaGray};
    font-size: ${fontSize.normalPlus};
    margin-bottom: 0.5rem;

    &:before {
      content: "";
      position: absolute;
      top: -0.35rem;
      left: 0;
      width: 2.8rem;
      height: 0.5rem;
      border-top: 2px solid ${colors.aquaGray};
    }

    ${mq.greaterThan('tablet')`
      font-size: ${fontSize.medium};
    `}
  }
`;

export default SectionTitleBox;
