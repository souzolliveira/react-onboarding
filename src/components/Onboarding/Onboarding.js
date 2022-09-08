import PropTypes from 'prop-types';
import React, { useRef } from 'react';

import Button from '../Button';
import Icon from '../Icon';

import styles from './Onboarding.module.scss';

const Onboarding = ({
  highlightedElementWidth,
  highlightedElementHeight,
  highlightedElementTop,
  highlightedElementLeft,
  title,
  description: Component,
  texts,
  handleNext,
  handlePrevious,
  handleSkip,
  index,
  total,
  position,
  size,
}) => {
  const popoverRef = useRef(null);

  return (
    <>
      <div data-testid='onboarding-overlay' className={styles.overlay}>
        <div
          className={styles.highlight}
          style={{
            '--popover-width': `${popoverRef?.current?.clientWidth || 150}px`,
            '--popover-height': `${popoverRef?.current?.clientHeight || 150}px`,
            '--highlighted-element-top': `${highlightedElementTop || -1000}px`,
            '--highlighted-element-left': `${highlightedElementLeft || -1000}px`,
            '--highlighted-element-width': `${highlightedElementWidth || 0}px`,
            '--highlighted-element-height': `${highlightedElementHeight || 0}px`,
          }}
        />
      </div>
      <div
        data-testid='onboarding-popover'
        className={styles.popoverContainer}
        style={{
          '--popover-width': `${popoverRef?.current?.clientWidth || 150}px`,
          '--popover-height': `${popoverRef?.current?.clientHeight || 150}px`,
          '--highlighted-element-top': `${highlightedElementTop || -1000}px`,
          '--highlighted-element-left': `${highlightedElementLeft || -1000}px`,
          '--highlighted-element-width': `${highlightedElementWidth || 0}px`,
          '--highlighted-element-height': `${highlightedElementHeight || 0}px`,
        }}
      >
        <div ref={popoverRef} className={`${styles.optionsContainer} ${styles[position]} ${styles[size]}`}>
          <div className={styles.title}>
            <Icon name='help' width={16} height={16} fill='var(--primary-color)' />
            <span>{title}</span>
            <div className={styles.fill} />
            <button className={styles.skipButton} type='button' onClick={() => handleSkip()}>
              <Icon name='close' width={16} height={16} fill='var(--primary-color)' />
            </button>
          </div>
          <div className={styles.body}>
            <Component />
            <div className={styles.footer}>
              <div className={styles.step}>{`${index + 1} / ${total}`}</div>
              <div className={styles.buttons}>
                {index > 0 && (
                  <Button kind='secondary' onClick={() => handlePrevious()}>
                    {texts?.previous}
                  </Button>
                )}
                <Button kind={index < total - 1 ? 'primary' : 'success'} onClick={() => handleNext()}>
                  {index < total - 1 ? texts?.next : texts?.finish}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Onboarding;

Onboarding.propTypes = {
  /**
   * Must pass the highlighted element width
   */
  highlightedElementWidth: PropTypes.number.isRequired,
  /**
   * Must pass the highlighted element height
   */
  highlightedElementHeight: PropTypes.number.isRequired,
  /**
   * Must pass the highlighted element absolute top position
   */
  highlightedElementTop: PropTypes.number.isRequired,
  /**
   * Must pass the highlighted element absolute left position
   */
  highlightedElementLeft: PropTypes.number.isRequired,
  /**
   * Must pass a title to be shown on the popover
   */
  title: PropTypes.string.isRequired,
  /**
   * Must pass the component of description of actual step
   */
  description: PropTypes.func.isRequired,
  /**
   * Can pass the strings of footer buttons
   */
  texts: PropTypes.objectOf(PropTypes.string),
  /**
   * Must pass the function to go to next step
   */
  handleNext: PropTypes.func.isRequired,
  /**
   * Must pass the function to go to previous step
   */
  handlePrevious: PropTypes.func.isRequired,
  /**
   * Must pass the function to skip onboarding
   */
  handleSkip: PropTypes.func.isRequired,
  /**
   * Must pass the index of actual step
   */
  index: PropTypes.number.isRequired,
  /**
   * Must pass the total of steps
   */
  total: PropTypes.number.isRequired,
  /**
   * Must pass the relative position at screen
   */
  position: PropTypes.oneOf(['top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left']).isRequired,
  /**
   * Can pass the size
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

Onboarding.defaultProps = {
  size: 'md',
  texts: {
    next: 'Next',
    previous: 'Previous',
    finish: 'Finish',
  },
};
