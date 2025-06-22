/**
 * Wall collision detection utilities.
 * @module wallCollision
 */

/**
 * Checks for collisions with walls.
 * @param {Object} myHead - Current snake head position.
 * @param {number} width - Board width.
 * @param {number} height - Board height.
 * @param {Object} isMoveSafe - Object tracking safe moves.
 * @returns {Object} Updated isMoveSafe object.
 */
export function checkWallCollision(myHead, width, height, isMoveSafe) {
  if (myHead.x <= 0) isMoveSafe.left = false;
  if (myHead.x >= width - 1) isMoveSafe.right = false;
  if (myHead.y <= 0) isMoveSafe.down = false;
  if (myHead.y >= height - 1) isMoveSafe.up = false;
  return isMoveSafe;
}
