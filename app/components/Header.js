import { StyleSheet, Text, View } from "react-native";
import { NeuButton } from "react-native-neu-element";
import { Feather } from "@expo/vector-icons";

import config from "../config/styles";

function Header({
  title = "BMI Calculator",
  rightIcon = null,
  leftIcon = null,
  onPressLeftIcon,
}) {
  return (
    <View style={styles.container}>
      {leftIcon ? (
        <NeuButton
          color={config.colors.background}
          height={50}
          width={50}
          borderRadius={25}
          onPress={onPressLeftIcon}
        >
          <Feather name={leftIcon} size={25} color={config.colors.darkGrey} />
        </NeuButton>
      ) : (
        <View style={styles.placeholder}></View>
      )}
      <View style={styles.titleContainer}>
        <Text style={config.title}>{title}</Text>
      </View>
      {rightIcon ? (
        <NeuButton
          color={config.colors.background}
          height={50}
          width={50}
          borderRadius={25}
        >
          <Feather name={rightIcon} size={25} color={config.colors.darkGrey} />
        </NeuButton>
      ) : (
        <View style={styles.placeholder}></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    flexDirection: "row",
    marginBottom: 50,
    width: "100%",
    height: 50,
  },
  titleContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholder: {
    height: 50,
    width: 50,
  },
});

export default Header;
