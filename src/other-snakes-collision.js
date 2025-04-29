// other-snakes-collision.js
// eslint-disable-next-line sonarjs/cognitive-complexity
export function checkOtherSnakesCollision(myHead, opponents, myId, isMoveSafe) {
  for (const snake of opponents) {
    // Skip ourselves
    if (snake.id === myId) continue;

    for (const bodyPart of snake.body) {
      // Check left collision
      if (myHead.x - 1 === bodyPart.x && myHead.y === bodyPart.y) {
        isMoveSafe.left = false;
      }
      // Check right collision
      if (myHead.x + 1 === bodyPart.x && myHead.y === bodyPart.y) {
        isMoveSafe.right = false;
      }
      // Check down collision
      if (myHead.x === bodyPart.x && myHead.y - 1 === bodyPart.y) {
        isMoveSafe.down = false;
      }
      // Check up collision
      if (myHead.x === bodyPart.x && myHead.y + 1 === bodyPart.y) {
        isMoveSafe.up = false;
      }
    }
  }
  return isMoveSafe;
}
