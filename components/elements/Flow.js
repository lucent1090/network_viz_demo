import React from 'react';
import PropTypes from 'prop-types';
import { Group } from '@vx/group';
import { sankey as d3Sankey } from 'd3-sankey';
import { HierarchyDefaultNode as DefaultNode } from '@vx/hierarchy';

export default function Flow({
  top,
  left,
  className,
  data,
  size,

  nodeId,
  nodeAlign,
  nodeWidth,
  nodePadding,
  nodePaddingRatio,
  extent,
  iterations,
  circularLinkGap,

  children,
  nodeComponent = DefaultNode,
  ...restProps
}) {
  const sankey = d3Sankey();
  if (size) sankey.size(size);
  if (nodeId) sankey.nodeId(nodeId);
  if (nodeAlign) sankey.nodeAlign(nodeAlign);
  if (nodeWidth) sankey.nodeWidth(nodeWidth);
  if (nodePadding) sankey.nodePadding(nodePadding);
  if (extent) sankey.extent(extent);
  if (iterations) sankey.iterations(iterations);
  if (circularLinkGap) sankey.circularLinkGap(circularLinkGap);

  const sankeyData = sankey(data);

  if (children) {
    return (
      <Group top={top} left={left} className={className}>
        {children({ data: sankeyData })}
      </Group>
    );
  }
}

Flow.propTypes = {
  data: PropTypes.object.isRequired,
  children: PropTypes.func,
};