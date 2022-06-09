import { useState } from "react";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import * as Haptics from "expo-haptics";

import Header from "../components/Header";
import HighlightedSelection from "../components/HighlightedSelection";
import VariationCard from "../components/VariationCard";
import config from "../config/styles";
import VerticalSlider from "../components/VerticalSlider";
import { store } from "../store/store";
import {
  selectAge,
  selectHeight,
  selectWeight,
  setAge,
  setWeight,
} from "../store/bmiSlice";

function InputScreen({ navigation }) {
  const [male, setMale] = useState(true);
  const [female, setFemale] = useState(false);

  const onPressGenderButton = () => {
    setMale(!male);
    setFemale(!female);
    Haptics.selectionAsync();
  };

  const onPressResultsHandler = () => {
    navigation.navigate("Results", {
      sex: male ? "male" : "female",
      age: store.getState().bmi.age,
      weight: store.getState().bmi.weight,
      height: store.getState().bmi.height,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Header />
        <View style={styles.genderContainer}>
          <HighlightedSelection
            width={config.cardWidth}
            onPress={onPressGenderButton}
            activated={male}
            text="Male"
          />
          <HighlightedSelection
            width={config.cardWidth}
            onPress={onPressGenderButton}
            activated={female}
            text="Female"
          />
        </View>
        <View
          style={{
            alignSelf: "center",
            width: config.cardContainerWidth,
            height: config.cardContainerHeight,
            flexDirection: "row",
          }}
        >
          <VerticalSlider title="Height" />
          <View style={styles.cardContainer}>
            <VariationCard
              title="Weight"
              valueDispatch={setWeight}
              valueSelector={selectWeight}
              min={5}
              max={500}
            />
            <VariationCard
              title="Age"
              valueDispatch={setAge}
              valueSelector={selectAge}
              min={20}
              max={100}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <HighlightedSelection
            onPress={onPressResultsHandler}
            activated={false}
            looks={true}
            text="Let's Begin"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: config.colors.background,
  },
  innerContainer: {
    flex: 1,
    flexDirection: "column",
    padding: config.innerContainerPadding,
  },
  cardContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
    alignItems: "flex-end",
  },
  middleContainer: {
    justifyContent: "space-between",
    flex: 1,
    flexDirection: "column",
  },
  genderContainer: {
    marginBottom: config.cardSpaceBetween * 1.5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default InputScreen;
