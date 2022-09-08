import PropTypes from 'prop-types';
import React from 'react';

import styles from './Button.module.scss';

const Button = ({ name, children, className, kind, size, onClick, disabled }) => {
  const classes = [styles.btn, className, styles[kind], styles[`btn-${[size]}`]].join(' ');

  return (
    <button type='button' name={name} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;

Button.propTypes = {
  /**
   * Define the element name
   */
  name: PropTypes.string,
  /**
   * Must pass a text or an icon to element
   */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType, PropTypes.node]).isRequired,
  /**
   * Can use this property to set other class on element out of lib styles
   */
  className: PropTypes.string,
  /**
   * Define the element style
   */
  kind: PropTypes.oneOf(['primary', 'secondary', 'success']),
  /**
   * Define the element size
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /**
   * Can apply onClick event on element
   */
  onClick: PropTypes.func,
  /**
   * Can disable the element
   */
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  name: '',
  kind: 'primary',
  className: {},
  size: 'md',
  onClick: () => {},
  disabled: false,
};
