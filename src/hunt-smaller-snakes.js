// src/hunt-smaller-snakes.js

export function findClosestPrey() {
  let closestPrey = null;
  let minDistance = Infinity;

  for (const snake of opponents) {
    if (!snake.body || snake.body.length === 0) continue;
    if (snake.body.length >= myLength) continue;

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

export function getDirectionsToPrey() {
  const preyHead = findClosestPrey();
  if (!preyHead) return [];

  const directions = [];
  if (preyHead.x < myHead.x) {
    directions.push("left");
  } else if (preyHead.x > myHead.x) {
    directions.push("right");
  }
  if (preyHead.y < myHead.y) {
    directions.push("down");
  } else if (preyHead.y > myHead.y) {
    directions.push("up");
  }
  return directions;
}
