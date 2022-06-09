import { StyleSheet, Text, Pressable } from "react-native";
import { NeuView, NeuButton } from "react-native-neu-element";

import config from "../config/styles";

function AppNeuButton({
  onPress,
  text,
  height = config.highligtedButtonHeight,
  width = config.innerContainerWidth,
  style = {},
}) {
  return (
    <NeuButton
      style={style}
      color={config.colors.background}
      height={height}
      width={width}
      borderRadius={20}
      containerStyle={styles.button}
      onPress={onPress}
    >
      <Text
        style={[
          config.subTitle,
          { color: config.colors.black, alignSelf: "center" },
        ]}
      >
        {text}
      </Text>
    </NeuButton>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    alignSelf: "stretch",
    flex: 1,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  deactivatedContainer: {
    backgroundColor: config.colors.background,
  },
  button: {
    padding: 0.6,
    alignItems: "flex-start",
  },
});

export default AppNeuButton;
