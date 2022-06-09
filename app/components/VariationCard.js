import { StyleSheet, Text, View } from "react-native";
import { NeuButton, NeuView } from "react-native-neu-element";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import config from "../config/styles";
import { useSelector } from "react-redux";
import { store } from "../store/store";
import React from "react";

function VariationCard({
  title,
  valueSelector,
  valueDispatch,
  valueName,
  max,
  min,
}) {
  const value = useSelector(valueSelector);

  return (
    <NeuView
      color={config.colors.background}
      height={config.cardHeight}
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
        <Buttons
          max={max}
          min={min}
          valueDispatch={valueDispatch}
          valueName={valueName}
        />
      </View>
    </NeuView>
  );
}

class Buttons extends React.Component {
  timer = null;
  max = this.props.max;
  min = this.props.min;
  valueDispatch = this.props.valueDispatch;
  valueName = this.props.valueName;

  onPressPlusButtonHandler = () => {
    if (store.getState().bmi[this.valueName] == this.max) return;
    store.dispatch(
      this.valueDispatch(store.getState().bmi[this.valueName] + 1)
    );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  onPressMinusButtonHandler = () => {
    if (store.getState().bmi[this.valueName] == this.min) return;
    store.dispatch(
      this.valueDispatch(store.getState().bmi[this.valueName] - 1)
    );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  onPressInHandler = (fun) => {
    fun();
    timer = setInterval(fun, 80);
  };

  onPressOutHandler = () => {
    clearInterval(timer);
  };
  render() {
    return (
      <>
        <View style={{ marginHorizontal: 9 }}>
          <NeuButton
            color={config.colors.background}
            height={config.cardButtonWidth}
            width={config.cardButtonWidth}
            borderRadius={config.cardButtonWidth}
            onPressIn={() =>
              this.onPressInHandler(this.onPressPlusButtonHandler)
            }
            onPressOut={this.onPressOutHandler}
          >
            <Feather name="plus" size={config.cardIconSize} color="black" />
          </NeuButton>
        </View>
        <View style={{ marginHorizontal: 9 }}>
          <NeuButton
            color={config.colors.background}
            height={config.cardButtonWidth}
            width={config.cardButtonWidth}
            borderRadius={config.cardButtonWidth}
            onPressIn={() =>
              this.onPressInHandler(this.onPressMinusButtonHandler)
            }
            onPressOut={this.onPressOutHandler}
          >
            <Feather name="minus" size={config.cardIconSize} color="black" />
          </NeuButton>
        </View>
      </>
    );
  }
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

export default VariationCard;
