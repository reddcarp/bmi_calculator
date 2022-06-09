import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import * as Haptics from "expo-haptics";
import * as WebBrowser from "expo-web-browser";

import Header from "../components/Header";
import config from "../config/styles";
import NeuCircleProgress from "../components/NeuCircleProgress";
import AppNeuButton from "../components/AppNeuButton";

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

const underweightLimit = 18.5;
const healthyLimit = 25;
const overweightLimit = 30;
const obeseLimit = 40;

interface WEIGHT_CATEGORY_TYPE {
  maxBMI: number;
  minBMI: number;
  weightCategory: String;
}

// The weights categories
const UNDERWEIGHT: WEIGHT_CATEGORY_TYPE = {
  maxBMI: underweightLimit,
  minBMI: 0,
  weightCategory: "Underweight",
};
const HEALTHY: WEIGHT_CATEGORY_TYPE = {
  maxBMI: healthyLimit,
  minBMI: underweightLimit,
  weightCategory: "Healthy",
};
const OVERWEIGHT: WEIGHT_CATEGORY_TYPE = {
  maxBMI: overweightLimit,
  minBMI: healthyLimit,
  weightCategory: "Overweight",
};
const OBESE: WEIGHT_CATEGORY_TYPE = {
  maxBMI: obeseLimit,
  minBMI: overweightLimit,
  weightCategory: "Obese",
};
const SEVERELY_OBESE: WEIGHT_CATEGORY_TYPE = {
  maxBMI: 100,
  minBMI: obeseLimit,
  weightCategory: "Severely Obese",
};

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
    if (bmi < underweightLimit) return UNDERWEIGHT;
    else if (bmi < healthyLimit) return HEALTHY;
    else if (bmi < overweightLimit) return OVERWEIGHT;
    else if (bmi < obeseLimit) return OBESE;
    else return SEVERELY_OBESE;
  };

  /*
   * Not utilized for now
   *
   */
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
  const weight_category: WEIGHT_CATEGORY_TYPE = WeightCategoryFromBMI(bmi);

  const onPressDetails = () => {
    WebBrowser.openBrowserAsync(
      "https://www.cdc.gov/healthyweight/assessing/bmi/index.html"
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Header
          title="BMI Results"
          leftIcon="chevron-left"
          onPressLeftIcon={onPressLeftIconHandler}
        />
        <View style={styles.centerContainer}>
          <NeuCircleProgress
            max={weight_category.maxBMI}
            min={weight_category.minBMI}
            size={240}
            value={bmi}
          />
          <View style={{ marginTop: 30 }}>
            <Text style={config.title}>
              You are{" "}
              <Text style={{ color: config.colors.accentDark }}>
                {weight_category.weightCategory}
              </Text>{" "}
              !
            </Text>
          </View>
        </View>
        <AppNeuButton
          width={config.cardWidth}
          onPress={onPressDetails}
          text="Details"
          style={styles.bottomButton}
        />
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
  bottomButton: {
    alignSelf: "center",
  },
});

export default ResultsScreen;
