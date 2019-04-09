/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import cx from 'classnames';
import { Group } from '@vx/group';
import { tree as d3Tree } from 'd3-hierarchy';
import { min, max } from 'd3-array';
import { animated } from 'react-spring';
import getNodeName from '../graphs/utils/getNodeName';
import getRectWidth from '../graphs/utils/getRectWidth';

const getD3Cluster = (
  { size, nodeSize, separation },
  data,
) => {
  const cluster = d3Tree();

  const defaultSeparation = (a, b) => {
    return a.parent === b.parent ? 1.2 : 1.6;
  };
  // inverse the width and height of the cluster for the vertical graph
  if (size) cluster.size([size[1], size[0]]);
  if (nodeSize) cluster.nodeSize(nodeSize);
  cluster.separation(separation || defaultSeparation);
  return cluster(data);
};

function getBoundary(nodes, focusNodes = [], nodeFontSize) {
  const filterNodes = nodes.filter(node => focusNodes.indexOf(getNodeName(node)) >= 0);
  const yLeftArr = [];
  const yRightArr = [];
  filterNodes.forEach(({ y, data }) => {
    const halfWidth = getRectWidth(data.name, nodeFontSize) / 2;
    yLeftArr.push(y - halfWidth);
    yRightArr.push(y + halfWidth);
  });
  const xArr = filterNodes.map(node => node.x);
  const boundary = {
    // x and y are reversed since it is a horizontal graph (defualt: vertical)
    left: min(yLeftArr) - 50,
    right: max(yRightArr) + 50,
    top: min(xArr) - 50,
    bottom: max(xArr) + 50,
  };
  return boundary;
}

// Returns the transform settings for the outer svg group
const getTransform = memoizeOne((size, top, left, nodes, focusNodes = [], nodeFontSize) => {
  if (!nodes || focusNodes.length === 0) {
    return '';
  }

  const boundary = getBoundary(nodes, focusNodes, nodeFontSize);
  const [oriWidth, oriHeight] = size;
  const newWidth = boundary.right - boundary.left;
  const oriCenterX = left + oriWidth / 2;
  const oriCenterY = top + oriHeight / 2;
  const newCenterX = (boundary.right + boundary.left) / 2;
  const newCenterY = (boundary.bottom + boundary.top) / 2;
  const scale = oriWidth / (newWidth || 30) * 0.9;
  const translateX = oriCenterX - newCenterX * scale;
  const translateY = oriCenterY - newCenterY * scale;

  return `translate(${translateX}px, ${translateY}px) scale(${scale})`;
});

function Cluster({
  top,
  left,
  className,
  data,
  // #TODO: deal with focusNodes
  focusNodes,
  highlights,
  showLinkNum,
  size,
  nodeSize,
  separation,
  linkComponent,
  nodeComponent,
  nodeFontSize,
  linkFontSize,
  isMobile,
  nodesScale,
}) {
  const clusterData = getD3Cluster({ size, nodeSize, separation }, data);
  const links = clusterData.links();
  const nodes = clusterData.descendants();
  const transformStr = getTransform(size, top, left, nodes, focusNodes, nodeFontSize);

  return (
    <Group top={top} left={left} className={cx('vx-cluster', className)}>
      <animated.g className="graph-groups" style={{ transform: transformStr }}>
        {linkComponent
          && links.map((link, i) => {
            const { source, target } = link;
            const sourceKey = getNodeName(source);
            const targetKey = getNodeName(target);
            const linkKey = (sourceKey && targetKey) ? `link-${sourceKey}-${targetKey}` : `cluster-link-${i}`;

            return (
              <Group key={linkKey}>
                {React.createElement(linkComponent, {
                  link,
                  showLinkNum,
                  highlights,
                  fontSize: linkFontSize,
                  isMobile,
                })}
              </Group>
            );
          })}
        {nodeComponent
          && nodes.map((node, i) => {
            const key = node.data.key || node.data.name;
            const nodeKey = key ? `node-${key}` : `cluster-node-${i}`;

            return (
              <Group key={nodeKey}>
                {React.createElement(nodeComponent, { 
                  node,
                  highlights,
                  fontSize: nodeFontSize,
                  isMobile,
                  nodesScale,
                })}
              </Group>
            );
          })}
      </animated.g>
    </Group>
  );
}

Cluster.propTypes = {
  data: PropTypes.object.isRequired,
  top: PropTypes.number,
  left: PropTypes.number,
  className: PropTypes.string,
  size: PropTypes.arrayOf(PropTypes.number),
  nodeSize: PropTypes.arrayOf(PropTypes.number),
  focusNodes: PropTypes.arrayOf(PropTypes.string),
  highlights: PropTypes.arrayOf(PropTypes.string),
  showLinkNum: PropTypes.arrayOf(PropTypes.string),
  separation: PropTypes.func,
  linkComponent: PropTypes.func,
  nodeComponent: PropTypes.func,
  nodeFontSize: PropTypes.number,
  linkFontSize: PropTypes.number,
  isMobile: PropTypes.bool,
  nodesScale: PropTypes.arrayOf(PropTypes.number),
};

Cluster.defaultProps = {
  top: 0,
  left: 0,
  className: undefined,
  size: undefined,
  focusNodes: [],
  showLinkNum: [],
  highlights: null,
  nodeSize: undefined,
  separation: undefined,
  linkComponent: undefined,
  nodeComponent: undefined,
  nodeFontSize: 16,
  linkFontSize: 15,
  isMobile: PropTypes.false,
  nodesScale: undefined,
};

export default Cluster;
