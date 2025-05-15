// tail-collision.js
export function isAboutToEat(head, food) {
  return food.some(f =>
    (f.x === head.x - 1 && f.y === head.y) || // left
    (f.x === head.x + 1 && f.y === head.y) || // right
    (f.x === head.x && f.y === head.y - 1) || // down
    (f.x === head.x && f.y === head.y + 1)    // up
  );
}

export function checkTailCollision(myHead, opponents, food, isMoveSafe) {
  for (const snake of opponents) {
    // Skip if snake has no body
    if (snake.body.length < 1) continue;

    const tail = snake.body[snake.body.length - 1];
    const head = snake.body[0];

    // Check if tail is about to move
    const willTailMove = (
      snake.health < 100 && // Didn't just eat
      !isAboutToEat(head, food) // Not about to eat next turn
    );

    if (!willTailMove) continue;

    // Check if any of our possible moves would land on a movable tail
    if (myHead.x - 1 === tail.x && myHead.y === tail.y) {
      isMoveSafe.left = true;
    }
    if (myHead.x + 1 === tail.x && myHead.y === tail.y) {
      isMoveSafe.right = true;
    }
    if (myHead.x === tail.x && myHead.y - 1 === tail.y) {
      isMoveSafe.down = true;
    }
    if (myHead.x === tail.x && myHead.y + 1 === tail.y) {
      isMoveSafe.up = true;
    }
  }
  return isMoveSafe;
}