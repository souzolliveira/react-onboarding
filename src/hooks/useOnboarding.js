import PropTypes from 'prop-types';
import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';

import Onboarding from '../components/Onboarding/Onboarding';

const OnboardingContext = createContext({});

const OnboardingProvider = ({ children }) => {
  const [canBeStarted, setCanBeStarted] = useState(false);
  const [isTutorialStarted, setIsTutorialStarted] = useState(false);
  const [isTutorialFinished, setIsTutorialFinished] = useState(false);
  const [index, setIndex] = useState(0);
  const [highlightedElementWidth, setHighlightedElementWidth] = useState(0);
  const [highlightedElementHeight, setHighlightedElementHeight] = useState(0);
  const [highlightedElementTop, setHighlightedElementTop] = useState(0);
  const [highlightedElementLeft, setHighlightedElementLeft] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const [steps, setSteps] = useState([]);
  const [texts, setTexts] = useState({});
  const positions = useMemo(
    () => ({
      TOP: 'top',
      TOP_RIGHT: 'top-right',
      RIGHT: 'right',
      BOTTOM_RIGHT: 'bottom-right',
      BOTTOM: 'bottom',
      BOTTOM_LEFT: 'bottom-left',
      LEFT: 'left',
      TOP_LEFT: 'top-left',
    }),
    []
  );
  const sizes = useMemo(
    () => ({
      SM: 'sm',
      MD: 'md',
      LG: 'lg',
    }),
    []
  );
  const [position, setPosition] = useState(positions.TOP);
  const [size, setSize] = useState(sizes.MD);

  useEffect(() => {
    if (
      highlightedElementTop === 0 ||
      highlightedElementLeft === 0 ||
      highlightedElementWidth === 0 ||
      highlightedElementHeight === 0 ||
      screenWidth === 0 ||
      screenHeight === 0
    )
      return;
    if (highlightedElementTop >= screenHeight - 300 && highlightedElementLeft + highlightedElementWidth > screenWidth - 300)
      setPosition(positions.TOP_LEFT);
    else if (highlightedElementTop >= screenHeight - 300 && highlightedElementLeft + highlightedElementWidth < 300)
      setPosition(positions.TOP_RIGHT);
    else if (highlightedElementTop < 300 && highlightedElementLeft + highlightedElementWidth < 300) setPosition(positions.BOTTOM_RIGHT);
    else if (highlightedElementTop < 300 && highlightedElementLeft + highlightedElementWidth >= screenWidth - 300)
      setPosition(positions.BOTTOM_LEFT);
    else if (highlightedElementTop >= screenHeight - 300) setPosition(positions.TOP);
    else if (highlightedElementTop < 300) setPosition(positions.BOTTOM);
    else if (highlightedElementLeft + highlightedElementWidth < screenWidth / 2) setPosition(positions.RIGHT);
    else if (highlightedElementLeft + highlightedElementWidth > screenWidth / 2) setPosition(positions.LEFT);
    else setPosition(positions.TOP);
  }, [
    highlightedElementTop,
    highlightedElementLeft,
    highlightedElementWidth,
    highlightedElementHeight,
    screenWidth,
    screenHeight,
    positions,
    index,
  ]);

  useEffect(() => {
    if (isTutorialStarted && steps.length > 0) {
      const element = document.querySelector(`[data-onboarding="${steps[index]?.dataOnboarding}"]`);
      if (element) {
        element.scrollIntoView();
        setHighlightedElementWidth(element.offsetWidth);
        setHighlightedElementHeight(element.offsetHeight);
        setHighlightedElementTop(element.getBoundingClientRect()?.top);
        setHighlightedElementLeft(element.getBoundingClientRect()?.left);
        setScreenHeight(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
        setScreenWidth(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
      }
    } else {
      setHighlightedElementWidth(0);
      setHighlightedElementHeight(0);
      setHighlightedElementTop(-1000);
      setHighlightedElementLeft(-1000);
    }
  }, [steps, index, isTutorialStarted, isTutorialFinished]);

  const handleSkip = () => {
    setIndex(0);
    setIsTutorialStarted(false);
    setIsTutorialFinished(true);
  };

  const handleNext = async () => {
    if (index < steps.length - 1) {
      await steps[index + 1].executeBefore();
      setIndex(state => state + 1);
    } else {
      handleSkip();
    }
  };

  const handlePrevious = async () => {
    if (index !== 0) {
      await steps[index - 1].executeBefore();
      setIndex(state => state - 1);
    }
  };

  const onboarding = () => {
    if (isTutorialStarted && steps.length > 0) {
      return (
        <Onboarding
          highlightedElementWidth={highlightedElementWidth}
          highlightedElementHeight={highlightedElementHeight}
          highlightedElementTop={highlightedElementTop}
          highlightedElementLeft={highlightedElementLeft}
          title={steps[index]?.title}
          description={steps[index]?.description}
          texts={texts}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          handleSkip={handleSkip}
          index={index}
          total={steps.length}
          position={position}
          size={size}
        />
      );
    }
    return null;
  };

  return (
    <OnboardingContext.Provider
      value={{
        onboarding,
        steps,
        setSteps,
        setTexts,
        setSize,
        setIsTutorialStarted,
        handleSkip,
        handleNext,
        handlePrevious,
        canBeStarted,
        setCanBeStarted,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) throw new Error('use context must be used within SectionProvider');
  return context;
};

export { OnboardingProvider, useOnboarding };

useOnboarding.propTypes = {
  /**
   * Must pass the strings of footer buttons
   */
  texts: PropTypes.objectOf(PropTypes.string).isRequired,
};

useOnboarding.defaultProps = {};
