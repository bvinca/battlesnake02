// src/a-star.js

function coordsKey({ x, y }) {
  return `${x},${y}`;
}

function reconstructPath(cameFrom, currentKey) {
  const path = [];
  while (cameFrom.has(currentKey)) {
    path.unshift(currentKey);
    currentKey = cameFrom.get(currentKey);
  }
  path.unshift(currentKey); // Add start node
  return path.map(str => {
    const [x, y] = str.split(',').map(Number);
    return { x, y };
  });
}

export function manhattan(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

export function aStar(start, goal, board, snakeBodies) {
  const width = board.width;
  const height = board.height;

  const closedSet = new Set();
  const openSet = new Set([coordsKey(start)]);
  const cameFrom = new Map();

  const gScore = new Map([[coordsKey(start), 0]]);
  const fScore = new Map([[coordsKey(start), manhattan(start, goal)]]);

  function isObstacle(x, y) {
    for (const snake of snakeBodies) {
      for (const part of snake) {
        if (part.x === x && part.y === y) return true;
      }
    }
    return false;
  }

  while (openSet.size > 0) {
    // Get node with lowest fScore
    let currentKey = null;
    let currentF = Infinity;
    for (const key of openSet) {
      if (fScore.get(key) < currentF) {
        currentF = fScore.get(key);
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

    for (const [dx, dy] of [[1,0], [-1,0], [0,1], [0,-1]]) {
      const nx = cx + dx;
      const ny = cy + dy;
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      if (isObstacle(nx, ny)) continue;
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
  return null;
}

// Convert a step to Battlesnake direction string
export function directionFromTo(a, b) {
  if (b.x > a.x) return "right";
  if (b.x < a.x) return "left";
  if (b.y > a.y) return "up";
  if (b.y < a.y) return "down";
  return null;
}
