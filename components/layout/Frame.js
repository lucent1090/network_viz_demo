import React from 'react';
import PropTypes from 'prop-types';

// Only renders Frame if width, height, or frameIndex changes
class Frame extends React.Component {
  shouldComponentUpdate({
    width: nextWidth,
    height: nextHeight,
    frameIndex: nextFrame,
  }) {
    const { width, height, frameIndex } = this.props;

    return (
      nextWidth !== width
      || nextHeight !== height
      || frameIndex !== nextFrame
    );
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

Frame.propTypes = {
  children: PropTypes.element.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  frameIndex: PropTypes.number.isRequired,
};

export default Frame;
