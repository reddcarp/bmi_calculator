import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState } from "react";
import { NeuView } from "react-native-neu-element";
import { LinearGradient } from "expo-linear-gradient";

import config from "../config/styles";

function HighlightedSelection({
  onPress,
  activated,
  looks = false,
  text,
  height = config.highligtedButtonHeight,
  width = config.innerContainerWidth,
}) {
  return (
    <Pressable onPress={onPress} disabled={activated}>
      <NeuView
        color={config.colors.background}
        height={height}
        width={width}
        borderRadius={20}
        containerStyle={styles.button}
      >
        <LinearGradient
          colors={[
            activated || looks
              ? config.colors.accentDark
              : config.colors.background,
            activated || looks
              ? config.colors.accentLight
              : config.colors.background,
          ]}
          style={styles.gradientContainer}
          start={{
            x: 0,
            y: 0,
          }}
          end={{
            x: 0.8,
            y: 0.8,
          }}
        >
          <Text
            style={[
              config.subTitle,
              {
                color: activated || looks ? "#f2fcfb" : config.subTitle.color,
              },
            ]}
          >
            {text}
          </Text>
        </LinearGradient>
      </NeuView>
    </Pressable>
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

export default HighlightedSelection;
