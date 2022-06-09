import { StyleSheet, Text, View } from "react-native";
import { NeuButton, NeuView } from "react-native-neu-element";
import { useSelector } from "react-redux";

import config from "../config/styles";
import { selectHeight } from "../store/bmiSlice";
import Slider from "./NeuVerticalSlider";

function VerticalSlider({ title }) {
  return (
    <NeuView
      color={config.colors.background}
      height={config.cardContainerHeight}
      width={config.cardWidth}
      borderRadius={20}
      containerStyle={styles.card}
    >
      <Text style={config.subTitle}>{title}</Text>
      <Slider />
    </NeuView>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
});

export default VerticalSlider;
