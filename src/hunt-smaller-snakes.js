export function findClosestPrey(myHead, myLength, opponents) {
  let closestPrey = null;
  let minDistance = Infinity;

  for (const snake of opponents) {
    if (!snake.body || snake.body.length >= myLength * 0.8) continue;
    
    const preyHead = snake.body[0];
    const distance = Math.abs(myHead.x - preyHead.x) + Math.abs(myHead.y - preyHead.y);
    
    if (distance < minDistance) {
      minDistance = distance;
      closestPrey = preyHead;
    }
  }
  return closestPrey;
}

export function getDirectionsToPrey(myHead, preyHead) {
  const directions = [];
  if (preyHead.x < myHead.x) directions.push("left");
  if (preyHead.x > myHead.x) directions.push("right");
  if (preyHead.y < myHead.y) directions.push("down");
  if (preyHead.y > myHead.y) directions.push("up");
  return directions;
}