import { StyleSheet, Text, View } from "react-native";
import { NeuButton, NeuView } from "react-native-neu-element";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import config from "../config/styles";
import { useSelector } from "react-redux";
import { store } from "../store/store";

function VariationCard({ title, valueSelector, valueDispatch, max, min }) {
  var timer;
  const value = useSelector(valueSelector);

  const onPressPlusButtonHandler = () => {
    if (value == max) return;
    store.dispatch(valueDispatch(value + 1));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const onPressMinusButtonHandler = () => {
    if (value == min) return;
    store.dispatch(valueDispatch(value - 1));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const onPressInHandler = (fun) => {
    timer = setInterval(fun, 500);
  };

  const onPressOutHandler = () => {
    clearInterval(timer);
  };

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
        <View style={{ marginHorizontal: 9 }}>
          <NeuButton
            color={config.colors.background}
            height={config.cardButtonWidth}
            width={config.cardButtonWidth}
            borderRadius={config.cardButtonWidth}
            onPress={onPressPlusButtonHandler}
            //  onPressIn={onPressInHandler(onPressPlusButtonHandler)}
            //onPressOut={onPressOutHandler}
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
            onPress={onPressMinusButtonHandler}
          >
            <Feather name="minus" size={config.cardIconSize} color="black" />
          </NeuButton>
        </View>
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

export default VariationCard;
