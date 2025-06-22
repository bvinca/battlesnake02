/**
 * Head-to-head collision detection utilities.
 * @module headToHead
 */

/**
 * Checks for potential head-to-head collisions with opponents.
 * @param {Object} myHead - Current snake head position.
 * @param {Array<Object>} opponents - Array of opponent snakes.
 * @param {number} myLength - Current snake length.
 * @param {Object} isMoveSafe - Object tracking safe moves.
 * @returns {Object} Updated isMoveSafe object.
 */
export function checkHeadToHeadCollision(
  myHead,
  opponents,
  myLength,
  isMoveSafe,
) {
  const myPossibleMoves = {
    left: { x: myHead.x - 1, y: myHead.y },
    right: { x: myHead.x + 1, y: myHead.y },
    down: { x: myHead.x, y: myHead.y - 1 },
    up: { x: myHead.x, y: myHead.y + 1 },
  };

  for (const direction in myPossibleMoves) {
    const myMove = myPossibleMoves[direction];

    for (const snake of opponents) {
      const opponentHead = snake.body[0];

      const opponentPossibleMoves = [
        { x: opponentHead.x - 1, y: opponentHead.y }, // left
        { x: opponentHead.x + 1, y: opponentHead.y }, // right
        { x: opponentHead.x, y: opponentHead.y - 1 }, // down
        { x: opponentHead.x, y: opponentHead.y + 1 }, // up
      ];

      const threatensSameSquare = opponentPossibleMoves.some(
        (move) => move.x === myMove.x && move.y === myMove.y,
      );

      if (threatensSameSquare && snake.length >= myLength) {
        isMoveSafe[direction] = false;
      }
    }
  }

  return isMoveSafe;
}
