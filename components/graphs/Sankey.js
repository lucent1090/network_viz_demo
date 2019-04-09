import React from 'react';
import PropTypes from 'prop-types';
import { Group } from '@vx/group';
import { Text } from '@vx/text';
import { min, max } from 'd3-array';
import { animated } from 'react-spring';
import memoizeOne from 'memoize-one';

import { sankeyLinkHorizontal } from 'd3-sankey';
import Flow from '../elements/Flow';
import { colors } from '../../styles/variables';
import getIsMobile, { MAX_TABLET_WIDTH } from './utils/getIsMobile';

const ROUND_BORDER_PX = 2;
const path = sankeyLinkHorizontal();

const getMargin = memoizeOne((
  isMobile,
  width,
  wMobileScale,
  topMobileMargin,
  bottomMobileMargin,
) => {
  let right = 100;
  if (!isMobile) {
    right = 100 + (width - MAX_TABLET_WIDTH);

    return {
      top: 80,
      left: 10,
      right,
      bottom: 100,
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

function getNodeName(node) {
  return node.key || node.name;
}

function getBoundary(nodes, focusNodes = []) {
  const filterNodes = nodes.filter(node => focusNodes.indexOf(getNodeName(node)) >= 0);
  const xArr = [];
  const yArr = [];
  filterNodes.forEach(({
    x0, x1, y0, y1,
  }) => {
    xArr.push(x0, x1);
    yArr.push(y0, y1);
  });
  const boundary = {
    left: min(xArr) + 20,
    right: max(xArr) + 100,
    top: min(yArr) - 80,
    bottom: max(yArr) + 180,
  };
  return boundary;
}

function getOpacity(isHighlighted) {
  return isHighlighted ? 1 : 0.4;
}

// Returns the transform settings for the outer svg group
const getTransform = (oriWidth, oriHeight, top, left, nodes, focusNodes = [], isMobile) => {
  if (!nodes || focusNodes.length === 0) {
    return '';
  }

  const boundary = getBoundary(nodes, focusNodes);
  const newWidth = boundary.right - boundary.left;
  const newHeight = boundary.bottom - boundary.top;
  const oriCenterX = left + oriWidth / 2;
  const oriCenterY = top + oriHeight / 2;
  const newCenterX = (boundary.right + boundary.left) / 2;
  const newCenterY = (boundary.bottom + boundary.top) / 2;
  const scale = Math.min(oriWidth / newWidth, oriHeight / newHeight) * 1.1;
  const translateX = oriCenterX - newCenterX * scale;
  const translateY = oriCenterY - newCenterY * scale;

  return `translate(${translateX}px, ${translateY}px) scale(${scale})`;
};


function Sankey({
  top,
  left,
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
}) {
  if (width < 10) return null;

  const {
    data,
    focus: focusNodes = [],
    highlights = [],
  } = frame;

  const graphWidth = width - margin.left - margin.right;
  const graphHeight = height - margin.top - margin.bottom;
  const transformStr = getTransform(graphWidth, graphHeight, top, left, data.nodes, focusNodes, isMobile);

  return (
    <svg
      width={width}
      height={height}
    >
      <animated.g className="graph-groups" style={{ transform: transformStr }}>
        <Flow
          top={margin.top}
          left={margin.left}
          data={data}
          size={[
            graphWidth,
            graphHeight,
          ]}
          nodeWidth={28}
          nodePadding={30}
        >
          {({ data: computedData }) => {
            const nodeRects = [];
            const nodeTexts = [];
            // Rectangle boxes for the nodes
            computedData.nodes.forEach((node, i) => {
              const isHighlighted = focusNodes.indexOf(node.key) >= 0;
              nodeRects.push(
                <animated.g
                  key={node.key || `node-${i}`}
                  className="opacity-trans"
                  opacity={getOpacity(isHighlighted)}
                >
                  <Group top={node.y0 - ROUND_BORDER_PX} left={node.x0}>
                    <rect
                      id={`rect-${i}`}
                      width={node.x1 - node.x0}
                      height={2 * ROUND_BORDER_PX + node.y1 - node.y0}
                      fill={colors[node.type]}
                      rx={ROUND_BORDER_PX}
                    />
                  </Group>
                </animated.g>,
              );

              // Text of the nodes
              nodeTexts.push(
                <animated.g
                  key={`text-${i}`}
                  className="opacity-trans"
                  opacity={getOpacity(isHighlighted)}
                >
                  <Group top={node.y0 - ROUND_BORDER_PX} left={node.x0}>
                    <Text
                      x={33 + (node.x1 - node.x0) / 10}
                      y={(node.y1 - node.y0) / 2 - 3}
                      fill={colors.white}
                      lineHeight="1.25em"
                      textAnchor="start"
                      verticalAnchor="middle"
                      fontSize={isMobile ? 13.5 : 17}
                      width={node.x1 - node.x0}
                    >
                      {node.name}
                    </Text>
                  </Group>
                </animated.g>,
              );
            });

            return (
              <Group>
                {/* Links */}
                <Group>
                  {computedData.links.map((link, i) => {
                    const isHighlighted = highlights.indexOf(link.key) >= 0;
                    const linkPath = path(link);
                    
                    return (
                      <animated.g
                        key={link.key || link.name}
                        className="opacity-trans"
                        opacity={getOpacity(isHighlighted)}
                      >
                        <path
                          d={linkPath}
                          stroke={colors.white}
                          strokeWidth={Math.max(1, link.width)}
                          opacity={0.38}
                          fill="none"
                        />
                        <animated.g className="opacity-trans" opacity={isHighlighted ? 1 : 0}>
                          <Text
                            x={link.target.x0 - (isMobile ? 5 : 10)}
                            y={link.y1}
                            dy={-10}
                            fill={colors.money}
                            lineHeight="1.25em"
                            textAnchor="end"
                            verticalAnchor="middle"
                            fontSize={isMobile ? 14 : 18}
                            width={100}
                          >
                            {`${link.value} ${link.unit || ''}`}
                          </Text>
                        </animated.g>
                      </animated.g>
                    );
                  })}
                </Group>

                {/* Nodes and Text */}
                <Group>
                  {nodeRects}
                  {nodeTexts}
                </Group>
              </Group>
            );
          }}
        </Flow>
      </animated.g>
    </svg>
  );
}


Sankey.propTypes = {
  top: PropTypes.number,
  left: PropTypes.number,
  wMobileScale: PropTypes.number,
  topMobileMargin: PropTypes.number,
  bottomMobileMargin: PropTypes.number,
};

Sankey.defaultProps = {
  top: 0,
  left: 0,
  wMobileScale: 1,
  topMobileMargin: -30,
  bottomMobileMargin: -30,
};

export default Sankey;
