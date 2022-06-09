import {
  StyleSheet,
  View,
  PanResponder,
  PanResponderInstance,
  PanResponderGestureState,
  Animated,
  Easing,
  LayoutChangeEvent,
  Text,
} from "react-native";
import React, { useState, useRef } from "react";
import { NeuView } from "react-native-neu-element";
import { LinearGradient } from "expo-linear-gradient";

import config from "../config/styles";
import { store } from "../store/store";
import { setHeight } from "../store/bmiSlice";

const circleDiameter = 35;
const minValue = 100;
const maxValue = 220;

class Slider extends React.Component {
  state = {
    min: minValue,
    max: maxValue,
    barHeight: config.sliderHeight,
    deltaValue: 0,
    value: store.getState().bmi.height,
  };

  onBarLayout = (event: LayoutChangeEvent) => {
    const { height: barHeight } = event.nativeEvent.layout;
    this.setState({ barHeight });
  };

  getBottomOffsetFromValue = (
    value: number,
    rangeMin: number,
    rangeMax: number,
    barHeight: number | null
  ) => {
    if (barHeight === null) return 0;
    const valueOffset = value - rangeMin;
    const totalRange = rangeMax - rangeMin;
    const percentage = valueOffset / totalRange;
    return (barHeight - circleDiameter / 2) * percentage;
  };

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (_, gestureState) => this.onMove(gestureState),
    onPanResponderRelease: () => this.onEndMove(),
  });

  getValueFromBottomOffset = (
    offset: number,
    barHeight: number | null,
    rangeMin: number,
    rangeMax: number
  ) => {
    if (barHeight === null) return 0;
    return ((rangeMax - rangeMin) * offset) / barHeight;
  };

  onMove(gestureState: PanResponderGestureState) {
    const { barHeight, max, min } = this.state;
    const newDeltaValue = this.getValueFromBottomOffset(
      -gestureState.dy,
      barHeight,
      min,
      max
    );

    this.setState({
      deltaValue: newDeltaValue,
    });
  }

  onEndMove() {
    const { value, deltaValue } = this.state;
    this.setState({ value: value + deltaValue, deltaValue: 0 });
  }

  capValueWithinRange = (value: number, range: number[]) => {
    if (value < range[0]) return range[0];
    if (value > range[1]) return range[1];
    return value;
  };

  render() {
    const { value, deltaValue, barHeight, min, max } = this.state;

    const cappedValue = this.capValueWithinRange(value + deltaValue, [
      min,
      max,
    ]);

    const bottomOffset = this.getBottomOffsetFromValue(
      cappedValue,
      min,
      max,
      barHeight
    );

    store.dispatch(setHeight(cappedValue));

    return (
      <>
        <Text style={config.cardText}>{cappedValue.toFixed(0)}</Text>
        <View
          style={{
            alignSelf: "stretch",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <NeuView
            color={config.colors.background}
            height={barHeight}
            width={15}
            borderRadius={1000}
            containerStyle={styles.button}
            inset
          >
            <View
              style={styles.barContainer}
              {...this.panResponder.panHandlers}
            >
              <Bar height={bottomOffset} />
              <Circle diameter={circleDiameter} bottomOffset={bottomOffset} />
            </View>
          </NeuView>
        </View>
      </>
    );
  }
}

function Circle({ diameter, bottomOffset }) {
  return (
    <Animated.View
      style={[
        styles.circle,
        {
          width: diameter,
          height: diameter,
          borderRadius: diameter,
          bottom: bottomOffset,
        },
      ]}
    />
  );
}

function Bar({ height }) {
  return (
    <Animated.View style={[styles.gradientContainer, { height: height }]}>
      <LinearGradient
        colors={[config.colors.accentDark, config.colors.accentLight]}
        style={{ width: 15, height: config.sliderHeight }}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 0.8,
          y: 0.8,
        }}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    width: 12,
    alignSelf: "flex-end",
    borderRadius: 6,
    overflow: "hidden",
  },
  button: {
    flexDirection: "row",
  },
  barContainer: {
    height: config.sliderHeight,
    width: 35,
    flexDirection: "row",
    justifyContent: "center",
    padding: 3,
  },
  circle: {
    position: "absolute",
    backgroundColor: config.colors.background,
    shadowColor: config.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});

export default Slider;
