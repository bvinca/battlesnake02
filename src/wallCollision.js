// wallCollision.js
export function checkWallCollision(myHead, boardWidth, boardHeight, isMoveSafe) {
    // left edge
    if (myHead.x === 0) {
      isMoveSafe.left = false;
    }
    // right edge
    if (myHead.x === boardWidth - 1) {
      isMoveSafe.right = false;
    }
    // bottom edge
    if (myHead.y === 0) {
      isMoveSafe.down = false;
    }
    // top edge
    if (myHead.y === boardHeight - 1) {
      isMoveSafe.up = false;
    }
    return isMoveSafe;
  }