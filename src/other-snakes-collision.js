// other-snakes-collision.js
import { checkTailCollision, isAboutToEat } from "./tail-collision.js";

export function checkOtherSnakesCollision(myHead, opponents, myId, food, isMoveSafe) {
  for (const snake of opponents) {
    // Skip ourselves
    if (snake.id === myId) continue;

    for (let i = 0; i < snake.body.length; i++) {
      const bodyPart = snake.body[i];

      // Skip the tail if it's about to move
      const isTail = i === snake.body.length - 1;
      const willTailMove = isTail &&
        snake.health < 100 &&
        !isAboutToEat(snake.body[0], food);

      if (willTailMove) continue;

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

  // After regular collision checks, allow moving into movable tails
  return checkTailCollision(myHead, opponents, food, isMoveSafe);
}
