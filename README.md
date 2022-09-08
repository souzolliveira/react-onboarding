# React Onboarding

A beautiful way to you make an onboarding flow with your users.

## Setup

#### NPM

```bash
npm i https://github.com/souzolliveira/react-onboarding
```

#### yarn

```bash
yarn add souzolliveira/react-onboarding
```

## Getting Started

Start adding `<OnboardingProvider>` context inside the App.js encompassing your `Views`.

```jsx
import { OnboardingProvider } from 'react-onboarding';

const App = () => {
  return (
    <OnboardingProvider>
      <View />
    </OnboardingProvider>
  );
};
export default App;
```

After, adding the `onboarding()` inside your view and set the steps.

```jsx
import { useOnboarding } from 'react-onboarding';

const View = () => {
  const { onboarding, setSteps, setCanBeStarted } = useOnboarding();

  useEffect(() => {
    setCanBeStarted(true);
    setSteps([
      {
        dataOnboarding: 'first-element',
        title: 'First element',
        description: () => <span>This is the first element</span>,
        executeBefore: () => {},
      },
      {
        dataOnboarding: 'second-element',
        title: 'Second element',
        description: () => <span>This is the second element</span>,
        executeBefore: () => {},
      },
    ]);
    return () => {
      setSteps([]);
      setCanBeStarted(false);
    };
  }, []);

  return (
    <>
      {onboarding()}
      <div>
        <span data-onboarding='first-element'>First element</span>
        <span data-onboarding='second-element'>Second element</span>
      </div>
    </>
  );
};
```

### Props

```jsx
const {
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
} = useOnboarding({});
```

| Setting              | Role                                                                                                                                                                    |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onboarding           | You must add this function inside the view that you want to render the onboarding                                                                                       |
| steps                | You can see the set steps                                                                                                                                               |
| setSteps             | You must setSteps using an useEffect hook before render the onboarding                                                                                                  |
| setTexts             | You can set the button texts passing an object as `{ next: 'Next', previous: 'Previous', finish: 'Finish' }`                                                            |
| setSize              | You can set the size of the popovers, the default value is `md`                                                                                                         |
| setIsTutorialStarted | You set the value when you start the onboarding flow, for example, clicking on a `button`                                                                               |
| handleSkip           | You can skip the onboarding using, for example, shortcuts                                                                                                               |
| handleNext           | You can go to next step of the onboarding using, for example, shortcuts                                                                                                 |
| handlePrevious       | You can go to previous step of the onboarding using, for example, shortcuts                                                                                             |
| canBeStarted         | You can use this value inside a dependency array of an useEffect hook, for example, to deny the onboarding if you is rendering others components according to a promise |
| setCanBeStarted      | You must set true using an useEffect hook, for example, in a finally of promise, to able starting the onboarding                                                        |
