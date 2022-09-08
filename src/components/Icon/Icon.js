import PropTypes from 'prop-types';
import React from 'react';

import Close from './Icons/Close';
import Help from './Icons/Help';

const Icon = ({ name, width, height, fill, className }) => {
  switch (name) {
    case 'close':
      return <Close fill={fill} width={width} height={height} className={className} />;
    case 'help':
      return <Help fill={fill} width={width} height={height} className={className} />;
    default:
      return <div />;
  }
};

export default Icon;

Icon.propTypes = {
  /**
   * Use name to select icon
   */
  name: PropTypes.string.isRequired,
  /**
   * Must pass this property to set icon width
   */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  /**
   * Must pass this property to set icon height
   */
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  /**
   * Must pass this property to set icon color
   */
  fill: PropTypes.string.isRequired,
  /**
   * Must pass this property to set icon color
   */
  className: PropTypes.string,
};

Icon.defaultProps = {
  className: '',
};
