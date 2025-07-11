/**
 * Food targeting and pathfinding utilities.
 * @module foodTargeting
 */

/**
 * Finds the closest food to the snake's head.
 * @param {Object} myHead - Snake head position.
 * @param {Array<Object>} food - Array of food positions.
 * @returns {Object|undefined} The closest food item or undefined if no food.
 */
export function findClosestFood(myHead, food) {
  if (!food || food.length === 0) return;

  let closestFood;
  let minDistance = Infinity;

  for (const foodItem of food) {
    // Calculate Manhattan distance
    const distance =
      Math.abs(myHead.x - foodItem.x) + Math.abs(myHead.y - foodItem.y);

    if (distance < minDistance) {
      minDistance = distance;
      closestFood = foodItem;
    }
  }

  return closestFood;
}

/**
 * Gets directions to move toward the closest food.
 * @param {Object} myHead - Snake head position.
 * @param {Object} closestFood - Target food position.
 * @returns {Array<string>} Array of possible directions toward food.
 */
export function getDirectionToFood(myHead, closestFood) {
  if (!closestFood) return;

  const directions = [];

  // Check horizontal direction first
  if (closestFood.x < myHead.x) {
    directions.push('left');
  } else if (closestFood.x > myHead.x) {
    directions.push('right');
  }

  // Then check vertical direction
  if (closestFood.y < myHead.y) {
    directions.push('down');
  } else if (closestFood.y > myHead.y) {
    directions.push('up');
  }

  // Return all possible directions that move toward food
  return directions;
}
