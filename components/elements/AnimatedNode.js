import React from 'react';
import PropTypes from 'prop-types';
import { Transition, animated } from 'react-spring';
import memoizeOne from 'memoize-one';
import { colors } from '../../styles/variables';
import getRectWidth from '../graphs/utils/getRectWidth';
import getNodeName from '../graphs/utils/getNodeName';

const HIDE_OPACITY = 0.4;

const getTopLeft = memoizeOne(({ x, y }) => ({
  top: x,
  left: y,
}));

const getNodeOpacity = memoizeOne((nodeName, highlights) => {
  if (!highlights) {
    return 1;
  }
  return highlights.indexOf(nodeName) >= 0 ? 1 : HIDE_OPACITY;
});

const getRectProps = memoizeOne((data, node, width, height, boxScale, fontSize) => {
  const rootWidth = data.hasOwnProperty('nodeWidth') ? data.nodeWidth : (65 * boxScale);

  if (node.depth === 0) {
    return {
      width: rootWidth,
      height: boxScale * height,
      y: -boxScale * height / 2,
      x: -boxScale * width / 2,
    };
  }

  return {
    width: boxScale * getRectWidth(data.name, fontSize),
    height: boxScale * height,
    y: -boxScale * height / 2,
    x: -boxScale * width / 2,
    rx: 14 * boxScale,
  };
});

const getBoxScale = memoizeOne((depth, nodesScale) => {
  let curScale;
  if (nodesScale) {
    curScale = nodesScale[depth];
  }
  return curScale || (1.5 - depth * 0.28);
});

function AnimatedNode({
  node,
  fontSize,
  highlights,
  nodesScale,
}) {
  const width = 60;
  const height = 30;
  const { data } = node;
  const { type } = data;
  const opacity = getNodeOpacity(getNodeName(node), highlights);
  const boxScale = getBoxScale(node.depth, nodesScale);

  return (
    <Transition
      from={getTopLeft(node)}
      update={getTopLeft(node)}
    >
      {styles => (
        // x and y positions are inversed to make the graph horizontal
        <animated.g
          transform={`translate(${styles.left}, ${styles.top})`}
        >
          <rect
            fill={colors.darkGray}
            rx={14 * boxScale}
            {...getRectProps(data, node, width, height, boxScale, fontSize)}
          />
          <animated.g
            className="opacity-trans"
            opacity={opacity}
          >
            {
            node.depth === 0
              && (
              <rect
                fill={`url('#${data.key}')`}
                rx={14 * boxScale}
                {...getRectProps(data, node, width, height, boxScale, fontSize)}
              />
              )
            }
            {
            node.depth !== 0
              && (
              <rect
                fill={colors[type]}
                {...getRectProps(data, node, width, height, boxScale, fontSize)}
              />
              )
            }
            <text
              dx={fontSize * 0.8}
              dy=".33em"
              x={-width / 2}
              fontSize={fontSize * boxScale}
              textAnchor="left"
              style={{ pointerEvents: 'none' }}
              fill={colors.white}
            >
              {node.data.name}
            </text>
          </animated.g>
        </animated.g>
      )}
    </Transition>
  );
}

AnimatedNode.defaultProps = {
  isMobile: PropTypes.bool,
};

AnimatedNode.defaultProps = {
  isMobile: PropTypes.false,
};

export default AnimatedNode;
