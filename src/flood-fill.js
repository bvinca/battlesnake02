/**
 * Flood fill algorithm implementation for determining available space.
 * @module floodFill
 */

const key = (x, y) => `${x},${y}`;

/**
 * Performs flood fill to count accessible space from a starting position.
 * @param {Object} board - Game board information.
 * @param {Object} start - Starting position.
 * @param {Array<Array>} snakeBodies - Array of snake body segments.
 * @returns {number} The count of accessible spaces.
 */
export function floodFill(board, start, snakeBodies) {
  const queue = [start];
  const visited = new Set();
  const width = board.width;
  const height = board.height;

  const isObstacle = (x, y) => {
    for (const snake of snakeBodies) {
      if (snake.some((part) => part.x === x && part.y === y)) return true;
    }
    return false;
  };

  let count = 0;

  while (queue.length > 0) {
    const { x, y } = queue.shift();
    const id = key(x, y);

    if (
      x < 0 ||
      y < 0 ||
      x >= width ||
      y >= height ||
      visited.has(id) ||
      isObstacle(x, y)
    ) {
      continue;
    }

    visited.add(id);
    count++;

    queue.push(
      { x: x + 1, y },
      { x: x - 1, y },
      { x, y: y + 1 },
      { x, y: y - 1 },
    );
  }

  return count;
}

/**
 * Determines the best move based on available space.
 * @param {Object} myHead - Current snake head position.
 * @param {Object} isMoveSafe - Object tracking safe moves.
 * @param {Object} board - Game board information.
 * @param {Array<Array>} snakeBodies - Array of snake body segments.
 * @returns {string|undefined} The best direction to move or undefined if no safe moves.
 */
export function bestMove(myHead, isMoveSafe, board, snakeBodies) {
  const directions = {
    up: { x: myHead.x, y: myHead.y + 1 },
    down: { x: myHead.x, y: myHead.y - 1 },
    left: { x: myHead.x - 1, y: myHead.y },
    right: { x: myHead.x + 1, y: myHead.y },
  };

  let best;
  let maxArea = -1;

  for (const direction in directions) {
    if (!isMoveSafe[direction]) continue;
    const space = floodFill(board, directions[direction], snakeBodies);
    if (space > maxArea) {
      best = direction;
      maxArea = space;
    }
  }

  return best;
}
