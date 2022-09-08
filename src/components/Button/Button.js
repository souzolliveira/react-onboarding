import React from 'react';
import styles from './Button.module.scss';

const Button = ({
  name,
  children,
  className,
  kind,
  size,
  onClick,
  onFocus,
  onBlur,
  onMouseOver,
  onMouseLeave,
  onMouseDown,
  onMouseOut,
  onMouseUp,
  disabled,
}) => {
  const classes = [styles.btn, className, styles[kind], styles[`btn-${[size]}`]].join(' ');

  return (
    <button
      type='button'
      name={name}
      className={classes}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseOut={onMouseOut}
      onMouseUp={onMouseUp}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
export default Button;
