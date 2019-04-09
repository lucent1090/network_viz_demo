import styled from 'styled-components';
import mq from '../../styles/media-queries';

const FullScreen = styled.div`
  > div {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;

    /* ${mq.greaterThan('tablet')`
      max-width: 880px;
    `} */
  }
`;

export default FullScreen;
