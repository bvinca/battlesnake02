// self-collision.js
export function checkSelfCollision(myHead, myBody, isMoveSafe) {
  for (let index = 1; index < myBody.length; index++) {
    const bodyPart = myBody[index];

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
  return isMoveSafe;
}
