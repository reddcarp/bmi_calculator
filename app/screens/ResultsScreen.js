import { useState } from "react";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import * as Haptics from "expo-haptics";

import Header from "../components/Header";
import HighlightedSelection from "../components/HighlightedSelection";
import VariationCard from "../components/VariationCard";
import config from "../config/styles";
import VerticalSlider from "../components/VerticalSlider";
import NeuCircleProgress from "../components/NeuCircleProgress";

/*
 *  BMI Weight Status - based on the CDC data (USA)
 *  || 20 and up ||
 *
 * =============
 *  Underweight
 *  < 18.5
 * =============
 *
 * =============
 *  Healthy
 *  18.5 - < 25
 * =============
 *
 * =============
 *  Overweight
 *  25.0 - < 30 (23 - 24.9 for ASIA)
 * =============
 *
 * =============
 *  Obese
 *  30 - < 40       (> 25 for ASIA)
 * =============
 *
 * =============
 *  Severely Obese
 *  >= 40
 * =============
 *
 * CDC data
 * || 2 to 19 ||
 *
 * =============
 *  Underweight
 *  < 5th percentile
 * =============
 *
 * =============
 *  Healthy
 *  >= 5th and < 85th percentile
 * =============
 *
 * =============
 *  Overweight
 *  >= 85th and < 95th percentile
 * =============
 *
 * =============
 *  obese
 *  >= 95th and < 99th percentile
 * =============
 *
 * =============
 *  Severely Obese
 *  >= 99th percentile
 * =============
 */

const WeightCategoryText = [
  "Underweight",
  "Healthy",
  "Overweight",
  "Obese",
  "Severely Obese",
];

const underweightLimit = 18.5;
const healthyLimit = 25;
const overweightLimit = 30;
const obeseLimit = 40;

/*
 * The BMI calculations are based on the USC units (USA)
 * not the SI one (International System of Units)
 */
function ResultsScreen({ route, navigation }) {
  const { weight, age, height, sex } = route.params;

  const onPressLeftIconHandler = () => {
    navigation.goBack();
  };

  const BMICalculation = () => {
    return (weight / (height * height)) * 10000;
  };

  const WeightCategoryFromBMI = (bmi) => {
    if (bmi < underweightLimit) return config.AppEnum.Underweight;
    else if (bmi < healthyLimit) return config.AppEnum.Healthy;
    else if (bmi < overweightLimit) return config.AppEnum.OverWeight;
    else if (bmi < obeseLimit) return config.AppEnum.Obese;
    else return config.AppEnum.SeverelyObese;
  };

  const WeightCategoryFromPercentile = (percentile) => {
    if (percentile < config.AppEnum.UnderweightPercentileLimit)
      return config.AppEnum.Underweight;
    else if (percentile < config.AppEnum.HealthyPercentileLimit)
      return config.AppEnum.Healthy;
    else if (percentile < config.AppEnum.OverWeightPercentileLimit)
      return config.AppEnum.OverWeight;
    else if (percentile < config.AppEnum.ObesePercentileLimit)
      return config.AppEnum.Obese;
    else return config.AppEnum.SeverelyObese;
  };

  const bmi = BMICalculation();
  const weightCategory = WeightCategoryFromBMI(bmi);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Header
          title="BMI Results"
          leftIcon="chevron-left"
          onPressLeftIcon={onPressLeftIconHandler}
        />
        <View style={styles.centerContainer}>
          <NeuCircleProgress max={50} min={40} size={240} value={bmi} />
          <View style={{ marginTop: 30 }}>
            <Text style={config.title}>
              You are{" "}
              <Text style={{ color: config.colors.accentDark }}>
                {WeightCategoryText[weightCategory]}
              </Text>{" "}
              !
            </Text>
          </View>
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
  centerContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 90,
  },
});

export default ResultsScreen;
