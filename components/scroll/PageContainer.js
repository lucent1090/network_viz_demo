import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { recordWindowScroll, recordWindowResize } from '../../actions/section';

class PageContainer extends PureComponent {
  componentDidMount() {
    const { recordScroll, recordResize } = this.props;
    recordScroll();
    recordResize();
    window.addEventListener('scroll', recordScroll);
    window.addEventListener('resize', recordResize);
  }

  componentWillUnmount() {
    const { recordScroll, recordResize } = this.props;
    window.removeEventListener('scroll', recordScroll);
    window.addEventListener('resize', recordResize);
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        {children}
      </div>
    );
  }
}

PageContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  recordScroll: PropTypes.func.isRequired,
  recordResize: PropTypes.func.isRequired,
};

PageContainer.defaultProps = {
  children: undefined,
};

function mapDispatchToProps(dispatch) {
  return {
    recordScroll: () => dispatch(recordWindowScroll()),
    recordResize: () => dispatch(recordWindowResize()),
  };
}

export default connect(null, mapDispatchToProps)(PageContainer);
