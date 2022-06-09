import { StyleSheet, Text, View, Pressable } from "react-native";
import { NeuView } from "react-native-neu-element";
import CircularProgress from "react-native-circular-progress-indicator";

import config from "../config/styles";

function NeuCircleProgress({ value, min, max, size = 220 }) {
  const borderSize = 35;
  const innerSize = size - borderSize * 2;

  const spaceBetweenVlues = max - min;
  const normalizedValue = value - min;
  var percentagedValue = (normalizedValue * 100) / spaceBetweenVlues;
  if (percentagedValue == 0) percentagedValue = 1;

  return (
    <NeuView
      color={config.colors.background}
      height={size}
      width={size}
      borderRadius={10000}
    >
      <NeuView
        color={"#e6e9ef"}
        height={size - borderSize}
        width={size - borderSize}
        borderRadius={10000}
        inset
      >
        <NeuView
          color={config.colors.background}
          height={innerSize}
          width={innerSize}
          borderRadius={10000}
        >
          <CircularProgress
            progressValueColor={config.colors.black}
            activeStrokeWidth={borderSize / 2}
            inActiveStrokeWidth={borderSize / 2}
            maxValue={100}
            inActiveStrokeColor={"#d5dee3"}
            fontSize={50}
            titleColor={config.colors.darkGrey}
            allowFontScalings
            showProgressValue={false}
            title={value.toFixed(1)}
            duration={1000}
            value={percentagedValue}
            radius={size / 2 - borderSize / 2}
            activeStrokeColor={config.colors.accentDark}
            activeStrokeSecondaryColor={config.colors.accentLight}
            progressFormatter={(value) => {
              "worklet";
              return value.toFixed(1);
            }}
          />
        </NeuView>
      </NeuView>
    </NeuView>
  );
}

const styles = StyleSheet.create({});

export default NeuCircleProgress;
