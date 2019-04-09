/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Section from './Section';

const positions = {
  absTop: {
    position: 'absolute',
    top: 0,
  },
  fixed: {
    position: 'fixed',
    top: 0,
  },
  absBottom: {
    position: 'absolute',
    bottom: 0,
  },
};

function getStickyPosition(scrollTop, scrollBottom, sectionTop, sectionBottom) {
  if (scrollTop < sectionTop) {
    return positions.absTop;
  }

  if ((scrollTop >= sectionTop) && (sectionBottom > scrollBottom)) {
    return positions.fixed;
  }

  return positions.absBottom;
}

function StickyBackground({
  id,
  children,
  height,
}) {
  const outerStyle = {
    position: 'relative',
    height,
    boxSizing: 'border-box',
  };

  return (
    <Section id={id} style={outerStyle}>
      {({
        sectionTop: stickyTop,
        sectionHeight: stickyHeight,
        percentage: stickyPercentage,
        scrollTop,
        scrollBottom,
        scrollOffset,
        windowHeight,
      }) => {
        const stickyStyle = {
          ...getStickyPosition(scrollTop, scrollBottom, stickyTop, (stickyTop + stickyHeight)),
          left: 0,
          width: '100%',
          height: `${windowHeight}px`,
          boxSizing: 'border-box',
        };

        return (
          <div style={stickyStyle}>
            {children({
              stickyTop,
              stickyHeight,
              stickyPercentage,
              scrollTop,
              scrollBottom,
              scrollOffset,
              windowHeight,
            })}
          </div>
        );
      }}
    </Section>
  );
}


StickyBackground.propTypes = {
  id: PropTypes.string.isRequired,
  height: PropTypes.number,
  children: PropTypes.func,
};

StickyBackground.defaultProps = {
  children: () => {},
  height: 1000,
};


export default StickyBackground;
