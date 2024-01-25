import { Dimensions, Platform, StatusBar } from 'react-native';

export const { width: windowWidth, height: windowHeight } =
  Dimensions.get('window');
const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');
const isLessWidth = windowWidth < windowHeight;
const shortDimension = isLessWidth ? windowWidth : windowHeight;
const longDimension = isLessWidth ? windowHeight : windowWidth;

const getNewSize = (size: number): number => {
  const aspectRatio = windowHeight / windowWidth;
  let newSize = 0;
  if (aspectRatio > 1.77) {
    newSize = size;
  } else if (aspectRatio > 1.6) {
    newSize = size * 0.97;
  } else if (aspectRatio > 1.55) {
    newSize = size * 0.95;
  } else if (aspectRatio > 1.5) {
    newSize = size * 0.93;
  } else if (aspectRatio > 1.45) {
    newSize = size * 0.91;
  } else if (aspectRatio > 1.4) {
    newSize = size * 0.89;
  } else if (aspectRatio > 1.35) {
    newSize = size * 0.87;
  } else if (aspectRatio > 1.329) {
    return size;
  } else if (aspectRatio > 1.3) {
    newSize = size * 0.85;
  } else if (aspectRatio > 1.2) {
    newSize = size * 0.84;
  } else if (aspectRatio > 1.185) {
    return size * 0.95;
  } else if (aspectRatio > 1.15) {
    return size * 0.82;
  } else {
    newSize = size * 0.6;
  }
  return newSize;
};

// Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth: number = 375;
const guidelineBaseHeight: number = 812;

// Use for horizontal scaling
export const scale = (
  size: number,
  skipAspectRatio: boolean = false
): number => {
  const changeSize = skipAspectRatio ? size : getNewSize(size);
  return (shortDimension / guidelineBaseWidth) * changeSize;
};

// Use for vertical scaling
export const verticalScale = (
  size: number,
  skipAspectRatio: boolean = false
): number => {
  const changeSize = skipAspectRatio ? size : getNewSize(size);
  return (longDimension / guidelineBaseHeight) * changeSize;
};

// Use for horizontal & vertical scaling (example: Fonts)
export const moderateScale = (
  size: number,
  skipAspectRatio: boolean = false,
  factor: number = 0.5
): number => {
  const changeSize = skipAspectRatio ? size : getNewSize(size);
  return (
    changeSize + (scale(changeSize, skipAspectRatio) - changeSize) * factor
  );
};

export function moderateVerticalScale(
  size: number,
  skipAspectRatio: boolean = false,
  factor: number = 0.5
): number {
  const changeSize = skipAspectRatio ? size : getNewSize(size);
  return (
    changeSize +
    (verticalScale(changeSize, skipAspectRatio) - changeSize) * factor
  );
}

// Used via Metrics.zero
export const Metrics = {
  zero: 0,
  screenWidth: screenWidth < screenHeight ? screenWidth : screenHeight,
  screenHeight: screenWidth < screenHeight ? screenHeight : screenWidth,
  defaultDuration: 5,
  navBarHeight: Platform.OS === 'ios' ? verticalScale(64) : verticalScale(54),
  size: {
    s: 5,
    m: 10,
    l: 15,
    xl: 20,
    xxl: 25,
    xxxl: 30,
  },
  isIOS: Platform.OS === 'ios',
  keyboardVerticalOffset: Platform.OS === 'ios' ? 10 : 30,
  statusBarHeight: StatusBar.currentHeight,
};

export const dynamicMargin = Platform.OS == 'ios' ? 80 : 40;

export const getDynamicFontSize = (textLength: any) => {
  const initialFontSize = 34; // The initial font size for text length of 0
  const minimumFontSize = 14; // The minimum font size for text length of 500
  const maxTextLength = 500; // The text length at which the minimum size is reached
  const decrementStep = 50; // Decrease font size every 50 characters

  // Calculate the number of steps to decrease size based on character count
  let decreaseCount = Math.floor(textLength / decrementStep);

  // Calculate total size decrease based on number of steps
  let totalSizeDecrease = decreaseCount * 2; // Decrease by 2 for each step

  // Calculate the font size based on the decrease
  let fontSize = initialFontSize - totalSizeDecrease;

  // Ensure the font size does not go below the minimum size or above the initial size
  if (fontSize < minimumFontSize) fontSize = minimumFontSize;
  if (fontSize > initialFontSize) fontSize = initialFontSize;

  return fontSize;
};
