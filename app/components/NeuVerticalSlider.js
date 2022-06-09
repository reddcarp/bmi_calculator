import {
  StyleSheet,
  View,
  PanResponder,
  PanResponderInstance,
  PanResponderGestureState,
  Animated,
  Easing,
} from "react-native";
import { useState, useRef } from "react";
import { NeuView } from "react-native-neu-element";
import { LinearGradient } from "expo-linear-gradient";

import config from "../config/styles";

_moveStartValue = 0;

function NeuVerticalSlider({ setValue, height = 280, width = 15 }) {
  const circleDiameter = 35;
  const min = 100;
  const max = 200;
  const diff = max - min;
  const step = 1;
  const animationDuration = 0;

  const [localValue, setLocalValue] = useState(150);
  const animatedBottomOffset = useRef(new Animated.Value(0)).current;

  const getBottomOffsetFromValue = (value) => {
    const valueOffset = value - min;
    const totalRange = max - min;
    const percentage = valueOffset / totalRange;
    return (height - circleDiameter / 2) * percentage;
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: () => {
        _moveStartValue = localValue;
      },
      onPanResponderMove: (_event, gestureState) => {
        const value = _fetchNewValueFromGesture(gestureState);
        _changeState(value);
        if (setValue) setValue(value);
      },
      onPanResponderRelease: (_event, gestureState) => {
        const value = _fetchNewValueFromGesture(gestureState);
        _changeState(value);
        if (setValue) setValue(value);
      },
    })
  ).current;

  const _fetchNewValueFromGesture = (gestureState) => {
    const ratio = -gestureState.dy / height;

    return Math.max(
      min,
      Math.min(max, _moveStartValue + Math.round((ratio * diff) / step) * step)
    );
  };

  const _changeState = (value) => {
    const bottomOffset = getBottomOffsetFromValue(value);
    Animated.timing(animatedBottomOffset, {
      toValue: bottomOffset,
      easing: Easing.linear,
      duration: animationDuration,
      useNativeDriver: false,
    }).start();
    setLocalValue(value.toFixed(0));
  };

  return (
    <NeuView
      color={config.colors.background}
      height={height}
      width={width}
      borderRadius={1000}
      containerStyle={styles.button}
      inset
    >
      <View style={styles.barContainer} {...panResponder.panHandlers}>
        <Bar height={animatedBottomOffset} />
        <Circle diameter={circleDiameter} bottomOffset={animatedBottomOffset} />
      </View>
    </NeuView>
  );
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
        style={{ width: 15, height: 280 }}
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
    height: 280,
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

export default NeuVerticalSlider;
