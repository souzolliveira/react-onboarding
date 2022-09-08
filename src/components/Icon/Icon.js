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
