import { Dimensions, Platform, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const getHeight = () => Dimensions.get("window").height;
export const getWidth = () => Dimensions.get("window").width;

const scale = SCREEN_WIDTH / 320;

export function normalize(size: number) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export const isMobile = Platform.OS === "android" || Platform.OS === "ios";

export const isAndroid = Platform.OS === "android";

export const isIOS = Platform.OS === "ios";
