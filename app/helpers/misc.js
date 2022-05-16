import { CURRENCY_OPTIONS } from "../constants";

export function getCurrencySymbolFromCurrencyValue(value) {
  return CURRENCY_OPTIONS.find(function (option) {
    return option.value === value;
  }).symbol;
}

export function getPostPriceFromCurrencyValue(value) {
  return CURRENCY_OPTIONS.find(function (option) {
    return option.value === value;
  }).pricePost;
}

export function capitalizeSentence(sentence = "") {
  return sentence
    .split(" ")
    .map(function (word) {
      return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
    })
    .join(" ");
}

export function getRandomInRange(max = 1) {
  return Math.round(Math.random() * max);
}
