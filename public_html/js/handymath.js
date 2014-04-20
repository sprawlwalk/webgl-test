// Returns a random integer between min and max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Returns a random number between min and max
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}