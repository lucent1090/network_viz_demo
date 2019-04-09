import React from 'react';
import PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import { LinkHorizontal } from '@vx/shape';
import { scaleLinear } from '@vx/scale';
import { Transition, animated } from 'react-spring';
import getNodeName from '../graphs/utils/getNodeName';
import { colors } from '../../styles/variables';

const DEFAULT_COLOR = colors.white;
const HIDE_OPACITY = 0.4;

const getSourceTarget = ({ source, target }, showLinkNum) => ({
  sx: source.x,
  sy: source.y,
  tx: target.x,
  ty: target.y,
  shouldText: showLinkNum.indexOf(getNodeName(source)) >= 0,
});

const getLinkOpacity = memoizeOne((sourceNode, targetNode, highlights) => {
  if (!highlights) {
    return 1;
  }
  const sourceShown = highlights.indexOf(sourceNode) >= 0;
  const targetShown = highlights.indexOf(targetNode) >= 0;
  return sourceShown && targetShown ? 1 : HIDE_OPACITY;
});

const strokeScale = scaleLinear({
  range: [2, 30],
  domain: [0, 1],
  nice: true,
});

const getStrokeWidth = memoizeOne(({ source, target }) => {
  const totalPercent = source.data.children.reduce((total, { percent }) => total + percent, 0);

  return strokeScale(target.data.percent / totalPercent);
}, ({ source, target }, { source: newSource, target: newTarget }) => (
  getNodeName(source) === getNodeName(newSource)
  && getNodeName(target) === getNodeName(newTarget)
));

const getLink = memoizeOne((styles, link, highlights, isMobile, fontSize) => {
  const { source, target } = link;
  const { linkColor = DEFAULT_COLOR } = source.data;
  const { percent } = target.data;
  const textPos = isMobile ? 1.7 : 1.35;
  const linkOpacity = getLinkOpacity(getNodeName(source), getNodeName(target), highlights);

  return (
    <animated.g
      className="opacity-trans"
      opacity={linkOpacity}
    >
      <LinkHorizontal
        data={
          {
            source: { x: styles.sx, y: styles.sy },
            target: { x: styles.tx, y: styles.ty },
          }
        }
        stroke={linkColor}
        strokeWidth={getStrokeWidth(link)}
        strokeOpacity={0.38}
        fill="none"
      />
      <animated.g className="opacity-trans" opacity={styles.shouldText ? 1 : 0}>
        <text
          x={styles.sy + ((styles.ty - styles.sy) / textPos)}
          y={styles.tx}
          dy=".3em"
          fontSize={fontSize}
          textAnchor="left"
          style={{ pointerEvents: 'none' }}
          fill="white"
        >
          {`${percent}%`}
        </text>
      </animated.g>
    </animated.g>
  );
});

function AnimatedLink({
  link,
  showLinkNum,
  fontSize,
  highlights,
  isMobile,
}) {
  const transProps = getSourceTarget(link, showLinkNum);

  // FIXME: Currently disable all the transition of the position of link
  // due to the poor rendering performance.
  // It should be added back if there is a solution to the performance

  // if (isMobile) {
  //   // desktop
  //   return (
  //     <Transition
  //       from={transProps}
  //       update={transProps}
  //     >
  //       {styles => getLink(styles, link, highlights, isMobile, fontSize)}
  //     </Transition>
  //   );
  // }

  // disable transition on mobile
  return getLink(transProps, link, highlights, isMobile, fontSize);
}

AnimatedLink.defaultProps = {
  showLinkNum: PropTypes.arrayOf(PropTypes.string),
  isMobile: PropTypes.bool,
};

AnimatedLink.defaultProps = {
  showLinkNum: [],
  isMobile: PropTypes.false,
};

export default AnimatedLink;
