// headToHeadCollision.js

export function checkHeadToHeadCollision(myHead, opponents, myLength, isMoveSafe) {
    for (const snake of opponents) {
      const opponentHead = snake.body[0];
  
      const opponentPossibleMoves = [
        { x: opponentHead.x - 1, y: opponentHead.y }, // left
        { x: opponentHead.x + 1, y: opponentHead.y }, // right
        { x: opponentHead.x, y: opponentHead.y - 1 }, // down
        { x: opponentHead.x, y: opponentHead.y + 1 }  // up
      ];
  
      const myPossibleMoves = {
        left: { x: myHead.x - 1, y: myHead.y },
        right: { x: myHead.x + 1, y: myHead.y },
        down: { x: myHead.x, y: myHead.y - 1 },
        up: { x: myHead.x, y: myHead.y + 1 }
      };
  
      for (const direction in myPossibleMoves) {
        const myMove = myPossibleMoves[direction];
        for (const opponentMove of opponentPossibleMoves) {
          if (myMove.x === opponentMove.x && myMove.y === opponentMove.y) {
            if (snake.length >= myLength) {
              isMoveSafe[direction] = false;
            }
          }
        }
      }
    }
  
    return isMoveSafe;
  }
 