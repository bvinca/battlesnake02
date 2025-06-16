export function checkWallCollision(myHead, width, height, isMoveSafe) {
  if (myHead.x <= 0) isMoveSafe.left = false;
  if (myHead.x >= width - 1) isMoveSafe.right = false;
  if (myHead.y <= 0) isMoveSafe.down = false;
  if (myHead.y >= height - 1) isMoveSafe.up = false;
  return isMoveSafe;
}