/**
 * A* pathfinding algorithm implementation for Battlesnake.
 * @module aStar
 */

/**
 * Generates a string key from coordinates.
 * @param {Object} coords - The coordinates object.
 * @param {number} coords.x - The x-coordinate.
 * @param {number} coords.y - The y-coordinate.
 * @returns {string} The coordinates as a string key.
 */

function coordsKey({ x, y }) {
  return `${x},${y}`;
}

/**
 * Reconstructs the path from the cameFrom map.
 * @param {Map} cameFrom - Map tracking the path.
 * @param {string} currentKey - The current node's key.
 * @returns {Array<Object>} The reconstructed path as coordinate objects.
 */
function reconstructPath(cameFrom, currentKey) {
  const path = [];
  while (cameFrom.has(currentKey)) {
    path.unshift(currentKey);
    currentKey = cameFrom.get(currentKey);
  }
  path.unshift(currentKey); // Add start node
  return path.map((string_) => {
    const [x, y] = string_.split(',').map(Number);
    return { x, y };
  });
}

/**
 * Calculates the Manhattan distance between two points.
 * @param {Object} a - First point.
 * @param {number} a.x - x-coordinate of first point.
 * @param {number} a.y - y-coordinate of first point.
 * @param {Object} b - Second point.
 * @param {number} b.x - x-coordinate of second point.
 * @param {number} b.y - y-coordinate of second point.
 * @returns {number} The Manhattan distance.
 */
export function manhattan(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function isObstacle(x, y, snakeBodies) {
  for (const snake of snakeBodies) {
    for (const part of snake) {
      if (part.x === x && part.y === y) return true;
    }
  }
  return false;
}

/**
 * Finds the shortest path using A* algorithm.
 * @param {Object} start - Starting position.
 * @param {Object} goal - Target position.
 * @param {Object} board - Game board information.
 * @param {Array<Array>} snakeBodies - Array of snake body segments.
 * @returns {Array<Object>|undefined} The path as coordinate objects or undefined if no path found.
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
export function aStar(start, goal, board, snakeBodies) {
  const width = board.width;
  const height = board.height;

  const closedSet = new Set();
  const openSet = new Set([coordsKey(start)]);
  const cameFrom = new Map();

  const gScore = new Map([[coordsKey(start), 0]]);
  const fScore = new Map([[coordsKey(start), manhattan(start, goal)]]);

  while (openSet.size > 0) {
    // Get node with lowest fScore
    let currentKey;
    let currentF = Infinity;
    for (const key of openSet) {
      const score = fScore.get(key) ?? Infinity;
      if (score < currentF) {
        currentF = score;
        currentKey = key;
      }
    }

    if (!currentKey) break;

    const [cx, cy] = currentKey.split(',').map(Number);
    if (cx === goal.x && cy === goal.y) {
      // Success: reconstruct path
      return reconstructPath(cameFrom, currentKey);
    }

    openSet.delete(currentKey);
    closedSet.add(currentKey);

    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const nx = cx + dx;
      const ny = cy + dy;
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      if (isObstacle(nx, ny, snakeBodies)) continue;
      const neighborKey = `${nx},${ny}`;
      if (closedSet.has(neighborKey)) continue;
      const tentativeG = gScore.get(currentKey) + 1;
      if (!openSet.has(neighborKey)) openSet.add(neighborKey);
      else if (tentativeG >= (gScore.get(neighborKey) || Infinity)) continue;

      cameFrom.set(neighborKey, currentKey);
      gScore.set(neighborKey, tentativeG);
      fScore.set(neighborKey, tentativeG + manhattan({ x: nx, y: ny }, goal));
    }
  }
  // No path found
}

/**
 * Determines the direction from one point to another.
 * @param {Object} a - Starting position.
 * @param {Object} b - Target position.
 * @returns {string|undefined} The direction ("up", "down", "left", "right") or undefined if same position.
 */
// Convert a step to Battlesnake direction string
export function directionFromTo(a, b) {
  if (b.x > a.x) return 'right';
  if (b.x < a.x) return 'left';
  if (b.y > a.y) return 'up';
  if (b.y < a.y) return 'down';
}
