import { useState } from "react";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import * as Haptics from "expo-haptics";

import Header from "../components/Header";
import HighlightedSelection from "../components/HighlightedSelection";
import VariationCard from "../components/VariationCard";
import config from "../config/styles";
import VerticalSlider from "../components/VerticalSlider";

function InputScreen({ navigation }) {
  const [height, setHeight] = useState(150);
  const [weight, setWeight] = useState(70);
  const [age, setAge] = useState(25);
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
      age: age,
      weight: weight,
      height: height,
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
          <VerticalSlider title="Height" value={height} setValue={setHeight} />
          <View style={styles.cardContainer}>
            <VariationCard
              title="Weight"
              value={weight}
              setValue={setWeight}
              min={5}
              max={500}
            />
            <VariationCard
              title="Age"
              value={age}
              setValue={setAge}
              min={2}
              max={125}
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
