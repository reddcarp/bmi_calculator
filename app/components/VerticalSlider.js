import { StyleSheet, Text, View } from "react-native";
import { NeuButton, NeuView } from "react-native-neu-element";

import config from "../config/styles";
import NeuVerticalSlider from "./NeuVerticalSlider";

function VerticalSlider({ title, value, setValue }) {
  return (
    <NeuView
      color={config.colors.background}
      height={config.cardContainerHeight}
      width={config.cardWidth}
      borderRadius={20}
      containerStyle={styles.card}
    >
      <Text style={config.subTitle}>{title}</Text>
      <Text style={config.cardText}>{value}</Text>
      <View
        style={{
          alignSelf: "stretch",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <NeuVerticalSlider setValue={setValue} />
      </View>
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
