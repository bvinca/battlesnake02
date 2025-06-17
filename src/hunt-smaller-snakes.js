/**
 * Hunting logic for targeting smaller snakes.
 * @module huntSmallerSnakes
 */

/**
 * Finds the closest smaller snake to hunt.
 * @param {Object} myHead - Current snake head position.
 * @param {number} myLength - Current snake length.
 * @param {Array<Object>} opponents - Array of opponent snakes.
 * @returns {Object|undefined} The closest prey's head position or undefined if none found.
 */
export function findClosestPrey(myHead, myLength, opponents) {
  let closestPrey;
  let minDistance = Infinity;

  for (const snake of opponents) {
    if (
      !snake.body ||
      snake.body.length === 0 ||
      snake.body.length >= myLength * 0.8
    )
      continue;

    const preyHead = snake.body[0];
    const distance =
      Math.abs(myHead.x - preyHead.x) + Math.abs(myHead.y - preyHead.y);

    if (distance < minDistance) {
      minDistance = distance;
      closestPrey = preyHead;
    }
  }
  return closestPrey;
}

/**
 * Gets directions to move toward the prey.
 * @param {Object} myHead - Current snake head position.
 * @param {Object} preyHead - Target prey's head position.
 * @returns {Array<string>} Array of possible directions toward prey.
 */
export function getDirectionsToPrey(myHead, preyHead) {
  const directions = [];
  if (!preyHead) {
    return directions;
  }
  if (preyHead.x < myHead.x) directions.push('left');
  if (preyHead.x > myHead.x) directions.push('right');
  if (preyHead.y < myHead.y) directions.push('down');
  if (preyHead.y > myHead.y) directions.push('up');
  return directions;
}
