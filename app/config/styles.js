import { Dimensions } from "react-native";
import colors from "./colors";
import AppEnum from "./enum";

var screenWidth = Dimensions.get("window").width;
var screenHeight = Dimensions.get("window").height;
var innerContainerPadding = 35;
var innerContainerWidth = screenWidth - innerContainerPadding * 2;

var screenHeightToCardHeight = 0.24;

var cardHeight = screenHeight * screenHeightToCardHeight;
var cardHeightToButtonRatio = 0.22;
var screenWidthTocardWidthRatio = 0.39;
var cardButtonWidth = cardHeight * cardHeightToButtonRatio;
var cardIconSize = cardButtonWidth / 2;
var cardWidth = screenWidth * screenWidthTocardWidthRatio;

var cardSpaceBetween = innerContainerWidth - cardWidth * 2;
var cardContainerHeight = 2 * cardHeight + cardSpaceBetween;
var cardContainerWidth = 2 * cardWidth + cardSpaceBetween;

var highligtedButtonHeight = cardHeight / 3.9;

var sliderHeight = cardHeight + cardSpaceBetween + cardButtonWidth;

export default {
  colors,
  AppEnum,
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.darkGrey,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: colors.grey,
  },
  cardText: {
    fontSize: 70,
    fontWeight: "300",
    color: colors.black,
  },
  cardWidth,
  cardHeight,
  cardButtonWidth,
  cardIconSize,
  cardSpaceBetween,
  cardContainerHeight,
  cardContainerWidth,
  innerContainerWidth,
  screenWidth,
  innerContainerPadding,
  highligtedButtonHeight,
  sliderHeight,
};
