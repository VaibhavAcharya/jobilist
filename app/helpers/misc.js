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
