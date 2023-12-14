import React from "react";
import {
  TouchableOpacity,
  Image,
  ImageProps,
  GestureResponderEvent,
  DimensionValue,
} from "react-native";

import styles from "./screenheader.style";

export interface ScreenHeaderBtnProps {
  iconUrl: ImageProps;
  dimensions: DimensionValue;
  handlePress: (event: GestureResponderEvent) => void;
}

const ScreenHeaderBtn = ({
  iconUrl,
  dimensions,
  handlePress,
}: ScreenHeaderBtnProps) => {
  return (
    <TouchableOpacity
      style={styles(dimensions).btnContainer}
      onPress={handlePress}
    >
      <Image
        source={iconUrl}
        resizeMode="cover"
        style={styles(dimensions).btnImg}
      />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;
