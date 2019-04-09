/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { startCalculatePosistion } from '../../actions/section';

class Section extends Component {
  constructor(props) {
    super(props);
    this.sectionRef = React.createRef();
  }

  componentDidMount() {
    this.handleContainerSizeCalc();
    window.addEventListener('resize', this.handleContainerSizeCalc);
  }

  shouldComponentUpdate() {
    // Prevent <Section> from rendering if it is not close enough to the viewport
    return this.isNearViewportByOffset();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleContainerSizeCalc);
  }

  handleContainerSizeCalc = () => {
    const { id, calPos } = this.props;
    calPos(id, this.sectionRef.current);
  }

  getPositions = () => {
    const {
      id, pageScroll, secPositions,
    } = this.props;
    const {
      scrollTop,
      scrollBottom,
      scrollOffset,
      windowHeight,
    } = pageScroll;
    const { position } = secPositions[id] || {};
    const { top = 0, height = 0 } = position || {};
    return {
      sectionTop: top,
      sectionHeight: height,
      scrollTop,
      scrollBottom,
      scrollOffset,
      windowHeight,
    };
  }

  isNearViewportByOffset = () => {
    const { renderThreshold } = this.props;
    const {
      sectionTop,
      sectionHeight,
      scrollTop,
      scrollBottom,
    } = this.getPositions();
    return (
      (scrollBottom + renderThreshold) > sectionTop
      && (sectionTop + sectionHeight + renderThreshold) > scrollTop
    );
  }

  render() {
    const {
      id,
      children,
      style,
    } = this.props;
    const {
      sectionTop,
      sectionHeight,
      scrollTop,
      scrollBottom,
      scrollOffset,
      windowHeight,
    } = this.getPositions();

    let percentage = Math.round((scrollBottom - sectionTop) * 10000 / sectionHeight) / 100 || 0;
    if (percentage > 100) {
      percentage = 100;
    } else if (percentage < 0) {
      percentage = 0;
    }

    return (
      <div key={id} ref={this.sectionRef} style={style}>
        {children({
          sectionTop,
          sectionHeight,
          scrollTop,
          scrollBottom,
          scrollOffset,
          windowHeight,
          percentage,
        })}
      </div>
    );
  }
}

Section.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.func,
  renderThreshold: PropTypes.number,
  // from Redux
  calPos: PropTypes.func.isRequired,
  pageScroll: PropTypes.shape({
    scrollTop: PropTypes.number,
    scrollBottom: PropTypes.number,
  }),
  secPositions: PropTypes.object,
  style: PropTypes.object,
};

Section.defaultProps = {
  children: () => {},
  renderThreshold: 100,
  pageScroll: {
    scrollTop: 0,
    scrollBottom: 0,
  },
  secPositions: {},
  style: undefined,
};

function mapStateToProps({ section }) {
  const { secPositions, pageScroll } = section;
  return {
    secPositions,
    pageScroll,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    calPos: (id, refs) => dispatch(startCalculatePosistion(id, refs)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Section);
