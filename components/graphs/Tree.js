import React from 'react';
import PropTypes from 'prop-types';
import { hierarchy } from 'd3-hierarchy';
import { LinearGradient } from '@vx/gradient';
import memoizeOne from 'memoize-one';

import Cluster from '../elements/Cluster';
import AnimatedNode from '../elements/AnimatedNode';
import AnimatedLink from '../elements/AnimatedLink';
import getIsMobile, { MAX_TABLET_WIDTH } from './utils/getIsMobile';


const getMargin = memoizeOne((
  isMobile,
  width,
  wMobileScale,
  topMobileMargin,
  bottomMobileMargin,
) => {
  let right = 100;
  if (!isMobile) {
    right = width - MAX_TABLET_WIDTH;

    return {
      top: 20,
      left: -30,
      right,
      bottom: 30,
    };
  }
  // the margin for mobile devices
  return {
    top: topMobileMargin,
    left: -40 * wMobileScale,
    right: -42 * wMobileScale - 12,
    bottom: bottomMobileMargin,
  };
});
const getMobile = memoizeOne(getIsMobile);

function Tree({
  frame,
  width,
  height,
  wMobileScale,
  topMobileMargin,
  bottomMobileMargin,
  isMobile = getMobile(width),
  margin = getMargin(
    isMobile,
    width,
    wMobileScale,
    topMobileMargin,
    bottomMobileMargin,
  ),
  nodesScale,
}) {
  const {
    data,
    focus,
    showLinkNum,
    highlights,
  } = frame;

  const hierarchicalData = hierarchy(data);
  return (
    <svg width={width} height={height}>
      <LinearGradient id="big-brother" from="#79d259" to="#37ac8c" />
      <LinearGradient id="0-motherA" from="#af03d6" to="#ff004e" />
      ff004e
      <Cluster
        top={margin.top}
        left={margin.left}
        data={hierarchicalData}
        focusNodes={focus}
        highlights={highlights}
        showLinkNum={showLinkNum}
        size={[
          width - margin.left - margin.right,
          height - margin.top - margin.bottom,
        ]}
        nodesScale={nodesScale}
        nodeComponent={AnimatedNode}
        linkComponent={AnimatedLink}
        isMobile={isMobile}
      />
    </svg>
  );
}

Tree.propTypes = {
  wMobileScale: PropTypes.number,
  topMobileMargin: PropTypes.number,
  bottomMobileMargin: PropTypes.number,
};

Tree.defaultProps = {
  wMobileScale: 1,
  topMobileMargin: -30,
  bottomMobileMargin: -30,
};

export default Tree;
